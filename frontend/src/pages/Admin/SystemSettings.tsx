import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, AlertTriangle, Link2, Server, Cloud, Database, Lock, AlertOctagon } from "lucide-react";
import api from "../../services/api";

export function SystemSettings() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get("/admin/settings").then(res => setSettings(res.data.data));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Global configuration for the MetricMind platform.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-md text-sm font-medium">
          <CheckCircle size={16} /> Config Health: Excellent
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-xl border border-border p-6 space-y-8">
            {/* Application Settings */}
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 flex items-center gap-2">
                <Settings size={18} className="text-primary"/> Application
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Global Theme</label>
                  <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary transition-all" value={settings.theme || ""}>
                    <option>System Default</option>
                    <option>Dark Mode Forced</option>
                    <option>Light Mode Forced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary transition-all" value={settings.timezone || ""}>
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                  </select>
                </div>
              </div>
            </section>

            {/* AI Configuration */}
            <section>
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2 flex items-center gap-2">
                <Cloud size={18} className="text-primary"/> AI Provider Integration
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Active LLM Provider</label>
                  <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary focus:border-primary transition-all" value={settings.ai_provider || ""}>
                    <option>Gemini (Default)</option>
                    <option>OpenAI</option>
                    <option>Ollama (Local)</option>
                    <option>Groq</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">AI Caching Enabled</label>
                  <div className="flex items-center h-10 px-3 border border-border rounded-md bg-secondary/50">
                    <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                    <span className="ml-3 text-sm font-medium">Speed up repeated queries</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm">
                <Save size={16} /> Save Configuration
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Integration Connectivity Map */}
          <div className="glass rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Link2 size={18} /> Integrations Map
            </h3>
            <div className="space-y-4">
              <div className="relative border-l-2 border-border/50 ml-4 space-y-6 py-2">
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-background border-2 border-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium"><Server size={14} className="text-emerald-500"/> Core API</div>
                  <div className="text-xs text-muted-foreground">Connected • 12ms ping</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-background border-2 border-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium"><Database size={14} className="text-blue-500"/> PostgreSQL DW</div>
                  <div className="text-xs text-muted-foreground">Connected • Synced 2m ago</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-background border-2 border-amber-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium"><Cloud size={14} className="text-amber-500"/> Salesforce CRM</div>
                  <div className="text-xs text-amber-500/80">Rate Limited • Retrying...</div>
                </div>
              </div>
              <button className="w-full mt-2 py-1.5 border border-dashed border-border rounded-md text-xs font-medium hover:text-primary hover:border-primary transition-colors">
                Manage Integrations
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
            <h3 className="text-lg font-semibold text-destructive flex items-center gap-2 mb-4">
              <AlertOctagon size={18} /> Danger Zone
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-destructive/10">
                <div>
                  <div className="text-sm font-medium text-destructive">Flush AI Cache</div>
                  <div className="text-xs text-muted-foreground">Force re-generation of all cached insights.</div>
                </div>
                <button className="px-3 py-1.5 bg-background border border-destructive/20 text-destructive text-xs font-medium rounded hover:bg-destructive hover:text-destructive-foreground transition-colors">
                  Flush Cache
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-destructive">Factory Reset</div>
                  <div className="text-xs text-muted-foreground">Wipe all config and tenant data.</div>
                </div>
                <button className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded hover:bg-destructive/90 transition-colors">
                  Reset System
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
