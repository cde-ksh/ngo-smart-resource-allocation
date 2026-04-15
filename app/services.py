from math import radians, sin, cos, sqrt, atan2
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers
from app.models.requests import Requests


def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance in KM using Haversine formula.
    """
    if None in [lat1, lon1, lat2, lon2]:
        return 9999  # very high distance if location missing

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
    """
    score = 0

    # Normalize volunteer skills
    volunteer_skills = [
        skill.strip().lower()
        for skill in volunteer.skills.split(",")
    ]

    # 1) Skill match score
    matched_skills = len(
        set(req_skills).intersection(set(volunteer_skills))
    )
    score += matched_skills * 10

    # 2) Distance score (closer = better)
    distance = calculate_distance(
        volunteer.latitude,
        volunteer.longitude,
        request.latitude,
        request.longitude
    )

    # subtract distance as penalty
    score -= distance * 2

    # 3) Experience bonus
    completed_tasks = getattr(volunteer, "completed_tasks", 0)
    score += completed_tasks * 3

    # 4) Workload balancing
    active_tasks = getattr(volunteer, "active_tasks", 0)
    score -= active_tasks * 5

    return score


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
        for skill in request.required_skills.split(",")
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
        score = calculate_volunteer_score(
            volunteer,
            request,
            req_skills
        )

        # Only consider if at least one skill matched
        volunteer_skills = [
            skill.strip().lower()
            for skill in volunteer.skills.split(",")
        ]

        if any(skill in volunteer_skills for skill in req_skills):
            scored_volunteers.append((score, volunteer))

    # Sort by highest score
    scored_volunteers.sort(
        key=lambda item: item[0],
        reverse=True
    )

    # Pick top required volunteers
    allocated = [
        volunteer
        for score, volunteer in scored_volunteers[
            : request.volunteers_required
        ]
    ]

    # No matching volunteers
    if not allocated:
        return []

    # Update volunteer state
    for volunteer in allocated:
        volunteer.availability = False
        volunteer.assigned_request_id = request.id

        # Increase active task count
        volunteer.active_tasks = getattr(
            volunteer,
            "active_tasks",
            0
        ) + 1

    # Update request status
    request.status = "assigned"

    db.commit()

    # Refresh updated objects
    for volunteer in allocated:
        db.refresh(volunteer)

    db.refresh(request)

    return allocated