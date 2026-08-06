import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { UserAvatar } from "../components/UserAvatar";
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
  Shield,
  Activity
} from "lucide-react";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [showTopProfile, setShowTopProfile] = useState(false);
  const [showSideProfile, setShowSideProfile] = useState(false);
  
  const topProfileRef = useRef<HTMLDivElement>(null);
  const sideProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (topProfileRef.current && !topProfileRef.current.contains(event.target as Node)) {
        setShowTopProfile(false);
      }
      if (sideProfileRef.current && !sideProfileRef.current.contains(event.target as Node)) {
        setShowSideProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { name: 'System Monitor', href: '/dashboard/admin/monitor', icon: Activity },
    { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
    { name: 'Audit Center', href: '/dashboard/admin/audit', icon: Shield },
    { name: 'System Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  return (
    <div 
      className="min-h-screen text-foreground flex bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-0"></div>
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-border glass hidden md:flex flex-col relative z-10">
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

        <div className="p-4 border-t border-border relative" ref={sideProfileRef}>
          <div 
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary transition-colors cursor-pointer group"
            onClick={() => setShowSideProfile(!showSideProfile)}
          >
            <UserAvatar user={user} className="w-9 h-9 ring-2 ring-transparent group-hover:ring-primary/20 transition-all" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.role_id}</p>
            </div>
          </div>

          <AnimatePresence>
            {showSideProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-4 mb-2 w-56 glass border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-border bg-secondary/30 flex items-center gap-3">
                  <UserAvatar user={user} className="w-10 h-10" textClass="text-base" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user?.first_name} {user?.last_name}</p>
                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="p-2">
                  <Link to="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors" onClick={() => setShowSideProfile(false)}>
                    <User size={16} className="text-muted-foreground" /> My Profile
                  </Link>
                </div>
                <div className="p-2 border-t border-border">
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
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
            <div className="relative" ref={topProfileRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-secondary/50 p-1.5 rounded-xl transition-colors group"
                onClick={() => setShowTopProfile(!showTopProfile)}
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{user?.first_name} {user?.last_name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role_id}</span>
                </div>
                <UserAvatar user={user} className="w-10 h-10 ring-2 ring-border group-hover:ring-primary/50 transition-all shadow-md" textClass="text-base" />
              </div>

              <AnimatePresence>
                {showTopProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 glass border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-border bg-secondary/30 flex items-center gap-3">
                      <UserAvatar user={user} className="w-12 h-12" textClass="text-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate text-foreground">{user?.first_name} {user?.last_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                          <Shield size={12} />
                          {user?.role_id}
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link to="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors" onClick={() => setShowTopProfile(false)}>
                        <User size={16} className="text-muted-foreground" /> My Profile
                      </Link>
                      <Link to="/dashboard/admin/settings" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors" onClick={() => setShowTopProfile(false)}>
                        <Settings size={16} className="text-muted-foreground" /> Settings
                      </Link>
                    </div>
                    <div className="p-2 border-t border-border">
                      <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
