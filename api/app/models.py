from sqlalchemy import Column, Integer, String, DateTime, Enum
from datetime import datetime
import enum
from .db import Base

class StatusEnum(str, enum.Enum):
    SAVED = "SAVED"
    APPLIED = "APPLIED"
    OA = "OA"
    PHONE = "PHONE"
    ONSITE = "ONSITE"
    OFFER = "OFFER"
    REJECTED = "REJECTED"

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    company = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    current_status = Column(Enum(StatusEnum), nullable=False, default=StatusEnum.SAVED)

    # ✅ timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)