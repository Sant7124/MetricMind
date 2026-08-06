import { useState } from "react";
import { Plus, LayoutGrid, Save, Settings, Database, CheckCircle, AlertTriangle, Layers, Copy, TrendingUp, Users, Activity, CreditCard, Bell, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ComposedChart } from "recharts";

// Mock Data Definitions
const REVENUE_DATA = [
  { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 }, { name: 'May', value: 6000 }, { name: 'Jun', value: 5500 },
];

const USER_DATA = [
  { name: 'Mon', users: 1200 }, { name: 'Tue', users: 1350 }, { name: 'Wed', users: 1100 },
  { name: 'Thu', users: 1400 }, { name: 'Fri', users: 1600 }, { name: 'Sat', users: 1800 }, { name: 'Sun', users: 1950 },
];

const SESSION_DATA = [
  { name: '00:00', sessions: 200 }, { name: '04:00', sessions: 150 }, { name: '08:00', sessions: 800 },
  { name: '12:00', sessions: 1200 }, { name: '16:00', sessions: 1100 }, { name: '20:00', sessions: 600 },
];

const PIE_DATA = [
  { name: 'Organic Search', value: 400 }, { name: 'Direct', value: 300 },
  { name: 'Social Media', value: 300 }, { name: 'Referral', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SERVER_DATA = [
  { name: 'US-East', load: 85 }, { name: 'US-West', load: 45 }, { name: 'EU-Central', load: 60 },
  { name: 'AP-South', load: 75 }, { name: 'AP-East', load: 30 },
];

export function DashboardBuilder() {
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'bar', title: 'Monthly Revenue', data: REVENUE_DATA, dataKey: 'value', color: 'hsl(var(--primary))' },
    { id: 2, type: 'line', title: 'Daily Active Users', data: USER_DATA, dataKey: 'users', color: '#10b981' },
    { id: 3, type: 'area', title: 'Server Sessions', data: SESSION_DATA, dataKey: 'sessions', color: '#f59e0b' },
    { id: 4, type: 'pie', title: 'Traffic Sources', data: PIE_DATA, dataKey: 'value', color: '' },
    { id: 5, type: 'bar', title: 'Server Load (%)', data: SERVER_DATA, dataKey: 'load', color: '#ef4444' },
  ]);
  const addWidget = () => {
    setWidgets([...widgets, { id: Date.now(), type: 'bar', title: 'New Widget', data: REVENUE_DATA, dataKey: 'value', color: 'hsl(var(--primary))' }]);
  };

  const renderChart = (widget: any) => {
    switch (widget.type) {
      case 'line':
        return (
          <LineChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Line type="monotone" dataKey={widget.dataKey} stroke={widget.color} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Area type="monotone" dataKey={widget.dataKey} stroke={widget.color} fill={widget.color} fillOpacity={0.3} />
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={widget.data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {widget.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        );
      case 'composed':
        return (
          <ComposedChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Bar dataKey="sales" barSize={20} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="target" stroke="#ff7300" strokeWidth={2} />
          </ComposedChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={widget.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Bar dataKey={widget.dataKey} fill={widget.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Custom Dashboards</h1>
          <p className="text-muted-foreground mt-1">Build, organize, and share your own personalized metrics views.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addWidget} className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium transition-all shadow-sm">
            <Plus size={16} /> Add Widget
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-all shadow-sm shadow-primary/20">
            <Save size={16} /> Save Layout
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$45,231.89", icon: <CreditCard className="text-emerald-500" size={20} />, trend: "+20.1% from last month", trendUp: true },
          { title: "Active Users", value: "+2350", icon: <Users className="text-blue-500" size={20} />, trend: "+180.1% from last month", trendUp: true },
          { title: "Sales Target", value: "85%", icon: <TrendingUp className="text-indigo-500" size={20} />, trend: "+19% from last month", trendUp: true },
          { title: "Active Sessions", value: "1,203", icon: <Activity className="text-amber-500" size={20} />, trend: "-4% from last hour", trendUp: false }
        ].map((kpi, i) => (
          <div key={i} className="glass p-6 rounded-xl border border-border flex flex-col justify-between hover:border-primary/30 transition-colors shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
              <div className="p-2 bg-secondary rounded-lg">{kpi.icon}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-1">{kpi.value}</div>
              <div className={`text-xs ${kpi.trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Builder Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Template Library */}
          <div className="glass p-6 rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold mb-5 flex items-center gap-2 text-lg">
              <LayoutGrid size={20} className="text-primary" /> Template Library
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Executive Brief", color: "blue", desc: "C-level overview" },
                { name: "Marketing ROI", color: "emerald", desc: "Campaign metrics" },
                { name: "Sales Pipeline", color: "amber", desc: "Funnel analysis" },
                { name: "Product Usage", color: "purple", desc: "Engagement stats" }
              ].map((tpl, i) => (
                <div key={i} className={`p-5 rounded-xl border border-${tpl.color}-500/20 bg-${tpl.color}-500/5 hover:bg-${tpl.color}-500/10 cursor-pointer transition-all text-center group hover:scale-[1.02]`}>
                  <Layers size={28} className={`mx-auto mb-3 text-${tpl.color}-500 group-hover:scale-110 transition-transform`} />
                  <div className="font-medium text-sm text-foreground">{tpl.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tpl.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid of Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {widgets.map(widget => (
              <div key={widget.id} className="glass p-5 rounded-xl border border-border flex flex-col h-80 group relative hover:border-primary/30 transition-colors shadow-sm">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <button className="p-1.5 bg-background border border-border rounded hover:bg-secondary text-muted-foreground shadow-sm"><Copy size={14}/></button>
                  <button className="p-1.5 bg-background border border-border rounded hover:bg-secondary text-muted-foreground shadow-sm"><Settings size={14}/></button>
                </div>
                <div className="flex justify-between items-center mb-5 pt-1 px-1">
                  <h3 className="font-semibold text-foreground">{widget.title}</h3>
                </div>
                <div className="flex-1 w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart(widget)}
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
            
            {/* Placeholder slot */}
            <div 
              onClick={addWidget}
              className="border-2 border-dashed border-border rounded-xl h-80 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
            >
              <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus size={32} />
              </div>
              <span className="font-medium text-lg">Add New Widget</span>
              <span className="text-sm mt-2 max-w-[200px] text-center">Customize your dashboard with a new data visualization</span>
            </div>
          </div>
          
          {/* Detailed Data Table Section */}
          <div className="glass p-6 rounded-xl border border-border mt-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity size={20} className="text-primary"/> Recent Metric Alerts
              </h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg font-medium">Metric</th>
                    <th className="px-4 py-3 font-medium">Condition</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 rounded-r-lg font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'CPU Utilization', condition: '> 80%', status: 'Critical', time: '10 mins ago', color: 'text-destructive', bg: 'bg-destructive/10' },
                    { metric: 'Memory Usage', condition: '> 90%', status: 'Warning', time: '1 hour ago', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { metric: 'API Latency', condition: '> 200ms', status: 'Resolved', time: '3 hours ago', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { metric: 'Error Rate', condition: '> 5%', status: 'Resolved', time: '5 hours ago', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { metric: 'Disk Space', condition: '< 10GB left', status: 'Warning', time: '1 day ago', color: 'text-amber-500', bg: 'bg-amber-500/10' }
                  ].map((alert, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="px-4 py-4 font-medium flex items-center gap-2">
                        <Bell size={14} className="text-muted-foreground" /> {alert.metric}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{alert.condition}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${alert.color} ${alert.bg}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{alert.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-border sticky top-6 shadow-sm">
            <h3 className="font-semibold mb-5 text-base flex items-center gap-2">
              <Database size={18} className="text-primary"/> Data Sources
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm hover:bg-emerald-500/20 transition-colors cursor-pointer">
                <span className="font-medium">PostgreSQL (Prod)</span>
                <CheckCircle size={16} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm hover:bg-emerald-500/20 transition-colors cursor-pointer">
                <span className="font-medium">Snowflake (Analytics)</span>
                <CheckCircle size={16} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm hover:bg-amber-500/20 transition-colors cursor-pointer">
                <span className="font-medium">Stripe API</span>
                <AlertTriangle size={16} className="text-amber-500" />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm hover:bg-emerald-500/20 transition-colors cursor-pointer">
                <span className="font-medium">HubSpot CRM</span>
                <CheckCircle size={16} className="text-emerald-500" />
              </div>
            </div>
            <button className="w-full mt-5 py-2.5 text-sm font-medium border border-dashed border-border rounded-lg hover:text-primary hover:border-primary/50 transition-colors">
              + Connect Source
            </button>
            
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-semibold mb-4 text-base">Dashboard Settings</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center p-2 hover:bg-secondary/50 rounded-md transition-colors cursor-pointer">
                  <span className="text-muted-foreground">Auto-refresh</span>
                  <span className="font-medium bg-secondary px-2 py-1 rounded text-xs">Every 5m</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-secondary/50 rounded-md transition-colors cursor-pointer">
                  <span className="text-muted-foreground">Theme</span>
                  <span className="font-medium bg-secondary px-2 py-1 rounded text-xs">Match System</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-secondary/50 rounded-md transition-colors cursor-pointer">
                  <span className="text-muted-foreground">Access Level</span>
                  <span className="font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs">Public Link</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-secondary/50 rounded-md transition-colors cursor-pointer">
                  <span className="text-muted-foreground">Layout</span>
                  <span className="font-medium bg-secondary px-2 py-1 rounded text-xs">Fluid Grid</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-sm mb-2 text-primary">Pro Tip</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hold <kbd className="bg-background border border-border px-1 rounded text-[10px]">Shift</kbd> while dragging a widget to snap it to the grid perfectly.
                </p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-muted-foreground">Grid Snap</span>
                <div className="w-8 h-4 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm">Revision History</h3>
            <div className="space-y-4">
              {[
                { version: "v2.4", user: "Admin", time: "2 hours ago" },
                { version: "v2.3", user: "John D.", time: "Yesterday" },
                { version: "v2.2", user: "System", time: "3 days ago" }
              ].map((rev, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{rev.version}</span>
                    <span className="text-xs text-muted-foreground">by {rev.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{rev.time}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors">
              Restore Version
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
