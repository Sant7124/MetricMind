import { useState } from "react";
import { Plus, LayoutGrid, Save, Settings } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const MOCK_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 }
];

export function DashboardBuilder() {
  const [widgets, setWidgets] = useState([{ id: 1, type: 'bar', title: 'Sample Revenue' }]);
  
  const addWidget = () => {
    setWidgets([...widgets, { id: Date.now(), type: 'bar', title: 'New Widget' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Dashboards</h1>
          <p className="text-muted-foreground">Build and organize your own metrics.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {widgets.map(widget => (
          <div key={widget.id} className="glass p-4 rounded-xl border border-border flex flex-col h-72">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{widget.title}</h3>
              <button className="text-muted-foreground hover:text-foreground"><Settings size={16}/></button>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
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
  );
}
