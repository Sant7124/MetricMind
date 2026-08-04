# MetricMind
**Enterprise Agentic Semantic BI Engine**

![MetricMind Architecture](https://via.placeholder.com/1200x600.png?text=MetricMind+Enterprise+Architecture)

MetricMind is a production-grade, Agentic Conversational Business Intelligence platform. It completely reimagines how enterprises query and interact with their data by placing a strict Semantic Engine between the LLM and the Data Warehouse. The AI NEVER writes raw SQL; it only navigates governed business metrics.

---

## 🚀 Enterprise Features

### 1. Semantic Query Engine (Governance)
- **Single Source of Truth**: Define metrics (e.g., `Gross Margin`, `Net Revenue`) centrally in YAML/JSON.
- **Strict Validation**: Users and AI cannot query combinations of metrics/dimensions that are semantically invalid.
- **SQL Injection Prevention**: All queries are dynamically parameterized and routed through SQLAlchemy Core.

### 2. Conversational BI (Agentic AI)
- **Natural Language to JSON**: AI interprets intent and extracts business parameters, passing them to the Semantic Layer.
- **Dynamic Render Engine**: AI responses embed custom markdown tokens (` ```json { "type": "chart" } ``` `) which the React frontend instantly transforms into interactive Recharts visualizations.
- **Provider Agnostic**: Easily swap between Gemini, OpenAI, or Local LLMs via the Admin Panel.

### 3. Analytics & Visualization
- **Executive Dashboards**: Real-time KPI cards with mini sparklines, trend arrows, and complex tooltips.
- **Custom Dashboard Builder**: Slot-based grid allowing users to construct their own BI views.
- **Data Catalog**: Searchable business glossary for non-technical users to understand formulas.

### 4. Administration & Observability
- **Role-Based Access Control (RBAC)**: Deep user management (Super Admin, Executive, Analyst).
- **Query Inspector**: A transparent observability tool that proves to executives exactly what SQL the AI generated and how long it took.
- **Audit Center**: Global enterprise security logging (Logins, Exports, Role Changes).
- **System Monitoring**: Live telemetry of CPU, Memory, DB latency, and active sessions.

---

## 🏗️ Architecture Stack

### Frontend
- **React 19** + **Vite**
- **TailwindCSS** + Glassmorphism UI
- **Framer Motion** (Micro-animations)
- **Recharts** (Enterprise Visualizations)
- **React Router** (Protected/Public flows)

### Backend
- **FastAPI** (Async Python 3.11+)
- **SQLAlchemy 2.0** (Core + ORM)
- **PostgreSQL** (Primary Data Warehouse & App DB)
- **Pytest** (Automated Testing)

---

## 📂 Project Structure

```
MetricMind/
├── backend/
│   ├── app/
│   │   ├── ai/            # Orchestrator, Prompts, LLM Providers
│   │   ├── api/v1/        # Admin, Audit, Catalog, Governance, Chat APIs
│   │   ├── core/          # Config, Security, JWT
│   │   ├── db/            # Database Sessions, Migrations
│   │   ├── models/        # SQLAlchemy Models
│   │   ├── query_engine/  # Safe SQL Generation & Validation
│   │   ├── semantic/      # Governed Metric Definitions
│   │   └── warehouse/     # Data Warehouse Adapters (Postgres, Snowflake)
│   ├── tests/             # Unit and Integration Tests
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI (ErrorBoundary, Cards)
│   │   ├── contexts/      # AuthContext, ThemeContext
│   │   ├── layouts/       # DashboardLayout (Sidebar, Topbar)
│   │   ├── pages/         # Admin, Dashboard, Chat UIs
│   │   └── services/      # Axios API Client
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Deployment

### 1. Environment Variables
Create a `.env` in `backend/`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/metricmind
GEMINI_API_KEY=your_key_here
SECRET_KEY=super_secret_jwt_key
```

### 2. Run Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🛡️ Security & Performance
- **Global Error Boundaries**: Graceful React fallbacks on crash.
- **FastAPI Exception Handlers**: Strips tracebacks from production API errors.
- **Memoization**: Heavy chart components are wrapped in `React.memo` to prevent re-renders during Chat streaming.
- **Rate Limiting & CORS**: Restricted cross-origin resource sharing configured.

---
*Developed by Advanced Agentic Engineering Team*
