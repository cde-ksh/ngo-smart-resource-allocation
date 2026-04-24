from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.requests import Requests
from app.models.volunteers import Volunteers


def mark_fulfilled(
    db: Session,
    request_id: int
):
    # =====================================
    # FETCH REQUEST
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
    # ALREADY COMPLETED CHECK
    # =====================================

    if request.is_fulfilled:
        raise HTTPException(
            status_code=400,
            detail="Request already fulfilled"
        )

    try:
        # =====================================
        # UPDATE REQUEST STATUS
        # =====================================

        request.is_fulfilled = True
        request.status = "completed"

        # =====================================
        # RELEASE ASSIGNED VOLUNTEERS
        # =====================================

        assigned_volunteers = (
            db.query(Volunteers)
            .filter(
                Volunteers.assigned_request_id == request.id
            )
            .all()
        )

        for volunteer in assigned_volunteers:
            # reduce active tasks safely
            current_tasks = getattr(
                volunteer,
                "active_tasks",
                0
            )

            if current_tasks > 0:
                volunteer.active_tasks = current_tasks - 1

            # mark available again
            volunteer.availability = True

            # clear assignment
            volunteer.assigned_request_id = None

            # optionally track experience
            completed = getattr(
                volunteer,
                "completed_tasks",
                0
            )

            volunteer.completed_tasks = completed + 1

        db.commit()

    except Exception as e:
        db.rollback()
        raise e

    db.refresh(request)

    return {
        "message": "Request marked as fulfilled",
        "request_id": request.id,
        "status": request.status,
        "released_volunteers": len(assigned_volunteers)
    }