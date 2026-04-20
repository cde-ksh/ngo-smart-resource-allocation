from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from backend.app.services.fulfillment import mark_fulfilled

router = APIRouter()

@router.post("/mark-fulfilled/{request_id}")
def fulfill(request_id: int, db: Session = Depends(get_db)):
    return mark_fulfilled(db, request_id)