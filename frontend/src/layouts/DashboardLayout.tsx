import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart2, 
  FileText, 
  Layers, 
  Database, 
  Users, 
  Settings, 
  ShieldAlert,
  Moon,
  Sun,
  Bell,
  Search,
  LogOut,
  User,
  PieChart,
  Shield
} from "lucide-react";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const analyticsNavigation = [
    { name: 'Executive Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Revenue', href: '/dashboard/revenue', icon: BarChart2 },
    { name: 'Custom Dashboards', href: '/dashboard/custom', icon: PieChart },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'AI Chat', href: '/dashboard/chat', icon: MessageSquare },
  ];

  const governanceNavigation = [
    { name: 'Data Catalog', href: '/dashboard/catalog', icon: Database },
    { name: 'Query Inspector', href: '/dashboard/inspector', icon: Layers },
  ];

  const adminNavigation = [
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Audit Center', href: '/dashboard/admin/audit', icon: Shield },
    { name: 'System Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border glass hidden md:flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight">MetricMind</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Analytics</div>
          <nav className="space-y-1 px-2 mb-6">
            {analyticsNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Governance</div>
          <nav className="space-y-1 px-2 mb-6">
            {governanceNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Administration</div>
          <nav className="space-y-1 px-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} to={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.role_id}</p>
            </div>
            <LogOut size={16} className="text-muted-foreground hover:text-destructive cursor-pointer" onClick={logout} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b glass sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="flex-1 flex items-center">
            {/* Breadcrumbs or Search */}
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search metrics, reports..." 
                className="w-full bg-secondary/50 border border-border rounded-md py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="h-8 w-px bg-border mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role_id}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
              <button onClick={logout} className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-destructive ml-2">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
