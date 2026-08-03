# MetricMind: Agentic Semantic BI Engine

An enterprise-grade conversational Business Intelligence platform. This repository contains the foundational scaffolding for both the Frontend (React 19 + Vite + TailwindCSS) and Backend (FastAPI + SQLAlchemy + PostgreSQL).

## Features
- **Modern Enterprise SaaS UI**: Glassmorphism, Dark/Light Mode, Responsive layouts built with TailwindCSS and Framer Motion.
- **Robust Authentication**: JWT-based Auth context and protected routes ready for integration.
- **Enterprise Architecture**: Domain-driven backend design, strict typing, centralized config, and normalized PostgreSQL schemas covering 25+ domain tables (Sales, Companies, Metrics, Analytics, Auditing).
- **Extensible API**: Modular FastAPI architecture with global exception handling and standardized JSON responses.

## Folder Structure

```
MetricMind/
├── .env                  # Overarching configuration
├── backend/              # FastAPI Application
│   ├── app/
│   │   ├── api/          # REST endpoints
│   │   ├── auth/         # JWT utilities
│   │   ├── core/         # Settings, exceptions
│   │   ├── database/     # DB connection
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic validation
│   │   └── utils/        # Helpers
│   ├── migrations/       # Alembic migrations
│   └── alembic.ini
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # Reusable UI
│   │   ├── contexts/     # React Contexts (Theme, Auth)
│   │   ├── layouts/      # Dashboard and Main Layouts
│   │   ├── pages/        # Views
│   │   ├── services/     # API integration (Axios)
│   │   └── styles/       # Global CSS
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## Environment Variables
The `.env` file at the root handles variables for both systems. 
- `SQLALCHEMY_DATABASE_URI` must point to your PostgreSQL instance.
- Ensure `SECRET_KEY` is set securely.

## Run Instructions

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL database

### Backend
1. Navigate to `backend/`
2. Activate virtual environment: `.\venv\Scripts\activate` (Windows)
3. Apply migrations: `alembic upgrade head`
4. Run server: `uvicorn app.main:app --reload`
   - API Docs available at `http://localhost:8000/docs`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
   - Application available at `http://localhost:5173`

*Note: AI, semantic layer, and warehousing integrations are marked with TODOs for subsequent implementation phases.*
