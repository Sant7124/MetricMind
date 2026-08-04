import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function MainLayout() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 border-b glass fixed top-0 w-full z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            M
          </div>
          <span className="font-semibold text-xl tracking-tight">MetricMind</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</a>
          <a href="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Get Started
          </a>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MetricMind. Enterprise Analytics. All rights reserved.
      </footer>
    </div>
  );
}
