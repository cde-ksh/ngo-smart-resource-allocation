from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.matching import match_volunteers
from app.models.requests import Requests
from app.models.volunteers import Volunteers

router = APIRouter()

@router.get("/match-volunteers/{request_id}")
def match(request_id: int, db: Session = Depends(get_db)):
    request = db.query(Requests).filter(
    Requests.id == request_id
).first()
    volunteers = db.query(Volunteers).all()
    if not request:
        return {"message": "Request not found"}

    return match_volunteers(request, volunteers)