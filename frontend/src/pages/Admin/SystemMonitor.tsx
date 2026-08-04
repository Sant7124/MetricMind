import { useState, useEffect } from "react";
import { Activity, Server, Database, Cpu, MemoryStick, Clock } from "lucide-react";
import api from "../../services/api";

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = () => {
      api.get("/monitoring/health").then(res => {
        setMetrics(res.data.data);
        setLoading(false);
      });
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return <div className="p-8 text-center animate-pulse">Loading system metrics...</div>;
  }

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground">Live infrastructure and API telemetry.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-border">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <Server size={20} className="text-primary"/> 
            <span className="font-semibold">Backend Server</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <div className="font-bold text-lg text-emerald-400">{metrics.status}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Uptime</div>
              <div className="font-bold text-lg flex items-center gap-2"><Clock size={16}/> {formatUptime(metrics.uptime_seconds)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Python Version</div>
              <div className="font-mono text-sm">{metrics.python_version}</div>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-border">
          <div className="flex items-center gap-3 mb-4 text-muted-foreground">
            <Cpu size={20} className="text-primary"/> 
            <span className="font-semibold">Hardware Utilization</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">CPU Usage</span>
                <span className="font-bold">{metrics.cpu_usage_percent}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{width: `${metrics.cpu_usage_percent}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Memory Usage</span>
                <span className="font-bold">{metrics.memory_usage_percent}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{width: `${metrics.memory_usage_percent}%`}}></div>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-xs text-muted-foreground mb-1">Active Sessions</div>
              <div className="font-bold text-lg">{metrics.active_sessions}</div>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-border space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3 text-muted-foreground">
              <Database size={18} className="text-primary"/> 
              <span className="font-semibold">Warehouse Engine</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Connections</div>
                <div className="font-bold">{metrics.database.active_connections}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Latency</div>
                <div className="font-bold">{metrics.database.latency_ms}ms</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-3 mb-3 text-muted-foreground">
              <Activity size={18} className="text-primary"/> 
              <span className="font-semibold">AI Provider Engine</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Provider</div>
                <div className="font-bold text-sm">{metrics.ai_provider.provider}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Latency</div>
                <div className="font-bold">{metrics.ai_provider.latency_ms}ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
