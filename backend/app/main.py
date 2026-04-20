from fastapi import FastAPI
from app.database import engine, Base
from app.routes import volunteers, requests, allocation
from fastapi.middleware.cors import CORSMiddleware
from app.routes import matching

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "NGO Smart Research Allocation API",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "NGO Smart Resource Allocation API is running"}

app.include_router(volunteers.router)
app.include_router(requests.router)
app.include_router(allocation.router)
app.include_router(matching.router)