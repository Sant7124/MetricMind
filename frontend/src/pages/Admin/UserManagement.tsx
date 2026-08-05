import { useState, useEffect } from "react";
import { Users, Edit2, Trash2, Plus, Shield, TrendingUp, ShieldCheck, ShieldAlert, CheckCircle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, CartesianGrid } from "recharts";
import api from "../../services/api";

const GROWTH_DATA = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 145 },
  { month: 'Mar', users: 190 },
  { month: 'Apr', users: 240 },
  { month: 'May', users: 290 },
  { month: 'Jun', users: 380 },
];

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded users to fulfill requirements while overriding backend mock
    setUsers([
      { id: 1, name: "Santosh Yadav", email: "sant7124@gmail.com", role: "Super Admin", status: "Active", last_login: new Date().toISOString() },
      { id: 2, name: "Haya Aboobacker", email: "hayaaboobacker07@gmail.com", role: "Analyst", status: "Active", last_login: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, name: "Aakarsh Yadav", email: "aakarshyadav56@gmail.com", role: "Admin", status: "Active", last_login: new Date(Date.now() - 172800000).toISOString() }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage enterprise access, roles, and review security compliance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-5 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Seats</div>
              <div className="text-3xl font-bold">380 <span className="text-sm font-medium text-muted-foreground">/ 500</span></div>
            </div>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Users size={20}/></div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
            <TrendingUp size={14}/> +12% this quarter
          </div>
        </div>

        <div className="glass p-5 rounded-xl border border-border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Security Score</div>
              <div className="text-3xl font-bold text-emerald-500">A-</div>
            </div>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><ShieldCheck size={20}/></div>
          </div>
          <div className="text-xs text-muted-foreground">
            92% of users have 2FA enabled.
          </div>
        </div>

        <div className="glass p-5 rounded-xl border border-border flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">User Growth</span>
          </div>
          <div className="h-16 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GROWTH_DATA}>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', fontSize: '12px' }} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-secondary/20 flex justify-between items-center">
          <h3 className="font-semibold text-sm">Active Directory</h3>
          <div className="flex gap-2">
            <input type="text" placeholder="Search users..." className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
            <select className="px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="border-b border-border hover:bg-secondary/40 transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-indigo-500/40 flex items-center justify-center text-foreground font-bold shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-full w-fit">
                        {user.role.toLowerCase() === 'admin' ? <ShieldAlert size={14} className="text-rose-500"/> : <Shield size={14} className="text-indigo-400" />} 
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(user.last_login).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-blue-500 hover:text-blue-400 p-1.5 hover:bg-blue-500/10 rounded transition-colors"><Edit2 size={16} /></button>
                      <button className="text-destructive hover:text-destructive/80 p-1.5 hover:bg-destructive/10 rounded transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Role Permissions Matrix */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Shield size={18} className="text-primary"/> Role Permissions Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-2">Feature</th>
                  <th className="px-4 py-2 text-center">Super Admin</th>
                  <th className="px-4 py-2 text-center">Admin</th>
                  <th className="px-4 py-2 text-center">Analyst</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Manage Users", "Edit Dashboards", "View Reports", "Configure AI", "Billing & Payments"
                ].map((feature, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="px-4 py-3 font-medium text-xs">{feature}</td>
                    <td className="px-4 py-3 text-center"><CheckCircle size={14} className="mx-auto text-emerald-500" /></td>
                    <td className="px-4 py-3 text-center">{(i !== 4 && i !== 0) ? <CheckCircle size={14} className="mx-auto text-emerald-500" /> : <div className="w-2 h-0.5 bg-muted-foreground mx-auto rounded"></div>}</td>
                    <td className="px-4 py-3 text-center">{i === 2 ? <CheckCircle size={14} className="mx-auto text-emerald-500" /> : <div className="w-2 h-0.5 bg-muted-foreground mx-auto rounded"></div>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Sessions / Devices */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary"/> Active Sessions & Devices
          </h3>
          <div className="space-y-4">
            {[
              { os: "macOS 13.4", browser: "Chrome", location: "San Francisco, CA", time: "Active now", ip: "192.168.1.104" },
              { os: "Windows 11", browser: "Edge", location: "New York, NY", time: "2 hours ago", ip: "10.0.0.42" },
              { os: "iOS 16.5", browser: "Safari", location: "Austin, TX", time: "Yesterday", ip: "172.16.2.21" },
              { os: "macOS 12.0", browser: "Firefox", location: "London, UK", time: "3 days ago", ip: "198.51.100.4" }
            ].map((session, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg border border-border/50">
                <div>
                  <div className="text-sm font-medium">{session.os} &middot; {session.browser}</div>
                  <div className="text-xs text-muted-foreground mt-1">{session.location} ({session.ip})</div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${session.time.includes('now') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                    {session.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-destructive/20 text-destructive text-sm rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors">
            Revoke All Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
