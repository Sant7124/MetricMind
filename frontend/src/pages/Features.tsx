import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Database, Shield, Zap, Search, Layers, Lock, Cpu, Globe } from "lucide-react";

export function Features() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0" />
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                Features that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Transform</span> Data
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Explore the powerful tools built into MetricMind. From our Autonomous AI Agent to enterprise-grade governance, we have everything you need to unlock the value in your warehouse.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-6">
          
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
                <Cpu size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Autonomous AI Agent</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Say goodbye to writing complex SQL queries. Our AI agent natively understands your business language. Ask questions like "Why did revenue drop in Q3?" and receive interactive charts, deep-dive analytics, and root-cause breakdowns instantly.
              </p>
              <ul className="space-y-3">
                {["Context-aware follow-ups", "Auto-generates charts & visuals", "Semantic query generation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Zap size={14} /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 glass p-8 rounded-3xl border border-border shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-3xl" />
              <div className="space-y-4 relative z-10">
                <div className="flex justify-end"><div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm">Why did profit margin drop?</div></div>
                <div className="flex justify-start">
                  <div className="bg-secondary/50 border border-border p-4 rounded-2xl rounded-tl-sm w-3/4">
                    <div className="font-semibold mb-2">Executive Summary</div>
                    <div className="text-sm text-muted-foreground mb-4">Profit margins dropped 12% primarily due to increased shipping costs in the APAC region...</div>
                    <div className="h-24 bg-background rounded-lg border border-border flex items-end justify-between p-2">
                       <div className="w-4 bg-primary/40 rounded-t h-1/2"></div>
                       <div className="w-4 bg-primary/60 rounded-t h-3/4"></div>
                       <div className="w-4 bg-primary rounded-t h-full"></div>
                       <div className="w-4 bg-primary/80 rounded-t h-2/3"></div>
                       <div className="w-4 bg-primary/40 rounded-t h-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-32">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
                <Database size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Governed Semantic Layer</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Stop arguing over whose numbers are right. Define your metrics once in our Semantic Layer and ensure absolute consistency across every dashboard, report, and AI chat in your organization.
              </p>
              <ul className="space-y-3">
                {["Version-controlled metric definitions", "Centralized business logic", "Warehouse agnostic translation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500"><Layers size={14} /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 glass p-8 rounded-3xl border border-border shadow-2xl overflow-hidden"
            >
              <pre className="text-sm font-mono text-muted-foreground p-4 bg-background/50 rounded-xl border border-border overflow-x-auto">
{`metrics:
  - name: "Active Users"
    description: "Users who logged in within 30 days"
    formula: "COUNT(DISTINCT users.id)"
    table: "users"
    dimensions:
      - "region"
      - "device_type"
    filters:
      - "last_login >= CURRENT_DATE - 30"`}
              </pre>
            </motion.div>
          </div>

          {/* Additional Features Grid */}
          <div className="text-center mb-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Built for modern data teams that require power, flexibility, and security.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dynamic Dashboards", desc: "Build interactive, real-time dashboards using drag-and-drop or AI generation.", icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Enterprise RBAC", desc: "Granular Role-Based Access Control ensuring users only see data they are authorized to.", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { title: "Query Inspector", desc: "Total transparency. Inspect the exact SQL the AI generates and trace back every metric.", icon: Search, color: "text-orange-500", bg: "bg-orange-500/10" },
              { title: "Global Integrations", desc: "Connects instantly with Snowflake, BigQuery, PostgreSQL, Redshift, and Databricks.", icon: Globe, color: "text-purple-500", bg: "bg-purple-500/10" },
              { title: "SOC2 Security", desc: "Bank-grade encryption, audit logging, and compliance out of the box.", icon: Lock, color: "text-red-500", bg: "bg-red-500/10" },
              { title: "Lightning Fast", desc: "Parallel LLM routing ensures you get insights in seconds, not minutes.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl border border-border hover:-translate-y-1 transition-transform"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your analytics?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of data teams who have stopped writing boilerplate SQL and started driving real business value.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all text-lg shadow-lg shadow-primary/20">
            Start your free trial <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
