import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from "recharts";

export function RevenueDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this hits the /analytics/query endpoint
    // with metrics=["Revenue", "Gross Revenue"] and dimensions=["Time"]
    setTimeout(() => {
      setData([
        { month: 'Jan', revenue: 4000, gross: 5000 },
        { month: 'Feb', revenue: 3000, gross: 3500 },
        { month: 'Mar', revenue: 2000, gross: 2500 },
        { month: 'Apr', revenue: 2780, gross: 3200 },
        { month: 'May', revenue: 1890, gross: 2200 },
        { month: 'Jun', revenue: 2390, gross: 2900 },
        { month: 'Jul', revenue: 3490, gross: 4200 },
      ] as any);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revenue Dashboard</h1>
          <p className="text-muted-foreground">Deep dive into revenue streams and gross income.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Filter size={16} /> Filters
          </button>
          <select className="bg-primary text-primary-foreground border-transparent rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>Last 12 Months</option>
            <option>Last 30 Days</option>
            <option>YTD</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Net Revenue", value: "$45,231.89", change: "+20.1%", trend: "up" },
          { title: "Gross Revenue", value: "$52,430.00", change: "+15.2%", trend: "up" },
          { title: "Average Order Value", value: "$124.50", change: "-2.4%", trend: "down" },
          { title: "Refund Rate", value: "1.2%", change: "+0.1%", trend: "down" }
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-6 rounded-xl border border-border">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <div className={`p-1.5 rounded-md ${kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <h3 className="text-2xl font-bold">{kpi.value}</h3>
            <p className={`text-xs mt-2 ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-destructive'}`}>
              {kpi.change} from last period
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-xl border border-border h-96">
        <h3 className="text-lg font-semibold mb-6">Revenue Growth (Net vs Gross)</h3>
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">Loading Data...</div>
        ) : (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="gross" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Gross Revenue" />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Net Revenue" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  );
}
