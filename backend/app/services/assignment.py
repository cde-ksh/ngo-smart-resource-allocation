from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.requests import Requests
from app.models.volunteers import Volunteers


def assign_volunteer(
    db: Session,
    request_id: int,
    volunteer_id: int
):
    # =====================================
    # GET REQUEST
    # =====================================

    request = (
        db.query(Requests)
        .filter(Requests.id == request_id)
        .first()
    )

    if not request:
        raise HTTPException(
            status_code=404,
            detail="Request not found"
        )

    # =====================================
    # CHECK REQUEST STATUS
    # =====================================

    if request.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Request already completed"
        )

    if request.status == "cancelled":
        raise HTTPException(
            status_code=400,
            detail="Request is cancelled"
        )

    # =====================================
    # GET VOLUNTEER
    # =====================================

    volunteer = (
        db.query(Volunteers)
        .filter(Volunteers.id == volunteer_id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=404,
            detail="Volunteer not found"
        )

    # =====================================
    # CHECK IF VOLUNTEER ALREADY ASSIGNED
    # =====================================

    if volunteer.assigned_request_id is not None:
        raise HTTPException(
            status_code=400,
            detail="Volunteer already assigned"
        )

    # =====================================
    # ASSIGN VOLUNTEER
    # =====================================

    volunteer.assigned_request_id = request.id
    request.status = "assigned"

    db.commit()
    db.refresh(request)
    db.refresh(volunteer)

    # =====================================
    # RESPONSE
    # =====================================

    return {
        "message": "Volunteer assigned successfully",
        "request_id": request.id,
        "volunteer_id": volunteer.id,
        "request_status": request.status
    }