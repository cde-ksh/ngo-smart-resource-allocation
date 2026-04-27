from pydantic import BaseModel
from typing import Optional


class RequestCreate(BaseModel):
    title: str
    description: str
    urgency: str
    volunteers_required: int
    required_skills: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class RequestUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    urgency: Optional[str] = None
    volunteers_required: Optional[int] = None
    required_skills: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None