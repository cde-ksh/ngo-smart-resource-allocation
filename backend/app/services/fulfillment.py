from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.requests import Requests


def mark_fulfilled(db: Session, request_id: int):

    request = db.query(Requests).filter(Requests.id == request_id).first()

    if not request:
        raise HTTPException(status_code=404, detail="Request not found")

    if request.is_fulfilled:
        raise HTTPException(status_code=400, detail="Already fulfilled")

    # Update status
    request.is_fulfilled = True
    request.status = "completed"

    db.commit()
    db.refresh(request)

    return {
        "message": "Request marked as fulfilled",
        "request_id": request.id,
        "status": request.status
    }