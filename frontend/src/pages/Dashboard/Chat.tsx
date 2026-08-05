import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Plus, MessageSquare, Trash2, LayoutDashboard } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../services/api";

// Custom component to render charts embedded in markdown JSON blocks
const ChartRenderer = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '');
  if (!inline && match && match[1] === 'json') {
    try {
      const data = JSON.parse(String(children).replace(/\n$/, ''));
      if (data.type === 'chart') {
        return (
          <div className="h-64 w-full my-4 p-4 glass rounded-xl border border-border">
            <ResponsiveContainer width="100%" height="100%">
              {data.chartType === 'line' || data.chartType === 'area' ? (
                <LineChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              ) : data.chartType === 'bar' ? (
                <BarChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">Unsupported Chart Type</div>
              )}
            </ResponsiveContainer>
          </div>
        );
      }
    } catch (e) {
      // If parsing fails, fall back to standard code block
    }
  }
  return <code className={className} {...props}>{children}</code>;
};

export function Chat() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    setMessages([{
      role: 'assistant', 
      content: 'Hello! I am the MetricMind Agent. I can help you analyze revenue, margins, customer trends, and generate governed executive insights. What would you like to know?'
    }]);
    
    // Load history sidebar
    api.get("/chat/conversations").then(res => {
      if(res.data?.data) setConversations(res.data.data);
    }).catch(console.error);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await api.post("/chat", {
        message: userMsg,
        conversation_id: currentId
      });
      
      if (response.data?.data) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.data.response }]);
        if (!currentId) {
          setCurrentId(response.data.data.conversation_id);
          // Refresh sidebar
          const convRes = await api.get("/chat/conversations");
          setConversations(convRes.data.data || []);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '**Error**: Could not reach the semantic engine. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar - Rich Content */}
        <div className="hidden lg:flex flex-col w-80 shrink-0 space-y-6">
          <div className="glass p-5 rounded-xl border border-border">
            <button 
              onClick={() => { setMessages([]); setCurrentId(null); }}
              className="flex items-center gap-2 w-full p-2.5 mb-4 bg-primary text-primary-foreground rounded-lg justify-center hover:bg-primary/90 transition shadow-sm font-medium"
            >
              <Plus size={18} /> New Analysis
            </button>
            
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">History</div>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {conversations.length > 0 ? conversations.map(conv => (
                <div key={conv.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  <span className="truncate flex-1">{conv.title}</span>
                </div>
              )) : (
                <div className="text-xs text-muted-foreground italic px-2">No history yet...</div>
              )}
            </div>
          </div>

          <div className="glass p-5 rounded-xl border border-border">
            <h3 className="text-sm font-semibold mb-4 text-primary">Knowledge Base Index</h3>
            <div className="space-y-3">
              {[
                { title: "Financial Models", docs: 12 },
                { title: "Marketing Campaign ROI", docs: 8 },
                { title: "Sales Playbooks", docs: 24 },
                { title: "Customer Success Metrics", docs: 15 },
                { title: "Operations SOPs", docs: 31 },
              ].map((kb, i) => (
                <div key={i} className="flex justify-between items-center p-2 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border/50">
                  <span className="text-sm font-medium">{kb.title}</span>
                  <span className="text-xs px-2 py-0.5 bg-secondary rounded-full text-muted-foreground">{kb.docs} docs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area - Big Premium Box */}
        <div className="flex-1 flex flex-col h-[75vh] min-h-[600px] glass rounded-2xl border border-border relative overflow-hidden shadow-2xl bg-card/80 backdrop-blur-xl">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            {messages.length === 1 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-muted-foreground opacity-60">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-inner">
                  <Bot size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">How can I help you today?</h2>
                <p className="text-sm max-w-md mx-auto">Ask MetricMind anything about your data, reports, or automated insights.</p>
              </div>
            )}

            {messages.length > 1 && messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                key={i} 
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot size={20} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-5 ${msg.role === 'user' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-background/80 text-foreground border border-border shadow-sm'}`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-base">
                    <ReactMarkdown components={{ code: ChartRenderer }}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={20} />
                </div>
                <div className="bg-background/80 border border-border rounded-2xl p-5 flex gap-1.5 items-center shadow-sm">
                  <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-background/95 border-t border-border backdrop-blur-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="relative flex items-center max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your business data..."
                className="w-full bg-secondary/30 border-2 border-border/50 focus:border-primary rounded-full pl-6 pr-14 py-4 text-base focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-3 bg-primary text-primary-foreground rounded-full disabled:opacity-50 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="flex gap-2 overflow-x-auto mt-4 justify-center custom-scrollbar max-w-4xl mx-auto">
              <span className="text-xs text-muted-foreground font-medium py-1.5 px-2">Suggestions:</span>
              {[
                { text: "Show monthly revenue", icon: "📊" },
                { text: "Why did profit margin drop?", icon: "📉" },
                { text: "Forecast next month", icon: "🔮" },
                { text: "Top 5 products by region", icon: "🏆" }
              ].map(suggestion => (
                <button 
                  key={suggestion.text}
                  onClick={() => setInput(suggestion.text)}
                  className="whitespace-nowrap px-3 py-1.5 text-xs bg-secondary/40 hover:bg-secondary border border-border/50 hover:border-primary/50 rounded-full transition-all flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <span>{suggestion.icon}</span> {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Below Chat - Deep Context Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Suggested Deep Dives */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6 text-amber-500 flex items-center gap-2">
            Suggested Deep Dives
          </h3>
          <div className="space-y-4">
            {[
              { title: "Customer Churn Anomaly", desc: "High churn detected in Enterprise tier EMEA region last week.", color: "amber" },
              { title: "Ad Spend Optimization", desc: "Reallocate $50k from LinkedIn to Google Ads for better CPA.", color: "blue" },
              { title: "Supply Chain Bottleneck", desc: "Shipping delays in APAC are causing a 12% drop in fulfillment speed.", color: "rose" },
              { title: "Pricing Tier Upgrades", desc: "20% of 'Pro' users are hitting their limits. Prime time for upsell.", color: "emerald" },
              { title: "SaaS Discount Impact", desc: "Annual discounts are severely affecting Q3 projected MRR.", color: "purple" }
            ].map((dive, i) => (
              <div key={i} className={`p-4 bg-${dive.color}-500/5 border border-${dive.color}-500/20 rounded-lg cursor-pointer hover:bg-${dive.color}-500/10 transition-colors`}>
                <p className="text-sm font-medium mb-1">{dive.title}</p>
                <p className="text-xs text-muted-foreground">{dive.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Insights */}
        <div className="glass p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-6 text-emerald-500 flex items-center gap-2">
            Recent AI Insights
          </h3>
          <div className="space-y-4">
            {[
              "Q2 Revenue exceeded target by 14% due to unexpected enterprise deals.",
              "Organic traffic grew 22% MoM, mainly driven by the new SEO strategy.",
              "Server costs decreased by 5% following the AWS architecture optimization.",
              "User engagement on the mobile app dropped 8% after the recent UI update.",
              "Customer Support ticket volume spiked by 30% regarding billing issues.",
              "Net Promoter Score (NPS) improved from 42 to 48 in the last quarter.",
              "Sales cycle length decreased from 45 days to 32 days for SMB clients."
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg text-sm bg-secondary/10 border border-border/30 hover:bg-secondary/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer leading-relaxed">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Data Context */}
        <div className="glass p-6 rounded-xl border border-border lg:col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            Current Data Context
          </h3>
          <div className="space-y-5">
            <div className="p-4 bg-secondary/30 border border-border/50 rounded-xl text-sm">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Dataset</span>
              <p className="text-lg font-semibold mt-1">Enterprise Analytics DW</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Synced: Just now
              </p>
            </div>
            <div className="p-4 bg-secondary/30 border border-border/50 rounded-xl text-sm">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applied Filters</span>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/20">YTD 2026</span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/20">Global Region</span>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/20">All Segments</span>
              </div>
            </div>
            <div className="p-4 bg-secondary/30 border border-border/50 rounded-xl text-sm">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Available Tables</span>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">fct_sales</div>
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">dim_customers</div>
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">fct_marketing</div>
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">dim_products</div>
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">fct_events</div>
                <div className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">dim_geography</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
