from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql import func

from ..database import Base


class Volunteers(Base):
    __tablename__ = "volunteers"

    # =====================================
    # PRIMARY KEY
    # =====================================

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True,
        nullable=False
    )

    # =====================================
    # BASIC INFO
    # =====================================

    name = Column(
        String(200),
        nullable=False
    )

    phone = Column(
        String(20),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=True
    )

    address = Column(
        String(5000),
        nullable=True
    )

    # =====================================
    # VOLUNTEER PROFILE
    # =====================================

    skills = Column(
        String(1000),
        nullable=False
    )

    role = Column(
        String(1000),
        nullable=True
    )

    availability = Column(
        Boolean,
        default=True
    )

    transport = Column(
        String(100),
        nullable=True
    )

    # =====================================
    # LOCATION
    # =====================================

    state = Column(
        String(100),
        nullable=True
    )

    district = Column(
        String(100),
        nullable=True
    )

    latitude = Column(
        Float,
        nullable=True
    )

    longitude = Column(
        Float,
        nullable=True
    )

    # =====================================
    # TASK TRACKING
    # =====================================

    active_tasks = Column(
        Integer,
        default=0,
        nullable=False
    )

    completed_tasks = Column(
        Integer,
        default=0,
        nullable=False
    )

    # =====================================
    # ASSIGNMENT
    # =====================================

    assigned_request_id = Column(
        Integer,
        ForeignKey("ngo_requests.id"),
        nullable=True
    )

    request = relationship(
        "Requests",
        back_populates="volunteers"
    )

    # =====================================
    # TIMESTAMP
    # =====================================

    registered = Column(
        TIMESTAMP,
        nullable=False,
        server_default=func.now()
    )