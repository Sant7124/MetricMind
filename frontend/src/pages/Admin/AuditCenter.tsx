import { useState, useEffect } from "react";
import { Activity, Clock, ShieldAlert, Monitor } from "lucide-react";
import api from "../../services/api";

export function AuditCenter() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get("/audit").then(res => setLogs(res.data.data.logs));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Center</h1>
        <p className="text-muted-foreground">Enterprise monitoring and compliance tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {["Total Events (24h)", "Failed Logins", "AI Queries", "Data Exports"].map((title, i) => (
          <div key={i} className="glass p-4 rounded-xl border border-border">
            <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
            <div className="text-2xl font-bold mt-2">{Math.floor(Math.random() * 500) + 10}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">IP Address</th>
              <th className="px-6 py-3">Latency (ms)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-border hover:bg-secondary/20">
                <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-3 font-medium">{log.user}</td>
                <td className="px-6 py-3">
                  <span className="px-2 py-1 rounded bg-secondary text-xs">{log.action}</span>
                </td>
                <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{log.ip_address}</td>
                <td className="px-6 py-3">
                  {log.execution_time_ms ? `${log.execution_time_ms} ms` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
