import { useState, useEffect } from "react";
import { Activity, Server, Database, Cpu, Clock, Network, HardDrive, ArrowUp, ArrowDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip, LineChart, Line } from "recharts";
import api from "../../services/api";

const MOCK_RESOURCE_DATA = Array.from({ length: 20 }).map((_, i) => ({
  time: `${i}s`,
  cpu: Math.floor(Math.random() * 40) + 20,
  mem: Math.floor(Math.random() * 30) + 40,
  netOut: Math.floor(Math.random() * 100) + 50,
  netIn: Math.floor(Math.random() * 80) + 20,
}));

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resourceData, setResourceData] = useState(MOCK_RESOURCE_DATA);

  useEffect(() => {
    const fetchHealth = () => {
      api.get("/monitoring/health").then(res => {
        setMetrics(res.data.data);
        setLoading(false);
      });
      
      // Simulate live ticking data
      setResourceData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'now',
          cpu: Math.floor(Math.random() * 40) + 20,
          mem: Math.floor(Math.random() * 30) + 40,
          netOut: Math.floor(Math.random() * 100) + 50,
          netIn: Math.floor(Math.random() * 80) + 20,
        });
        return newData;
      });
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return <div className="p-8 text-center animate-pulse flex flex-col items-center gap-4 mt-20">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      Loading live telemetry...
    </div>;
  }

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground">Live infrastructure, resource utilization, and API telemetry.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Server, title: "Backend Server", val: metrics.status, color: "emerald", extra: "v" + metrics.python_version },
          { icon: Clock, title: "Uptime", val: formatUptime(metrics.uptime_seconds), color: "blue", extra: "99.9% SLA" },
          { icon: Database, title: "Active Conns", val: metrics.database.active_connections, color: "indigo", extra: `${metrics.database.latency_ms}ms ping` },
          { icon: Activity, title: "AI Engine", val: metrics.ai_provider.provider, color: "purple", extra: `${metrics.ai_provider.latency_ms}ms latency` },
        ].map((stat, i) => (
          <div key={i} className={`glass p-5 rounded-xl border border-${stat.color}-500/20 bg-${stat.color}-500/5`}>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <stat.icon size={16} className={`text-${stat.color}-500`}/>
              <span className="text-xs font-medium uppercase tracking-wider">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.val}</div>
            <div className="text-xs text-muted-foreground">{stat.extra}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU & Memory Live Graph */}
        <div className="glass p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Cpu size={18} className="text-primary"/> Compute Utilization
            </h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> CPU: {resourceData[resourceData.length-1].cpu}%</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Memory: {resourceData[resourceData.length-1].mem}%</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resourceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
                <Area type="monotone" dataKey="mem" stroke="#a855f7" fillOpacity={1} fill="url(#colorMem)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Network & Storage */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-border h-[calc(50%-0.75rem)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Network size={18} className="text-amber-500"/> Network Traffic
              </h3>
            </div>
            <div className="flex-1 flex gap-6">
              <div className="flex flex-col justify-center gap-4 min-w-[120px]">
                <div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><ArrowUp size={12} className="text-emerald-500"/> Outbound</div>
                  <div className="text-xl font-bold">{resourceData[resourceData.length-1].netOut} MB/s</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><ArrowDown size={12} className="text-blue-500"/> Inbound</div>
                  <div className="text-xl font-bold">{resourceData[resourceData.length-1].netIn} MB/s</div>
                </div>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resourceData}>
                    <Line type="step" dataKey="netOut" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="step" dataKey="netIn" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl border border-border h-[calc(50%-0.75rem)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <HardDrive size={18} className="text-rose-500"/> Storage IOPS
              </h3>
              <span className="text-xs font-bold text-rose-500">Normal</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>/dev/sda1 (Root)</span>
                  <span>45% Used (234GB / 512GB)</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>/dev/sdb1 (Data)</span>
                  <span>82% Used (1.8TB / 2.2TB)</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[82%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW CONTENT: System Alerts Log & Worker Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 glass p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
             System Alerts Log
          </h3>
          <div className="space-y-3">
            {[
              { type: 'warning', msg: 'High CPU utilization detected on worker-node-03', time: '12 mins ago' },
              { type: 'error', msg: 'Failed to connect to secondary cache redis-replica', time: '1 hr ago' },
              { type: 'info', msg: 'Automated backup completed successfully', time: '4 hrs ago' },
              { type: 'warning', msg: 'API rate limit threshold approaching for Tenant A', time: '5 hrs ago' }
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border/50">
                <div className={`w-2 h-2 rounded-full ${alert.type === 'error' ? 'bg-destructive' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                <span className="flex-1 text-sm">{alert.msg}</span>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
             Background Workers
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Analytics Aggregation', status: 'Running', load: '65%' },
              { name: 'Semantic Sync', status: 'Idle', load: '0%' },
              { name: 'Email Dispatcher', status: 'Running', load: '22%' },
              { name: 'Data Ingestion', status: 'Processing', load: '94%' }
            ].map((worker, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{worker.name}</div>
                  <div className={`text-xs ${worker.status === 'Running' || worker.status === 'Processing' ? 'text-emerald-500' : 'text-muted-foreground'}`}>{worker.status}</div>
                </div>
                <div className="font-mono text-xs">{worker.load}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
