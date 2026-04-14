from fastapi import FastAPI
from app.database import engine, Base
from app.routes import volunteers, requests

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "NGO Smart Research Allocation API",
    version = "1.0.0"
)

@app.get("/")
def root():
    return {"message": "NGO Smart Resource Allocation API is running"}

app.include_router(volunteers.router)
app.include_router(requests.router)