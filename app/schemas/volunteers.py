from pydantic import BaseModel

class Volunteer(BaseModel):
    name: str
    phone: str
    email: str | None = None
    address: str | None = None
    district: str
    skills: str
    role: str 
    availability: bool = True
    transport: str 
