import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Features } from "./pages/Features";
import { Pricing } from "./pages/Pricing";
import { Placeholder } from "./pages/Placeholder";
import { useAuth } from "./contexts/AuthContext";

import { ExecutiveDashboard } from "./pages/Dashboard/ExecutiveDashboard";
import { RevenueDashboard } from "./pages/Dashboard/RevenueDashboard";
import { Chat } from "./pages/Dashboard/Chat";
import { DashboardBuilder } from "./pages/Dashboard/DashboardBuilder";
import { ReportCenter } from "./pages/Dashboard/ReportCenter";
import { DataCatalog } from "./pages/Dashboard/DataCatalog";
import { QueryInspector } from "./pages/Dashboard/QueryInspector";
import { UserProfile } from "./pages/Dashboard/UserProfile";
import { UserManagement } from "./pages/Admin/UserManagement";
import { AuditCenter } from "./pages/Admin/AuditCenter";
import { SystemSettings } from "./pages/Admin/SystemSettings";
import { SystemMonitor } from "./pages/Admin/SystemMonitor";
import { ErrorBoundary } from "./components/ErrorBoundary";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ExecutiveDashboard />} />
            <Route path="revenue" element={<RevenueDashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="custom" element={<DashboardBuilder />} />
            <Route path="reports" element={<ReportCenter />} />
            <Route path="catalog" element={<DataCatalog />} />
            <Route path="inspector" element={<QueryInspector />} />
            <Route path="profile" element={<UserProfile />} />
            
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/audit" element={<AuditCenter />} />
            <Route path="admin/settings" element={<SystemSettings />} />
            <Route path="admin/monitor" element={<SystemMonitor />} />

            <Route path="users" element={<Placeholder title="User Management" />} />
            <Route path="admin" element={<Placeholder title="System Administration" />} />
            <Route path="companies" element={<Placeholder title="Company Management" />} />
          </Route>
          
          <Route path="*" element={<Placeholder title="404 Not Found" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
