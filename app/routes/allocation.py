from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import allocate_volunteers_to_request

router = APIRouter(
    prefix="/allocation",
    tags=["Smart Allocation"]
)

@router.post("/{request_id}")
def smart_allocate(request_id: int, db: Session = Depends(get_db)):
    allocated = allocate_volunteers_to_request(request_id, db)
    if allocated == None:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "Request not found"
        )
    if len(allocated) == 0:
        return {
            "message": "No suitable volunteers found",
            "allocated_volunteers": []
        }
    return {
         "message": "Smart volunteer allocation completed",
        "allocated_volunteers": allocated
    }