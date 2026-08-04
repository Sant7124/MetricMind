import { useState, useEffect } from "react";
import { Search, Database, Calendar } from "lucide-react";
import api from "../../services/api";

export function DataCatalog() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/catalog/metrics").then(res => setMetrics(res.data.data));
  }, []);

  const filtered = metrics.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Catalog & Glossary</h1>
        <p className="text-muted-foreground">Search governed metric definitions and dimensions.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input 
          type="text" 
          placeholder="Search metrics..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(m => (
          <div key={m.name} className="glass p-5 rounded-xl border border-border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-primary">{m.name}</h3>
              <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {m.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{m.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground">SQL Formula</span>
                <span className="font-mono text-xs">{m.formula}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground">Dimensions</span>
                <span>{m.allowed_dimensions.join(", ")}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-muted-foreground">Owner</span>
                <span className="flex items-center gap-1"><Database size={14}/> {m.business_owner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
