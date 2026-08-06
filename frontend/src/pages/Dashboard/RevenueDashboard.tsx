import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from "recharts";
import api from "../../services/api";

export function RevenueDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await api.get("/analytics/dashboard/charts");
        if (response.data.status === "success") {
          const formatted = response.data.data.map((item: any) => ({
            month: item.month,
            revenue: item.revenue,
            gross: item.gross
          }));
          setData(formatted);
        }
      } catch (error) {
        console.error("Failed to load charts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Revenue Dashboard</h1>
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

      {/* New Interactive Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Top Selling Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2 glass p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <button className="text-sm text-primary hover:underline">View Full Catalog</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                  <th className="px-4 py-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Enterprise SaaS License", cat: "Software", rev: "$450,200", trend: "+12%" },
                  { name: "Cloud Storage Tier 3", cat: "Infrastructure", rev: "$210,500", trend: "+5%" },
                  { name: "Premium Support Plan", cat: "Services", rev: "$125,000", trend: "-2%" },
                  { name: "API Gateway Overage", cat: "Infrastructure", rev: "$85,400", trend: "+24%" }
                ].map((item, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.cat}</td>
                    <td className="px-4 py-3 font-bold">{item.rev}</td>
                    <td className={`px-4 py-3 font-medium ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-destructive'}`}>
                      {item.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Revenue Anomalies */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-1 glass p-6 rounded-xl border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign size={100} />
          </div>
          <h3 className="text-lg font-semibold mb-4 text-amber-500 flex items-center gap-2">
            AI Anomaly Detection
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-500 font-medium mb-1">Unusual Churn Spike</p>
              <p className="text-xs text-muted-foreground">Detected a 15% drop in recurring revenue from the EMEA region over the last 48 hours.</p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-500 font-medium mb-1">Upsell Opportunity</p>
              <p className="text-xs text-muted-foreground">30% of users on the 'Pro' plan are near their API limits. Consider automated upsell campaign.</p>
            </div>
            <button className="w-full mt-2 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors">
              Run Deep Analysis
            </button>
          </div>
        </motion.div>
      </div>

      {/* NEW CONTENT: Subscription Tiers & Region Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6">Revenue by Subscription Tier</h3>
          <div className="space-y-6">
            {[
              { tier: "Enterprise", percentage: 55, amount: "$24.8M" },
              { tier: "Professional", percentage: 30, amount: "$13.5M" },
              { tier: "Starter", percentage: 10, amount: "$4.5M" },
              { tier: "Legacy", percentage: 5, amount: "$2.2M" }
            ].map((sub, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">{sub.tier}</span>
                  <span className="font-bold">{sub.amount}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${sub.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass p-6 rounded-xl border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Failed Payments Log</h3>
            <button className="text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">Export CSV</button>
          </div>
          <div className="space-y-4">
            {[
              { company: "Nexus Dynamics", reason: "Card Expired", amount: "$1,200", date: "Today" },
              { company: "Acme Corp", reason: "Insufficient Funds", amount: "$4,500", date: "Yesterday" },
              { company: "Global Systems", reason: "Fraud Suspected", amount: "$800", date: "2 days ago" },
              { company: "TechFlow Inc.", reason: "Gateway Timeout", amount: "$3,200", date: "3 days ago" }
            ].map((fail, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 border border-border/50">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{fail.company}</span>
                  <span className="text-xs text-destructive">{fail.reason}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-sm">{fail.amount}</span>
                  <span className="text-xs text-muted-foreground">{fail.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
