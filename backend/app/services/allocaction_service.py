from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers
from app.models.requests import Requests
from app.services.data_loader import population_map, rainfall_map   # ✅ add rainfall_map


# config
WEIGHTS = {
    "skill": 10,
    "distance": 1,
    "experience": 3,
    "workload": 5,
    "population": 1,   # NEW (kept small; we’ll scale separately)
    "rainfall": 1      # NEW
}

URGENCY_WEIGHT = {
    "low": 1,
    "medium": 1.5,
    "high": 2,
    "critical": 3
}

MAX_DISTANCE = 50   # km
MAX_TASKS = 3


def calculate_distance(lat1, lon1, lat2, lon2):
    if None in [lat1, lon1, lat2, lon2]:
        return MAX_DISTANCE

    earth_radius = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        + cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return earth_radius * c


def calculate_volunteer_score(volunteer, request, req_skills):
    score = 0

    # ---- Skills ----
    volunteer_skills = [
        skill.strip().lower()
        for skill in (volunteer.skills or "").split(",")
    ]
    matched_skills = len(set(req_skills).intersection(volunteer_skills))
    score += matched_skills * WEIGHTS["skill"]

    # ---- Distance ----
    distance = calculate_distance(
        volunteer.latitude,
        volunteer.longitude,
        request.latitude,
        request.longitude
    )
    distance_score = max(0, (MAX_DISTANCE - distance))
    score += distance_score * WEIGHTS["distance"]

    # ---- Experience ----
    completed_tasks = getattr(volunteer, "completed_tasks", 0)
    score += completed_tasks * WEIGHTS["experience"]

    # ---- Workload ----
    active_tasks = getattr(volunteer, "active_tasks", 0)
    score -= active_tasks * WEIGHTS["workload"]

    # ---- Context (district-based) ----
    district = (request.district or "").strip().lower()

    population = population_map.get(district, 0)
    rainfall = rainfall_map.get(district, 0)

    # Population scaling (coarse buckets)
    if population > 10_000_000:
        score += 15 * WEIGHTS["population"]
    elif population > 1_000_000:
        score += 10 * WEIGHTS["population"]
    elif population > 500_000:
        score += 5 * WEIGHTS["population"]

    # Rainfall scaling (based on your Avg_rainfall; adjust thresholds if needed)
    if rainfall > 200:
        score += 15 * WEIGHTS["rainfall"]
    elif rainfall > 100:
        score += 10 * WEIGHTS["rainfall"]
    elif rainfall > 50:
        score += 5 * WEIGHTS["rainfall"]

    # ---- Urgency multiplier (apply last) ----
    urgency_multiplier = URGENCY_WEIGHT.get(request.urgency, 1)
    score *= urgency_multiplier

    return score, distance, matched_skills, population, rainfall


def allocate_volunteers_to_request(request_id: int, db: Session):

    request = db.query(Requests).filter(
        Requests.id == request_id
    ).first()

    if not request:
        return None

    req_skills = [
        skill.strip().lower()
        for skill in (request.required_skills or "").split(",")
    ]

    available_volunteers = (
        db.query(Volunteers)
        .filter(Volunteers.availability == True)
        .all()
    )

    scored_volunteers = []

    for volunteer in available_volunteers:

        # Skip overloaded volunteers early
        if getattr(volunteer, "active_tasks", 0) >= MAX_TASKS:
            continue

        score, distance, matched_skills, population, rainfall = calculate_volunteer_score(
            volunteer,
            request,
            req_skills
        )

        # Hard distance cutoff
        if distance > MAX_DISTANCE:
            continue

        active_tasks = getattr(volunteer, "active_tasks", 0)

        # ---- Reason (explainability) ----
        reason = []

        if matched_skills > 0:
            reason.append(f"{matched_skills} skill match")

        if distance < 10:
            reason.append("nearby")

        if active_tasks == 0:
            reason.append("low workload")

        if population > 1_000_000:
            reason.append("high population area")

        if rainfall > 100:
            reason.append("heavy rainfall")

        final_reason = " + ".join(reason)

        scored_volunteers.append({
            "volunteer": volunteer,
            "score": round(score, 2),
            "distance": round(distance, 2),
            "matched_skills": matched_skills,
            "population": population,   # optional
            "rainfall": round(rainfall, 2),  # optional
            "reason": final_reason
        })

    # Rank
    scored_volunteers.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    # Select top N
    selected = scored_volunteers[: request.volunteers_required]

    if not selected:
        return []

    allocated = []

    for item in selected:
        volunteer = item["volunteer"]

        if not volunteer.availability:
            continue

        volunteer.active_tasks = getattr(
            volunteer,
            "active_tasks",
            0
        ) + 1

        if volunteer.active_tasks >= MAX_TASKS:
            volunteer.availability = False

        volunteer.assigned_request_id = request.id
        allocated.append(item)

    request.status = "assigned"

    db.commit()

    for item in allocated:
        db.refresh(item["volunteer"])

    db.refresh(request)

    return allocated