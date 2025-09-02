from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

from .schema import schema
from .db import Base, engine

# Create DB tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Job Tracker API")

# CORS: allow local dev + future Vercel deploy (replace with your custom domain later if you add one)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://*.vercel.app",         # Vercel preview/production URLs
        "https://your-custom-domain.com"  # (optional) replace if you attach a custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple health check at "/"
@app.get("/")
def health():
    return {"status": "ok"}

# GraphQL mounted at /graphql
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")