import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with semantic analytics.",
      price: "$49",
      period: "/mo",
      cta: "Start Free Trial",
      highlighted: false,
      features: [
        { name: "Up to 5 Users", included: true },
        { name: "Basic Semantic Models", included: true },
        { name: "Standard AI Agent", included: true },
        { name: "Email Support", included: true },
        { name: "Advanced Governance", included: false },
        { name: "Query Inspector", included: false },
        { name: "Role-Based Access Control", included: false },
        { name: "SOC2 Compliance", included: false },
      ]
    },
    {
      name: "Professional",
      description: "Everything you need to scale analytics across your organization.",
      price: "$199",
      period: "/mo",
      cta: "Start Free Trial",
      highlighted: true,
      features: [
        { name: "Up to 25 Users", included: true },
        { name: "Unlimited Semantic Models", included: true },
        { name: "Advanced AI (GPT-4 / Claude 3.5)", included: true },
        { name: "Priority Support", included: true },
        { name: "Advanced Governance", included: true },
        { name: "Query Inspector", included: true },
        { name: "Role-Based Access Control", included: true },
        { name: "SOC2 Compliance", included: false },
      ]
    },
    {
      name: "Enterprise",
      description: "Bank-grade security and unlimited scalability for global enterprises.",
      price: "Custom",
      period: "",
      cta: "Contact Sales",
      highlighted: false,
      features: [
        { name: "Unlimited Users", included: true },
        { name: "Unlimited Semantic Models", included: true },
        { name: "Dedicated AI Instance", included: true },
        { name: "24/7 Phone Support", included: true },
        { name: "Advanced Governance", included: true },
        { name: "Query Inspector", included: true },
        { name: "Role-Based Access Control", included: true },
        { name: "SOC2 Compliance", included: true },
      ]
    }
  ];

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
                Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Pricing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Whether you're a nimble startup or a Fortune 500 enterprise, MetricMind scales with your data needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative glass rounded-3xl border ${plan.highlighted ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-border'} p-8 flex flex-col`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Sparkles size={14} /> Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6 h-12">{plan.description}</p>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">{plan.period}</span>
                </div>
                
                <Link 
                  to="/register" 
                  className={`w-full py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all ${plan.highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                >
                  {plan.cta}
                </Link>
                
                <div className="mt-8 pt-8 border-t border-border flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                            <Check size={12} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-secondary text-muted-foreground flex items-center justify-center shrink-0">
                            <X size={12} />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about the product and billing.</p>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Can I switch plans later?", a: "Absolutely. You can upgrade or downgrade your plan at any time. Prorated charges will be applied automatically." },
              { q: "What counts as a 'Semantic Model'?", a: "A semantic model is a single governed definition of a business metric (e.g., 'Revenue' or 'Active Users'). You can have unlimited dimensions and filters attached to each model." },
              { q: "Do you offer custom integrations for Enterprise?", a: "Yes. Enterprise plans include dedicated solutions engineering to integrate with legacy systems, custom SSO providers, and unique data warehouses." },
              { q: "Is my data secure?", a: "Security is our top priority. We are SOC2 Type II certified. MetricMind never stores your underlying data; it strictly operates as a query layer pushing compute to your warehouse." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-border"
              >
                <h4 className="text-lg font-semibold mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden mt-12">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-6">Still have questions?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our team is here to help you design the perfect analytics architecture.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all text-lg shadow-lg shadow-primary/20">
            Contact Sales <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
