import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown, Sparkles, Activity, ArrowRight, Clock } from "lucide-react";
import api from "../../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, AreaChart, Area
} from "recharts";

export function ExecutiveDashboard() {
  const [kpis, setKpis] = useState({ revenue: 0, orders: 0, customers: 0 });
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, chartRes] = await Promise.all([
          api.get("/analytics/dashboard/kpis"),
          api.get("/analytics/dashboard/charts")
        ]);
        
        if (kpiRes.data.status === "success") {
          setKpis({
            revenue: parseFloat(kpiRes.data.data.total_revenue || 0),
            orders: parseInt(kpiRes.data.data.total_orders || 0),
            customers: parseInt(kpiRes.data.data.total_customers || 0)
          });
        }
        
        if (chartRes.data.status === "success") {
          // Rename for the UI 
          const formatted = chartRes.data.data.map((item: any) => ({
            name: item.month,
            revenue: item.revenue,
            profit: item.gross
          }));
          setChartData(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Summary</h1>
          <p className="text-muted-foreground">Governed metrics overview across all regions.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-secondary/50 border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 30 Days</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-xl border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={80} />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={14} className="mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1 relative z-10">Total Revenue</p>
          <h3 className="text-3xl font-bold relative z-10">{loading ? "..." : formatCurrency(kpis.revenue)}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-xl border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShoppingCart size={80} />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
              <ShoppingCart size={20} />
            </div>
            <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp size={14} className="mr-1" /> +8.2%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1 relative z-10">Total Orders</p>
          <h3 className="text-3xl font-bold relative z-10">{loading ? "..." : kpis.orders.toLocaleString()}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-xl border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users size={80} />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
              <Users size={20} />
            </div>
            <span className="flex items-center text-sm font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
              <TrendingDown size={14} className="mr-1" /> -2.4%
            </span>
          </div>
          <p className="text-sm font-medium text-muted-foreground mb-1 relative z-10">Active Customers</p>
          <h3 className="text-3xl font-bold relative z-10">{loading ? "..." : kpis.customers.toLocaleString()}</h3>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Profit Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6">Revenue vs Profit (Last 12 Months)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" name="Gross Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region Sales Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6">Sales by Month</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  cursor={{fill: 'hsl(var(--secondary))'}}
                />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="profit" fill="hsl(var(--indigo-500))" radius={[4, 4, 0, 0]} name="Gross Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Interactive Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* AI Insights Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-1 glass p-6 rounded-xl border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles size={100} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-semibold">AI Executive Insights</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm">Revenue is projected to grow by <span className="font-bold text-emerald-500">14.2%</span> next month based on current trajectory.</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm">Customer retention in the <span className="font-bold text-blue-400">Enterprise</span> segment has improved by 4% over the last quarter.</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <p className="text-sm">Action required: <span className="font-bold text-destructive">2 high-value</span> deals are stalled in negotiation phase.</p>
            </div>
          </div>
          
          <button className="mt-6 w-full py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-medium text-sm transition-all flex items-center justify-center gap-2">
            Ask MetricMind AI <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Recent Activity Feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2 glass p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Activity size={20} />
              </div>
              <h3 className="text-lg font-semibold">Live Transaction Feed</h3>
            </div>
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg rounded-br-lg font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Acme Corp", amount: "$12,450.00", status: "Completed", time: "2 mins ago", color: "emerald" },
                  { name: "TechFlow Inc.", amount: "$8,230.50", status: "Processing", time: "15 mins ago", color: "blue" },
                  { name: "Global Systems", amount: "$24,100.00", status: "Completed", time: "1 hour ago", color: "emerald" },
                  { name: "Nexus Dynamics", amount: "$3,450.00", status: "Pending", time: "3 hours ago", color: "amber" },
                ].map((tx, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors group cursor-pointer">
                    <td className="px-4 py-3 font-medium flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                        {tx.name.charAt(0)}
                      </div>
                      {tx.name}
                    </td>
                    <td className="px-4 py-3 font-bold">{tx.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${tx.color}-500/10 text-${tx.color}-500`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
