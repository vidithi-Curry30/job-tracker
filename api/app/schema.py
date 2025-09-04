# api/app/schema.py
import strawberry
from typing import List, Optional
from sqlalchemy.orm import Session

from .db import SessionLocal
from . import models

# 1) Expose the Python Enum as a GraphQL Enum
Status = strawberry.enum(models.StatusEnum, name="Status")

# 2) GraphQL types (camelCase field for current status)
@strawberry.type
class ApplicationType:
    id: int
    company: str
    role: str
    currentStatus: Status

@strawberry.input
class ApplicationInput:
    company: str
    role: str

# 3) Resolvers
def _to_gql(app: models.Application) -> ApplicationType:
    return ApplicationType(
        id=app.id,
        company=app.company,
        role=app.role,
        currentStatus=app.current_status,
    )

@strawberry.type
class Query:
    applications: List[ApplicationType]

    @strawberry.field
    def applications(self) -> List[ApplicationType]:
        session: Session = SessionLocal()
        try:
            rows = session.query(models.Application).order_by(models.Application.id.asc()).all()
            return [_to_gql(r) for r in rows]
        finally:
            session.close()

@strawberry.type
class Mutation:
    @strawberry.mutation
    def createApplication(self, input: ApplicationInput) -> ApplicationType:
        session: Session = SessionLocal()
        try:
            app = models.Application(
                company=input.company,
                role=input.role,
                current_status=models.StatusEnum.SAVED,
            )
            session.add(app)
            session.commit()
            session.refresh(app)
            return _to_gql(app)
        finally:
            session.close()

    @strawberry.mutation
    def updateApplicationStatus(self, id: int, status: Status) -> ApplicationType:
        session: Session = SessionLocal()
        try:
            app = session.query(models.Application).filter(models.Application.id == id).first()
            if not app:
                raise Exception("Application not found")
            app.current_status = status
            session.commit()
            session.refresh(app)
            return _to_gql(app)
        finally:
            session.close()

    @strawberry.mutation
    def deleteApplication(self, id: int) -> bool:
        session: Session = SessionLocal()
        try:
            app = session.query(models.Application).filter(models.Application.id == id).first()
            if not app:
                return False
            session.delete(app)
            session.commit()
            return True
        finally:
            session.close()

schema = strawberry.Schema(query=Query, mutation=Mutation)