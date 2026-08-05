import { useState, useEffect } from "react";
import { Activity, Clock, ShieldAlert, Monitor, Search, Filter, ShieldCheck, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import api from "../../services/api";

const ANOMALY_DATA = [
  { time: '00:00', score: 12 },
  { time: '04:00', score: 8 },
  { time: '08:00', score: 45 },
  { time: '12:00', score: 85 }, // High anomaly
  { time: '16:00', score: 25 },
  { time: '20:00', score: 15 },
];

export function AuditCenter() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get("/audit").then(res => setLogs(res.data.data.logs));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit & Security Center</h1>
          <p className="text-muted-foreground">Enterprise monitoring, threat detection, and compliance tracking.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors shadow-sm border border-border">
          Export Audit Trail
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Total Events (24h)", val: "14.2k", trend: "+5%", icon: Activity, color: "blue" },
              { title: "Failed Logins", val: "24", trend: "-12%", icon: ShieldAlert, color: "rose" },
              { title: "AI Queries", val: "1,204", trend: "+18%", icon: Monitor, color: "purple" },
              { title: "Data Exports", val: "42", trend: "0%", icon: Clock, color: "emerald" },
            ].map((stat, i) => (
              <div key={i} className="glass p-5 rounded-xl border border-border flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-medium text-muted-foreground">{stat.title}</h4>
                  <stat.icon size={16} className={`text-${stat.color}-500`} />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stat.val}</div>
                  <div className={`text-xs mt-1 ${stat.trend.startsWith('+') ? 'text-emerald-500' : stat.trend.startsWith('-') ? 'text-rose-500' : 'text-muted-foreground'}`}>
                    {stat.trend} vs yesterday
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border bg-secondary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-semibold text-sm">Security Event Log</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Search events..." className="w-full pl-9 pr-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-background border border-border rounded-md hover:bg-secondary/50">
                  <Filter size={14} /> Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">IP Address</th>
                    <th className="px-6 py-3">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b border-border hover:bg-secondary/40 transition-colors">
                      <td className="px-6 py-3 whitespace-nowrap text-muted-foreground text-xs">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-3 font-medium">{log.user}</td>
                      <td className="px-6 py-3">
                        <span className="px-2 py-1 rounded-md bg-secondary/80 border border-border text-xs">{log.action}</span>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{log.ip_address}</td>
                      <td className="px-6 py-3">
                        <div className={`w-2 h-2 rounded-full ${log.action.includes('Failed') ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-emerald-500'}`}></div>
                      </td>
                    </tr>
                  ))}
                  {/* Fill empty state for better looks if logs are short */}
                  {logs.length < 5 && Array.from({length: 5 - logs.length}).map((_, i) => (
                     <tr key={`empty-${i}`} className="border-b border-border/50">
                       <td colSpan={5} className="px-6 py-6"></td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-500" /> AI Anomaly Detection
            </h3>
            <div className="h-32 w-full -ml-2 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANOMALY_DATA}>
                  <Tooltip cursor={{fill: 'hsl(var(--secondary))'}} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', fontSize: '12px' }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {ANOMALY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score > 80 ? 'hsl(var(--destructive))' : entry.score > 40 ? '#f59e0b' : 'hsl(var(--primary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-sm flex items-start gap-2">
              <AlertTriangle size={16} className="text-rose-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-rose-500">Unusual Export Activity</p>
                <p className="text-xs text-rose-500/80 mt-1">Large data export detected at 12:00 from unrecognized IP.</p>
              </div>
            </div>
          </div>

          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-500" /> Compliance Status
            </h3>
            <div className="space-y-3">
              {[
                { name: "SOC 2 Type II", status: "Compliant", color: "emerald" },
                { name: "GDPR Data Processing", status: "Compliant", color: "emerald" },
                { name: "HIPAA Guardrails", status: "Action Required", color: "amber" },
                { name: "ISO 27001", status: "Compliant", color: "emerald" },
              ].map((comp, i) => (
                <div key={i} className={`flex justify-between items-center p-2 rounded-lg bg-${comp.color}-500/10 border border-${comp.color}-500/20 text-sm`}>
                  <span className="font-medium">{comp.name}</span>
                  <span className={`text-xs font-bold text-${comp.color}-500`}>{comp.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
