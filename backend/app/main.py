from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.routes import (
    volunteers,
    requests,
    allocation,
    matching,
    assignment,
    fulfillment,
)

# =====================================
# CREATE TABLES
# =====================================

Base.metadata.create_all(bind=engine)

# =====================================
# FASTAPI APP
# =====================================

app = FastAPI(
    title="NGO Smart Resource Allocation API",
    version="1.0.0"
)

# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# ROOT
# =====================================

@app.get("/")
def root():
    return {
        "message": "NGO Smart Resource Allocation API is running"
    }

# =====================================
# ROUTES
# =====================================

app.include_router(volunteers.router)
app.include_router(requests.router)
app.include_router(allocation.router)
app.include_router(matching.router)
app.include_router(assignment.router)
app.include_router(fulfillment.router)