from fastapi import FastAPI, HTTPException, status, Response, Depends
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers       #  ----> SQLAlchemy Model
from app.database import engine, get_db            #  ----> database
from app.schemas.volunteers import Volunteer       #  ----> volunteer Schema


app = FastAPI()

# add Volunteers
@app.post('/volunteers')
def create_volunteer(volunteer: Volunteer, db: Session = Depends(get_db)):
    new_volunteer = Volunteers(**volunteer.model_dump())
    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)
    return {"Volunteer Data": new_volunteer}


# get Volunteers 
@app.get("/volunteers")
def get_volunteers(db: Session = Depends(get_db)):
    volunteers = db.query(Volunteers).all()        #  ----> all volunteers 
    return {"Volunteer Data": volunteers}


# get Volunteers by id
@app.get("/volunteers/{id}")
def get_volunteers(id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteers).filter(Volunteers.id == id).first()  #  ----> object
    if not volunteer:
        raise HTTPException ( 
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Volunteer with id {id} is not found"
        )
    return {"Volunteer Detail": volunteer}


# delete Volunteers
@app.delete("/volunteers/{id}")
def delete_volunteers(id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteers).filter(Volunteers.id == id)    #  ----> query
    if volunteer.first() == None:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Volunteer with id {id} is not found"
        )
    volunteer.delete(synchronize_session=False)
    db.commit()
    return Response(status_code = status.HTTP_204_NO_CONTENT)
        

# update Volunteers
@app.put("/volunteers/{id}")
def update_volunteer(id: int, updated_volunteer: Volunteer, db: Session = Depends(get_db)):
    volunteer_query = db.query(Volunteers).filter(Volunteers.id == id)    #  ----> querry
    volunteer = volunteer_query.first()                                   #  ----> volunteer object
    if not volunteer:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Volunteer with id {id} is not found"
        )
    volunteer_query.update(updated_volunteer.model_dump(), synchronize_session=False)
    db.commit()
    return {"Volunteer Data": volunteer_query.first()}
