import { useState, useEffect } from "react";
import { Users, Edit2, Trash2, Plus, Shield, TrendingUp, ShieldCheck, ShieldAlert } from "lucide-react";
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
    api.get("/admin/users").then(res => {
      setUsers(res.data.data);
      setLoading(false);
    });
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
    </div>
  );
}
