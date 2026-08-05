import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Building, Clock, Globe, Shield, Activity, Key, Smartphone, Laptop } from "lucide-react";
import { UserAvatar } from "../../components/UserAvatar";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const SKILL_DATA = [
  { subject: 'SQL Queries', A: 120, fullMark: 150 },
  { subject: 'Reports', A: 98, fullMark: 150 },
  { subject: 'Dashboards', A: 86, fullMark: 150 },
  { subject: 'Data Exports', A: 99, fullMark: 150 },
  { subject: 'AI Chat', A: 85, fullMark: 150 },
  { subject: 'Logins', A: 65, fullMark: 150 },
];

export function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your enterprise account settings and view activity.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-xl border border-border p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-indigo-500/20"></div>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 relative z-10 mt-8">
              <UserAvatar user={user} className="w-28 h-28 shadow-xl ring-4 ring-background" textClass="text-4xl drop-shadow-md" />
              <div className="flex-1 pb-2">
                <h2 className="text-3xl font-bold">{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail size={14}/> {user?.email}</span>
                  <span className="flex items-center gap-1"><Building size={14}/> Enterprise Operations</span>
                  <span className="flex items-center gap-1 capitalize"><Shield size={14}/> {user?.role_id}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 gap-6 relative z-10">
              <div>
                <label className="block text-sm font-medium mb-2">Language Preference</label>
                <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Timezone</label>
                <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                  <option>UTC (Default)</option>
                  <option>America/New_York</option>
                  <option>America/Los_Angeles</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity size={18} /> Recent Activity
            </h3>
            <div className="space-y-6 border-l border-border/50 ml-3 relative">
              {[
                { action: "Exported 'Q3 Regional Sales' to CSV", time: "10 mins ago", color: "blue" },
                { action: "Created new 'Marketing ROI' dashboard", time: "2 hours ago", color: "emerald" },
                { action: "Queried 'Gross Revenue' in AI Chat", time: "Yesterday", color: "purple" },
                { action: "Logged in from new IP (192.168.1.1)", time: "2 days ago", color: "amber" },
              ].map((log, i) => (
                <div key={i} className="pl-6 relative">
                  <span className={`absolute -left-1.5 top-1.5 w-3 h-3 bg-${log.color}-500 rounded-full ring-4 ring-background`}></span>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold mb-2">Platform Usage</h3>
            <div className="h-48 w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Usage" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">1,204</div>
                <div className="text-xs text-muted-foreground">Queries Run</div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">42</div>
                <div className="text-xs text-muted-foreground">Reports Saved</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield size={18} /> Active Sessions
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <Laptop size={18} className="mt-0.5 text-primary"/>
                <div>
                  <p className="font-medium">Windows 11 • Chrome (Current)</p>
                  <p className="text-xs text-muted-foreground mt-1">IP: 192.168.1.1 • Last active: Just now</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-background/50 border border-border rounded-lg">
                <Smartphone size={18} className="mt-0.5 text-muted-foreground"/>
                <div>
                  <p className="font-medium">iOS 17 • Safari</p>
                  <p className="text-xs text-muted-foreground mt-1">IP: 10.0.0.12 • Last active: 2 hours ago</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-destructive border border-destructive/20 hover:bg-destructive/10 rounded-lg transition-colors">
              Sign out of all other sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
