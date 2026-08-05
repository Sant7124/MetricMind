import { useState } from "react";
import { Plus, LayoutGrid, Save, Settings, Database, CheckCircle, AlertTriangle, Layers, Copy } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const MOCK_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 }
];

export function DashboardBuilder() {
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'bar', title: 'Monthly Revenue' },
    { id: 2, type: 'area', title: 'Active Users (Live)' },
    { id: 3, type: 'pie', title: 'Traffic Sources' },
    { id: 4, type: 'line', title: 'Customer Growth' },
    { id: 5, type: 'bar', title: 'Revenue vs Target' }
  ]);
  
  const addWidget = () => {
    setWidgets([...widgets, { id: Date.now(), type: 'bar', title: 'New Widget' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Dashboards</h1>
          <p className="text-muted-foreground">Build, organize, and share your own personalized metrics views.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addWidget} className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors">
            <Plus size={16} /> Add Widget
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors">
            <Save size={16} /> Save Layout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Builder Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Template Library */}
          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid size={16} /> Template Library
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Executive Brief", color: "blue" },
                { name: "Marketing ROI", color: "emerald" },
                { name: "Sales Pipeline", color: "amber" },
                { name: "Product Usage", color: "purple" }
              ].map((tpl, i) => (
                <div key={i} className={`p-4 rounded-lg border border-${tpl.color}-500/20 bg-${tpl.color}-500/5 hover:bg-${tpl.color}-500/10 cursor-pointer transition-colors text-center group`}>
                  <Layers size={24} className={`mx-auto mb-2 text-${tpl.color}-500 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-medium">{tpl.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {widgets.map(widget => (
              <div key={widget.id} className="glass p-4 rounded-xl border border-border flex flex-col h-72 group relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 bg-secondary/80 rounded hover:bg-secondary text-muted-foreground"><Copy size={14}/></button>
                  <button className="p-1.5 bg-secondary/80 rounded hover:bg-secondary text-muted-foreground"><Settings size={14}/></button>
                </div>
                <div className="flex justify-between items-center mb-4 pt-2 px-2">
                  <h3 className="font-semibold">{widget.title}</h3>
                </div>
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {widget.type === 'bar' ? (
                      <BarChart data={MOCK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : widget.type === 'area' ? (
                      <AreaChart data={MOCK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--emerald-500))" fill="hsl(var(--emerald-500))" fillOpacity={0.2} />
                      </AreaChart>
                    ) : widget.type === 'line' ? (
                      <LineChart data={MOCK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Line type="monotone" dataKey="value" stroke="hsl(var(--blue-500))" strokeWidth={3} />
                      </LineChart>
                    ) : (
                      <PieChart>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                        <Pie data={MOCK_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                          {MOCK_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['hsl(var(--primary))', 'hsl(var(--emerald-500))', 'hsl(var(--blue-500))', 'hsl(var(--amber-500))'][index % 4]} />
                          ))}
                        </Pie>
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
            
            {/* Placeholder slot */}
            <div 
              onClick={addWidget}
              className="border-2 border-dashed border-border rounded-xl h-72 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all"
            >
              <Plus size={32} className="mb-2" />
              <span className="font-medium">Add New Widget</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
              <Database size={16}/> Data Sources
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm">
                <span className="font-medium">PostgreSQL (Prod)</span>
                <CheckCircle size={14} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm">
                <span className="font-medium">Snowflake (Analytics)</span>
                <CheckCircle size={14} className="text-emerald-500" />
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
                <span className="font-medium">Stripe API</span>
                <AlertTriangle size={14} className="text-amber-500" />
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium border border-dashed border-border rounded-lg hover:text-foreground transition-colors">
              + Connect Source
            </button>
          </div>

          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="font-semibold mb-3 text-sm">Dashboard Settings</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Auto-refresh</span>
                <span className="font-medium">Every 5m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Theme</span>
                <span className="font-medium">Match System</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Access</span>
                <span className="font-medium text-emerald-500">Public Link</span>
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
