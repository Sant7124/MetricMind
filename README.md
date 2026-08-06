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
- **Parallel LLM Routing (LLM Racing)**: Dispatches queries to Gemini, Claude, and OpenRouter simultaneously to guarantee lightning-fast sub-second responses.
- **Natural Language to JSON**: AI interprets intent and extracts business parameters, strictly conforming to the semantic layer constraints without hallucinating dimensions.
- **Dynamic Render Engine**: AI responses embed custom markdown tokens (` ```json { "type": "chart" } ``` `) which the React frontend instantly transforms into interactive Recharts visualizations.

### 3. Analytics & Visualization
- **Executive Dashboards**: Real-time KPI cards with mini sparklines, trend arrows, and complex tooltips.
- **Custom Dashboard Builder**: Slot-based grid allowing users to construct their own BI views.
- **Dedicated Content Pages**: Highly animated, Framer Motion-powered Features and Pricing marketing pages built into the core router.
- **Data Catalog**: Searchable business glossary for non-technical users to understand formulas.

### 4. Administration & Observability
- **Role-Based Access Control (RBAC)**: Deep user management (Super Admin, Executive, Analyst, Viewer).
- **Query Inspector**: A transparent observability tool that proves to executives exactly what SQL the AI generated and how long it took.
- **Audit Center**: Global enterprise security logging (Logins, Exports, Role Changes).
- **System Monitoring**: Live telemetry of CPU, Memory, DB latency, and active sessions.

---

## 🏗️ Architecture Stack

### Frontend
- **React 19** + **Vite**
- **TailwindCSS** + Glassmorphism UI
- **Framer Motion** (Stunning micro-animations & page transitions)
- **Recharts** (Enterprise Visualizations)
- **React Router** (Protected/Public flows)
- **Lucide React** (Beautiful iconography)

### Backend
- **FastAPI** (Async Python 3.11+)
- **SQLAlchemy 2.0** (Core + ORM)
- **PostgreSQL / SQLite** (Primary Data Warehouse & App DB)
- **Pytest** (Automated Testing)
- **AsyncIO** (For parallel LLM racing & non-blocking execution)

---

## 📂 Project Structure

```
MetricMind/
├── backend/
│   ├── app/
│   │   ├── ai/            # Orchestrator, Prompts, LLM Providers (Racing)
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
│   │   ├── pages/         # Admin, Dashboard, Chat, Pricing, Features UIs
│   │   └── services/      # Axios API Client
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Deployment

### 1. Environment Variables
Create a `.env` in `backend/`:
```env
DATABASE_URL=sqlite:///./metricmind.db
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key
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
- **Admin Context Injection**: Securely passes user authentication tokens directly into the Semantic layer for stringent RBAC verification.

---

## 🚂 Railway Deployment (Production)

Deploying MetricMind on Railway is straightforward since it supports monorepos out-of-the-box. We deploy the **Backend** and **Frontend** as two separate services from the same GitHub repository.

### 1. Deploy the Backend (FastAPI)
1. In your Railway dashboard, click **New Project** -> **Deploy from GitHub repo**.
2. Select the `MetricMind` repository.
3. In the deployment settings for the new service, go to **Settings**.
4. Set the **Root Directory** to `/backend`.
5. Under **Variables**, add your environment variables (e.g., `GEMINI_API_KEY`, `SECRET_KEY`, `DATABASE_URL` if using Postgres).
6. Click **Deploy**. Railway will automatically detect the `requirements.txt` and run the app using the `Procfile`.
7. Once deployed, go to the **Settings** tab and click **Generate Domain** under Networking. Copy this URL (e.g., `https://metricmind-backend.up.railway.app`).

### 2. Deploy the Frontend (React Vite)
1. From the same Railway project, click **New Service** -> **Deploy from GitHub repo**.
2. Select the `MetricMind` repository again.
3. In the new service's **Settings**, set the **Root Directory** to `/frontend`.
4. Under **Variables**, add:
   - `VITE_API_URL`: Set this to your Backend's generated domain URL appended with `/api/v1` (e.g., `https://metricmind-backend.up.railway.app/api/v1`).
5. Click **Deploy**. Railway will run `npm run build` and launch the React app.
6. Generate a public domain for the frontend service to access your live application.

---

*Developed by Advanced Agentic Engineering Team*
