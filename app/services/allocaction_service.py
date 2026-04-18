from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers
from app.models.requests import Requests


# config
WEIGHTS = {
    "skill": 10,
    "distance": 1,
    "experience": 3,
    "workload": 5
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
    """
    Calculate distance in KM using Haversine formula.
    """
    if None in [lat1, lon1, lat2, lon2]:
        return MAX_DISTANCE

    earth_radius = 6371  # km

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
    """
    Calculate smart score for each volunteer.

    Score factors:
    - skill match
    - distance
    - experience
    - workload balance
    - urgency
    """
    score = 0

    # Normalize volunteer skills
    volunteer_skills = [
        skill.strip().lower()
        for skill in (volunteer.skills or "").split(",")
    ]

    # 1) Skill match score
    matched_skills = len(
        set(req_skills).intersection(set(volunteer_skills))
    )
    score += matched_skills * WEIGHTS["skill"]

    # 2) Distance score (closer = better)
    distance = calculate_distance(
        volunteer.latitude,
        volunteer.longitude,
        request.latitude,
        request.longitude
    )

    distance_score = max(0, (MAX_DISTANCE - distance))
    score += distance_score * WEIGHTS["distance"]

    # 3) Experience bonus
    completed_tasks = getattr(volunteer, "completed_tasks", 0)
    score += completed_tasks * WEIGHTS["experience"]

    # 4) Workload balancing
    active_tasks = getattr(volunteer, "active_tasks", 0)
    score -= active_tasks * WEIGHTS["workload"]

    # 5) Urgency multiplier
    urgency_multiplier = URGENCY_WEIGHT.get(request.urgency, 1)
    score *= urgency_multiplier

    return score, distance, matched_skills


def allocate_volunteers_to_request(request_id: int, db: Session):
    """
    Smart volunteer allocation based on:
    - skills
    - distance
    - availability
    - experience
    - workload
    """

    # Get request
    request = db.query(Requests).filter(
        Requests.id == request_id
    ).first()

    if not request:
        return None

    # Normalize request skills
    req_skills = [
        skill.strip().lower()
        for skill in (request.required_skills or "").split(",")
    ]

    # Get only available volunteers
    available_volunteers = (
        db.query(Volunteers)
        .filter(Volunteers.availability == True)
        .all()
    )

    scored_volunteers = []

    # Score every volunteer
    for volunteer in available_volunteers:

        # Skip overloaded volunteers
        if getattr(volunteer, "active_tasks", 0) >= MAX_TASKS:
            continue

        score, distance, matched_skills = calculate_volunteer_score(
            volunteer,
            request,
            req_skills
        )

        active_tasks = getattr(volunteer, "active_tasks", 0)

        reason = []

        if matched_skills > 0:
            reason.append(f"{matched_skills} skill match")

        if distance < 10:
            reason.append("nearby")

        if active_tasks == 0:
            reason.append("low workload")

        final_reason = " + ".join(reason)

        scored_volunteers.append({
            "volunteer": volunteer,
            "score": score,
            "distance": round(distance, 2),
            "matched_skills": matched_skills,
            "reason": final_reason
        })

    # Sort by highest score
    scored_volunteers.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    # Pick top required volunteers
    selected = scored_volunteers[
        : request.volunteers_required
    ]

    # No matching volunteers
    if not selected:
        return []

    allocated = []

    # Update volunteer state
    for item in selected:
        volunteer = item["volunteer"]

        # Double-check availability
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

    # Update request status
    request.status = "assigned"

    db.commit()

    # Refresh updated objects
    for item in allocated:
        db.refresh(item["volunteer"])

    db.refresh(request)

    return allocated