from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# CREATE schema
class VolunteerCreate(BaseModel):
    name: str
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    skills: Optional[str]
    role: Optional[str]
    availability: Optional[bool] = True
    registered: Optional[datetime] = None
    state: Optional[str]
    district: Optional[str]
    transport: Optional[str]


# UPDATE schema (partial)
class VolunteerUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    skills: Optional[str]
    role: Optional[str]
    availability: Optional[bool]
    state: Optional[str]
    district: Optional[str]
    transport: Optional[str]