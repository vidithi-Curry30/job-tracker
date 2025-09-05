# Job Tracker

A full-stack job application tracker to organize and monitor applications through different stages (Saved, Applied, Rejected).  

## 🚀 Features
- Add new job applications (company + role).
- Update application status (Saved → Applied → Rejected).
- Delete applications.
- Persistent storage with PostgreSQL database.
- GraphQL API with FastAPI + Strawberry.
- React + Apollo Client frontend.
- Dockerized backend + database for easy development.

---

## 🛠 Tech Stack
- **Frontend**: React (Vite), Apollo Client
- **Backend**: FastAPI, Strawberry GraphQL
- **Database**: PostgreSQL
- **Dev Tools**: Docker Compose, Poetry, Node.js
- **Language**: Python 3.11, TypeScript/JavaScript

---

## ⚡ Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (v18+ recommended)

### Backend (API + DB)
```bash
cd job-tracker/api
docker compose up --build
```
---

## 📸 Frontend Screenshots

### Dashboard
![Frontend Dashboard](docs/frontend/Frontend%20Dashboard.png)

### Add Application
![Frontend Add](docs/frontend/Frontend%20Add.png)

### Reject Application
![Frontend Reject](docs/frontend/Frontend%20Reject.png)

### Delete Application
![Frontend Delete](docs/frontend/Frontend%20Delete.png)

## 🛠 Backend Highlights

- **FastAPI + Strawberry GraphQL** server providing a clean schema-based API.  
- **PostgreSQL database** with Dockerized persistence for reliable storage.  
- **GraphQL mutations** to add, update, and delete job applications.  
- **Enum-based statuses** (`SAVED`, `APPLIED`, `REJECTED`) for consistent state management.  
- **Docker Compose** setup for running API + DB with one command.  
- Hot-reloading enabled for rapid backend development.  

### Example: Create a Job Application
```graphql
mutation {
  createApplication(input: {
    company: "Google"
    role: "Software Engineering Intern"
  }) {
    id
    company
    role
    currentStatus
  }
}
