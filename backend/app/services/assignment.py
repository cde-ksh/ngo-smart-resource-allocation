from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.requests import Requests
from app.models.volunteers import Volunteers

def assign_volunteer(db: Session, request_id: int, volunteer_id: int):

    request = db.query(Requests).filter(Requests.id == request_id).first()

    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    if request.is_fulfilled:
        raise HTTPException(status_code=400, detail="Already fulfilled")

    volunteer = db.query(Volunteers).filter(Volunteers.id == volunteer_id).first()

    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")

    if getattr(volunteer, "is_assigned", False):
        raise HTTPException(status_code=400, detail="Volunteer already assigned")

    # Assign
    request.volunteer_id = volunteer_id
    request.status = "assigned"

    # Optional: track volunteer state
    volunteer.is_assigned = True

    db.commit()
    db.refresh(request)

    return {
        "message": "Volunteer assigned successfully",
        "request_id": request.id,
        "volunteer_id": volunteer_id,
        "status": request.status
    }