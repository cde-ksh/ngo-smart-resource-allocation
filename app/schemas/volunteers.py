from pydantic import BaseModel

class Volunteer(BaseModel):
    full_name: str
    phone: str
    email: str
    state: str
    district: str
    skills: str
    role: str
    availability: str
    transport: str
