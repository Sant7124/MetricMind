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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Data Quality Score */}
        <div className="glass p-6 rounded-xl border border-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Overall Data Quality</h3>
            <p className="text-3xl font-bold text-emerald-500">98.4%</p>
            <p className="text-xs text-muted-foreground mt-1">Based on 1.2M records</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
            <span className="font-bold text-emerald-500 text-sm">A+</span>
          </div>
        </div>

        {/* Recently Queried */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Calendar size={14} /> Recently Queried
          </h3>
          <div className="space-y-3">
            {["Gross Revenue", "Active Users", "Churn Rate"].map((m, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="font-medium">{m}</span>
                <span className="text-xs text-muted-foreground">{i * 2 + 1} mins ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Data Owners */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Database size={14} /> Top Data Owners
          </h3>
          <div className="space-y-3">
            {[
              { name: "Sarah Chen", score: 142 },
              { name: "Alex Kumar", score: 98 },
              { name: "Data Eng Team", score: 85 }
            ].map((owner, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="font-medium flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">
                    {owner.name.charAt(0)}
                  </div>
                  {owner.name}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{owner.score} definitions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <div key={m.name} className="glass p-5 rounded-xl border border-border hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-primary group-hover:underline">{m.name}</h3>
              <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {m.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{m.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground">SQL Formula</span>
                <span className="font-mono text-xs truncate max-w-[150px]">{m.formula}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="truncate max-w-[150px]">{m.allowed_dimensions.join(", ")}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-muted-foreground">Owner</span>
                <span className="flex items-center gap-1 text-xs"><Database size={12}/> {m.business_owner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
