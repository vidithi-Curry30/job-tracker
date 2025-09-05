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

📸 Frontend Screenshots

### Dashboard
![Frontend Dashboard](docs/frontend/Frontend%20Dashboard.png)

### Add Application
![Frontend Add](docs/frontend/Frontend%20Add.png)

### Delete Application
![Frontend Delete](docs/frontend/Frontend%20Delete.png)

### Reject Application
![Frontend Reject](docs/frontend/Frontend%20Reject.png)
