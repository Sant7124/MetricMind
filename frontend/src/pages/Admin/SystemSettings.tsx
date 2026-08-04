import { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
import api from "../../services/api";

export function SystemSettings() {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    api.get("/admin/settings").then(res => setSettings(res.data.data));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Global configuration for the MetricMind platform.</p>
      </div>

      <div className="glass rounded-xl border border-border p-6 space-y-8">
        {/* Application Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Application</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Global Theme</label>
              <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary" value={settings.theme || ""}>
                <option>System Default</option>
                <option>Dark Mode Forced</option>
                <option>Light Mode Forced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary" value={settings.timezone || ""}>
                <option>UTC</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
          </div>
        </section>

        {/* AI Configuration */}
        <section>
          <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">AI Provider Integration</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Active LLM Provider</label>
              <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:ring-primary" value={settings.ai_provider || ""}>
                <option>Gemini (Default)</option>
                <option>OpenAI</option>
                <option>Ollama (Local)</option>
                <option>Groq</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">AI Caching Enabled</label>
              <div className="flex items-center h-10">
                <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
                <span className="ml-2 text-sm text-muted-foreground">Speeds up repeated queries</span>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
            <Save size={16} /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
