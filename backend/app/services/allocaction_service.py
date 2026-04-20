from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers
from app.models.requests import Requests
from app.services.data_loader import population_map, rainfall_map


# ---------------- CONFIG ---------------- #

WEIGHTS = {
    "skill": 10,
    "distance": 1,
    "experience": 3,
    "workload": 5,
    "population": 1,
    "rainfall": 1
}

URGENCY_WEIGHT = {
    "low": 1,
    "medium": 1.5,
    "high": 2,
    "critical": 3
}

MAX_DISTANCE = 50   # km
MAX_TASKS = 3


# ---------------- HELPERS ---------------- #

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

    volunteer_skills = [
        skill.strip().lower()
        for skill in (volunteer.skills or "").split(",")
    ]

    # ✅ improved skill matching (partial)
    matched_skills = sum(
        1 for rs in req_skills
        for vs in volunteer_skills
        if rs in vs or vs in rs
    )

    if matched_skills == 0:
        return None  # reject irrelevant volunteers

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

    # ---- Context ----
    district = (request.district or "").strip().lower()

    population = population_map.get(district, 0)
    rainfall = rainfall_map.get(district, 0)

    if population > 10_000_000:
        score += 15 * WEIGHTS["population"]
    elif population > 1_000_000:
        score += 10 * WEIGHTS["population"]
    elif population > 500_000:
        score += 5 * WEIGHTS["population"]

    if rainfall > 200:
        score += 15 * WEIGHTS["rainfall"]
    elif rainfall > 100:
        score += 10 * WEIGHTS["rainfall"]
    elif rainfall > 50:
        score += 5 * WEIGHTS["rainfall"]

    # ---- Urgency ----
    urgency_multiplier = URGENCY_WEIGHT.get(request.urgency, 1)
    score *= urgency_multiplier

    return score, distance, matched_skills, population, rainfall


# ---------------- MAIN FUNCTION ---------------- #

def allocate_volunteers_to_request(request_id: int, db: Session):

    request = db.query(Requests).filter(Requests.id == request_id).first()

    if not request:
        return None

    required = request.volunteers_required or 1

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

        # skip overloaded
        if getattr(volunteer, "active_tasks", 0) >= MAX_TASKS:
            continue

        result = calculate_volunteer_score(volunteer, request, req_skills)

        if result is None:
            continue

        score, distance, matched_skills, population, rainfall = result

        if distance > MAX_DISTANCE:
            continue

        active_tasks = getattr(volunteer, "active_tasks", 0)

        # ---- Reason ----
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

        final_reason = " + ".join(reason) if reason else "general allocation"

        scored_volunteers.append({
            "volunteer": volunteer,
            "score": round(score, 2),
            "distance": round(distance, 2),
            "matched_skills": matched_skills,
            "reason": final_reason
        })

    # ---------------- FALLBACK ---------------- #
    if not scored_volunteers:
        # relax distance constraint
        for volunteer in available_volunteers:

            if getattr(volunteer, "active_tasks", 0) >= MAX_TASKS:
                continue

            result = calculate_volunteer_score(volunteer, request, req_skills)
            if result is None:
                continue

            score, distance, matched_skills, _, _ = result

            scored_volunteers.append({
                "volunteer": volunteer,
                "score": round(score, 2),
                "distance": round(distance, 2),
                "matched_skills": matched_skills,
                "reason": "fallback allocation"
            })

    # ---------------- SORT ---------------- #
    scored_volunteers.sort(key=lambda x: x["score"], reverse=True)

    selected = scored_volunteers[:required]

    if not selected:
        return []

    allocated = []

    try:
        for item in selected:
            volunteer = item["volunteer"]

            if not volunteer.availability:
                continue

            volunteer.active_tasks = getattr(volunteer, "active_tasks", 0) + 1

            if volunteer.active_tasks >= MAX_TASKS:
                volunteer.availability = False

            volunteer.assigned_request_id = request.id
            allocated.append(item)

        # ---------------- STATUS LOGIC ---------------- #
        if len(allocated) >= required:
            request.is_fulfilled = True
            request.status = "fulfilled"
        else:
            request.status = "partial"

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    for item in allocated:
        db.refresh(item["volunteer"])

    db.refresh(request)

    return allocated