from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class VolunteerCreate(BaseModel):
    name: str
    phone: str   # FIXED (required)
    email: Optional[str] = None
    address: Optional[str] = None
    skills: str  # FIXED (required because DB says nullable=False)
    role: Optional[str] = None
    availability: Optional[bool] = True
    registered: Optional[datetime] = None
    state: Optional[str] = None
    district: Optional[str] = None
    transport: Optional[str] = None


class VolunteerUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    skills: Optional[str] = None
    role: Optional[str] = None
    availability: Optional[bool] = None
    state: Optional[str] = None
    district: Optional[str] = None
    transport: Optional[str] = None