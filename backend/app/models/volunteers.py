from sqlalchemy import Column, String, Integer, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql import func
from ..database import Base

class Volunteers(Base):
    __tablename__ = "volunteers"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)

    name = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), unique=True, nullable=True)

    address = Column(String(5000), nullable=True)
    skills = Column(String(1000), nullable=False)
    role = Column(String(1000), nullable=True)

    availability = Column(Boolean, default=True)

    registered = Column(TIMESTAMP, nullable=False, server_default=func.now())

    state = Column(String(100), nullable=True)
    district = Column(String(100), nullable=True)
    transport = Column(String(100), nullable=True)

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # FIXED FOREIGN KEY (correct table name)
    assigned_request_id = Column(
        Integer,
        ForeignKey("ngo_requests.id"),
        nullable=True
    )

    # RELATIONSHIP
    request = relationship("Requests", back_populates="volunteers")