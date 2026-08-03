import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                The AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Semantic BI Engine</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Stop writing SQL. Start asking questions. MetricMind connects to your warehouse and delivers governed, trusted answers instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-lg shadow-lg shadow-primary/20 w-full sm:w-auto justify-center">
                  Start for free <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all text-lg w-full sm:w-auto justify-center flex">
                  Sign in to workspace
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-secondary/30 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Enterprise Analytics without the bottleneck</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">MetricMind provides a complete semantic layer paired with an autonomous AI agent.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Conversational UI", desc: "Ask 'Why did revenue drop?' and get interactive charts and root-cause analysis.", icon: Zap },
              { title: "Universal Semantic Layer", desc: "Define your metrics once in code, use them everywhere with complete trust.", icon: Database },
              { title: "Dynamic Dashboards", desc: "Pin any answer to a dashboard. Fully interactive and real-time.", icon: BarChart3 },
              { title: "Enterprise Security", desc: "Role-based access control, audit logs, and SOC2 compliance built-in.", icon: Shield },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
