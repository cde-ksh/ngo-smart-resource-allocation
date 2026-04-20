from fastapi import APIRouter, HTTPException, status, Response, Depends
from sqlalchemy.orm import Session
from app.models.volunteers import Volunteers
from app.database import get_db
from app.schemas.volunteers import VolunteerCreate, VolunteerUpdate
from app.utils.geocode import get_coordinates


router = APIRouter(
    prefix="/volunteers",
    tags=["Volunteers"]
)


# ---------------- CREATE ---------------- #
@router.post("/")
def create_volunteer(volunteer: VolunteerCreate, db: Session = Depends(get_db)):

    full_address = f"{volunteer.district or ''}, {volunteer.state or ''}, India"
    lat, lon = get_coordinates(full_address)

    new_volunteer = Volunteers(
        **volunteer.model_dump(),
        latitude=lat,
        longitude=lon
    )

    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)

    return {
        "status": "success",
        "data": new_volunteer
    }


# ---------------- GET ALL ---------------- #
@router.get("/")
def get_all_volunteers(db: Session = Depends(get_db)):
    volunteers = db.query(Volunteers).all()

    return {
        "status": "success",
        "data": volunteers
    }


# ---------------- GET BY ID ---------------- #
@router.get("/{id}")
def get_volunteer(id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteers).filter(Volunteers.id == id).first()

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Volunteer with id {id} not found"
        )

    return {
        "status": "success",
        "data": volunteer
    }


# ---------------- DELETE ---------------- #
@router.delete("/{id}")
def delete_volunteer(id: int, db: Session = Depends(get_db)):
    volunteer = db.query(Volunteers).filter(Volunteers.id == id).first()

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Volunteer with id {id} not found"
        )

    db.delete(volunteer)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


# ---------------- UPDATE ---------------- #
@router.put("/{id}")
def update_volunteer(id: int, updated_data: VolunteerUpdate, db: Session = Depends(get_db)):

    volunteer = db.query(Volunteers).filter(Volunteers.id == id).first()

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Volunteer not found"
        )

    update_dict = updated_data.model_dump(exclude_unset=True)

    # recalc coordinates if location changes
    if any(field in update_dict for field in ["address", "district", "state"]):
        full_address = f"{update_dict.get('address', volunteer.address)}, {update_dict.get('district', volunteer.district)}, {update_dict.get('state', volunteer.state)}"
        lat, lon = get_coordinates(full_address)

        update_dict["latitude"] = lat
        update_dict["longitude"] = lon

    for key, value in update_dict.items():
        setattr(volunteer, key, value)

    db.commit()
    db.refresh(volunteer)

    return {
        "status": "success",
        "data": volunteer
    }