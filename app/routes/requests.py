from fastapi import FastAPI, HTTPException, status, Response, Depends
from sqlalchemy.orm import Session 
from app.models.requests import Requests
from app.schemas.requests import Request
from app.database import get_db 


app = FastAPI()

# creating requests
@app.post('/requests')
def create_requests(request: Request, db: Session = Depends(get_db)):
    new_request = Requests(**request.model_dump())
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return new_request


# get all requests
@app.get('/requests')
def get_requests(db: Session = Depends(get_db)):
    requests = db.query(Requests).all()
    return requests


# get requests by id
@app.get('/requests/{id}')
def get_request(id: int, db: Session = Depends(get_db)):
    request = db.query(Requests).filter(Requests.id == id).first()
    if not request:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"The request with id {id} is not found"
        )
    return request


@app.delete('/requests/{id}')
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
@app.put('/requests/{id}')
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