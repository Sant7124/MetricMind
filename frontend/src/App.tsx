import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Placeholder } from "./pages/Placeholder";
import { useAuth } from "./contexts/AuthContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Placeholder title="Registration" />} />
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
          <Route index element={<Placeholder title="Executive Dashboard" />} />
          <Route path="chat" element={<Placeholder title="AI Semantic Chat" />} />
          <Route path="metrics" element={<Placeholder title="Metrics & Definitions" />} />
          <Route path="reports" element={<Placeholder title="Reports Engine" />} />
          <Route path="semantic-layer" element={<Placeholder title="Semantic Layer Config" />} />
          <Route path="warehouse" element={<Placeholder title="Data Warehouse Integration" />} />
          
          <Route path="users" element={<Placeholder title="User Management" />} />
          <Route path="admin" element={<Placeholder title="System Administration" />} />
          <Route path="audit-logs" element={<Placeholder title="Security & Audit Logs" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
