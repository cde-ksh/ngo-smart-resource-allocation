from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.assignment import assign_volunteer

router = APIRouter()

@router.post("/assign/{request_id}/{volunteer_id}")
def assign(request_id: int, volunteer_id: int, db: Session = Depends(get_db)):
    return assign_volunteer(db, request_id, volunteer_id)