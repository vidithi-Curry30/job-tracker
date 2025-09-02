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
    def createApplication(self, input: ApplicationInput) -> ApplicationType:
        db: Session = next(get_db())
        app = models.Application(company=input.company, role=input.role)
        db.add(app)
        db.commit()
        db.refresh(app)
        return app

    @strawberry.mutation
    def updateStatus(self, id: int, status: Status) -> ApplicationType | None:
        db: Session = next(get_db())
        app = db.get(models.Application, id)
        if not app:
            return None
        app.current_status = status.value  # if Status is strawberry.enum
        db.commit()
        db.refresh(app)
        return app

    @strawberry.mutation
    def delete_application(self, id: int) -> bool:
        db: Session = next(get_db())
        app = db.get(models.Application, id)
        if not app:
            return False
        db.delete(app)
        db.commit()
        return True

schema = strawberry.Schema(query=Query, mutation=Mutation)