from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy import Float, Enum
from sqlalchemy.sql import func
from ..database import Base

class Requests(Base):
    __tablename__ = "ngo_requests"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    description = Column(
        String,
        nullable=False
    )

    latitude = Column(
        Float, 
        nullable=True
    )

    longitude = Column(
        Float, 
        nullable=True
    )

    urgency = Column(
       Enum("low", "medium", "high", "critical", name="urgency_levels"), 
        nullable=False
    )

    required_skills = Column(
         String(200),
         nullable=False
    )

    volunteers_required = Column(
        Integer,
        nullable=False
    )

    requested_at = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now()
    )

    status = Column(
        Enum("pending", "assigned", "completed", "cancelled", name="request_status"),
        nullable=False,
        default="pending"
    )

    assigned_at = Column(
        TIMESTAMP, 
        nullable=True
    )