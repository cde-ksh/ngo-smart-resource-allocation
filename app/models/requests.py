from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql import func
from ..database import Base

class Request(Base):
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
        String(200),
        nullable=False
    )

    location = Column(
        String(500),
        nullable=False
    )

    urgency = Column(
        String(50), 
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

    is_fulfilled = Column(
        Boolean,
        default=False
    )

    requested_at = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now()
    )