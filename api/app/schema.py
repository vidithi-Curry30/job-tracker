import strawberry
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from .db import get_db
from . import models

# ✅ Wrap the existing Python Enum instead of subclassing it
Status = strawberry.enum(models.StatusEnum, name="Status")

@strawberry.type
class Application:
    id: int
    company: str
    role: str
    current_status: Status
    created_at: datetime
    updated_at: datetime

@strawberry.input
class ApplicationInput:
    company: str
    role: str

def app_to_gql(a: models.Application) -> Application:
    return Application(
        id=a.id,
        company=a.company,
        role=a.role,
        current_status=a.current_status,
        created_at=a.created_at,
        updated_at=a.updated_at,
    )

@strawberry.type
class Query:
    @strawberry.field
    def applications(self) -> List[Application]:
        db: Session = next(get_db())
        rows = db.query(models.Application).order_by(models.Application.created_at.desc()).all()
        return [app_to_gql(a) for a in rows]

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_application(self, input: ApplicationInput) -> Application:
        db: Session = next(get_db())
        a = models.Application(company=input.company, role=input.role)
        db.add(a)
        db.commit()
        db.refresh(a)
        return app_to_gql(a)

schema = strawberry.Schema(query=Query, mutation=Mutation)