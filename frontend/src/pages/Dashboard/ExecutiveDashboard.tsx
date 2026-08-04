import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";
import api from "../../services/api";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, AreaChart, Area
} from "recharts";

export function ExecutiveDashboard() {
  const [kpis, setKpis] = useState({ revenue: 0, orders: 0, customers: 0 });
  const [loading, setLoading] = useState(true);

  // Dummy chart data for Phase 2 scaffold (would come from actual API based on dates)
  const revenueData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
  ];

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await api.get("/analytics/dashboard/kpis");
        if (response.data.status === "success") {
          setKpis({
            revenue: parseFloat(response.data.data.total_revenue || 0),
            orders: parseInt(response.data.data.total_orders || 0),
            customers: parseInt(response.data.data.total_customers || 0)
          });
        }
      } catch (error) {
        console.error("Failed to fetch KPIs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
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
          <h3 className="text-lg font-semibold mb-6">Revenue vs Profit (YTD)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region Sales Bar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6">Sales by Region</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  cursor={{fill: 'hsl(var(--secondary))'}}
                />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="North America" />
                <Bar dataKey="profit" fill="hsl(var(--indigo-500))" radius={[4, 4, 0, 0]} name="Europe" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
