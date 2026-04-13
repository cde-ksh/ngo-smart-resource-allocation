from pydantic import BaseModel

class Request(BaseModel):
    title: str
    description: str
    location: str
    urgency: str
    volunteers_required: int
    required_skills: str
