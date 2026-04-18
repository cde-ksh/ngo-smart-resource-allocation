from fastapi import APIRouter, HTTPException, status, Response, Depends
from sqlalchemy.orm import Session 
from app.models.requests import Requests
from app.schemas.requests import Request
from app.database import get_db 


router = APIRouter(
    prefix="/requests",
    tags=["Requests"]
)

# creating requests
@router.post('/')
def create_requests(request: Request, db: Session = Depends(get_db)):
    new_request = Requests(**request.model_dump())
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request


# get all requests
@router.get('/')
def get_requests(db: Session = Depends(get_db)):
    requests = db.query(Requests).all()
    return requests


# get requests by id
@router.get('/{id}')
def get_request(id: int, db: Session = Depends(get_db)):
    request = db.query(Requests).filter(Requests.id == id).first()
    if not request:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"The request with id {id} is not found"
        )
    return request


@router.delete('/{id}')
def delete_request(id: int, db: Session = Depends(get_db)):
    request = db.query(Requests).filter(Requests.id == id)    #  ----> query
    if request.first() == None:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"request with id {id} is not found"
        )
    request.delete(synchronize_session=False)
    db.commit()
    return Response(status_code = status.HTTP_204_NO_CONTENT)


# update requests
@router.put('/{id}')
def update_request(id: int, updated_request: Request, db: Session = Depends(get_db)):
    request_query = db.query(Requests).filter(Requests.id == id)    #  ----> querry
    request = request_query.first()                                   #  ----> volunteer object
    if not request:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"The request with id {id} is not found"
        )
    request_query.update(updated_request.model_dump(), synchronize_session=False)
    db.commit()
    return request_query.first()