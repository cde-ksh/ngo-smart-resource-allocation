from fastapi import status
from sqlalchemy.orm import Session
from app.models.requests import Requests
from app.models.volunteers import Volunteers
from app.routes.requests import Request
from app.services import allocate_volunteers_to_request


def allocate_all_sessions(db: Session):
    pending_requests = db.query(Requests).filter(Requests.status == "pending").all()

    if not pending_requests:
        return []
    
    results = []
    for request in pending_requests:
        allocated = allocate_volunteers_to_request(request.id, db)
        results.append({
            "request_id": request.id,
            "allocated_count": len(allocated) if allocated else 0
        })

        remaining = db.query(Volunteers).filter(Volunteers.availability == True).count()

        if remaining == 0:
            break

    return results

