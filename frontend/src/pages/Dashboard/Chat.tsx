import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Plus, MessageSquare, BookOpen, Database, TrendingUp, Sparkles, Filter, Server, LayoutDashboard, BrainCircuit } from "lucide-react";
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
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              ) : data.chartType === 'bar' ? (
                <BarChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', fontSize: '12px' }} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Unsupported Chart Type</div>
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
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
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
      if (res.data?.data) setConversations(res.data.data);
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
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-secondary/30 p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">AI Chat</h1>
          <p className="text-muted-foreground mt-2 font-medium">Interact with the MetricMind Agent to analyze your business data naturally.</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shadow-sm">
          <BrainCircuit size={20} className="text-indigo-500" />
          <span className="text-sm font-bold text-indigo-500">MetricMind Intelligence Active</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Sidebar - Rich Content */}
        <div className="hidden lg:flex flex-col w-80 shrink-0 space-y-6">
          <div className="glass p-5 rounded-2xl border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <button
              onClick={() => { setMessages([]); setCurrentId(null); }}
              className="flex items-center gap-2 w-full p-2.5 mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl justify-center hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-bold"
            >
              <Plus size={18} /> New Analysis
            </button>

            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageSquare size={14} className="text-indigo-500"/> Chat History
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
              {conversations.length > 0 ? conversations.map(conv => (
                <div key={conv.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/60 border border-transparent hover:border-border/50 cursor-pointer text-sm font-medium transition-all group">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors"></div>
                  <span className="truncate flex-1 text-muted-foreground group-hover:text-foreground">{conv.title}</span>
                </div>
              )) : (
                <div className="text-xs text-muted-foreground italic px-2 py-4 text-center">No history yet...</div>
              )}
            </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-border shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-muted-foreground flex items-center gap-2">
              <BookOpen size={14} className="text-emerald-500"/> Knowledge Base Index
            </h3>
            <div className="space-y-3">
              {[
                { title: "Financial Models", docs: 12, color: "emerald" },
                { title: "Marketing Campaign ROI", docs: 8, color: "rose" },
                { title: "Sales Playbooks", docs: 24, color: "blue" },
                { title: "Customer Success Metrics", docs: 15, color: "amber" },
                { title: "Operations SOPs", docs: 31, color: "purple" },
              ].map((kb, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 hover:bg-secondary/40 rounded-xl cursor-pointer transition-all border border-transparent hover:border-border/50 group">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{kb.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 bg-${kb.color}-500/10 text-${kb.color}-500 border border-${kb.color}-500/20 rounded-md`}>{kb.docs} docs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area - Big Premium Box */}
        <div className="flex-1 flex flex-col h-[75vh] min-h-[600px] glass rounded-3xl border border-border relative overflow-hidden shadow-2xl bg-card/80 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">

            {messages.length === 1 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-80">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-500 mb-4 shadow-[0_0_30px_rgba(99,102,241,0.15)] border border-indigo-500/20">
                  <BrainCircuit size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground bg-gradient-to-br from-foreground to-foreground/70 text-transparent bg-clip-text">How can I help you today?</h2>
                <p className="text-sm max-w-md mx-auto text-muted-foreground font-medium">Ask MetricMind anything about your data, reports, or automated insights. I can generate SQL, draw charts, and analyze metrics.</p>
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-500 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot size={20} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-3xl p-5 md:px-6 md:py-4 ${msg.role === 'user' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 rounded-tr-sm' : 'bg-secondary/40 text-foreground border border-border shadow-sm rounded-tl-sm'}`}>
                  <div className={`prose prose-sm dark:prose-invert max-w-none text-sm font-medium ${msg.role === 'user' ? 'text-white' : 'text-foreground/90'}`}>
                    <ReactMarkdown components={{ code: ChartRenderer }}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm border border-border">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-500 border border-indigo-500/20 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={20} />
                </div>
                <div className="bg-secondary/40 border border-border rounded-3xl rounded-tl-sm px-6 py-5 flex gap-2 items-center shadow-sm">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div className="p-5 bg-card border-t border-border shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] relative z-10">
            <div className="relative flex items-center max-w-4xl mx-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about your business data..."
                className="w-full bg-secondary/50 border border-border focus:border-indigo-500 rounded-full pl-6 pr-14 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2.5 p-2.5 bg-indigo-600 text-white rounded-full disabled:opacity-50 hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-600/30 hover:-translate-y-0.5"
              >
                <Send size={16} />
              </button>
            </div>

            <div className="flex gap-2.5 overflow-x-auto mt-5 justify-center custom-scrollbar max-w-4xl mx-auto pb-2">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold py-1.5 px-2 flex items-center">Suggestions:</span>
              {[
                { text: "Show monthly revenue", icon: "📊" },
                { text: "Why did profit margin drop?", icon: "📉" },
                { text: "Forecast next month", icon: "🔮" },
                { text: "Top 5 products by region", icon: "🏆" }
              ].map(suggestion => (
                <button
                  key={suggestion.text}
                  onClick={() => setInput(suggestion.text)}
                  className="whitespace-nowrap px-4 py-2 text-xs font-semibold bg-background border border-border hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-full transition-all flex items-center gap-2 text-muted-foreground hover:text-indigo-500 shadow-sm"
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
        <div className="glass p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-amber-500 flex items-center gap-2">
            <Sparkles size={14}/> Suggested Deep Dives
          </h3>
          <div className="space-y-4">
            {[
              { title: "Customer Churn Anomaly", desc: "High churn detected in Enterprise tier EMEA region last week.", color: "amber" },
              { title: "Ad Spend Optimization", desc: "Reallocate $50k from LinkedIn to Google Ads for better CPA.", color: "blue" },
              { title: "Supply Chain Bottleneck", desc: "Shipping delays in APAC are causing a 12% drop in fulfillment speed.", color: "rose" },
              { title: "Pricing Tier Upgrades", desc: "20% of 'Pro' users are hitting their limits. Prime time for upsell.", color: "emerald" },
              { title: "SaaS Discount Impact", desc: "Annual discounts are severely affecting Q3 projected MRR.", color: "purple" }
            ].map((dive, i) => (
              <div key={i} className={`p-4 bg-${dive.color}-500/5 border border-${dive.color}-500/20 rounded-xl cursor-pointer hover:bg-${dive.color}-500/10 hover:shadow-sm transition-all`}>
                <p className="text-sm font-bold mb-1.5 text-foreground">{dive.title}</p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">{dive.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Insights */}
        <div className="glass p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-emerald-500 flex items-center gap-2">
            <TrendingUp size={14}/> Recent AI Insights
          </h3>
          <div className="space-y-4">
            {[
              "Q2 Revenue exceeded target by 14% due to unexpected enterprise deals.",
              "Organic traffic grew 22% MoM, mainly driven by the new SEO strategy.",
              "Server costs decreased by 5% following the AWS architecture optimization.",
              "User engagement on the mobile app dropped 8% after the recent UI update.",
              "Customer Support ticket volume spiked by 30% regarding billing issues."
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl text-sm bg-background border border-border/50 hover:border-emerald-500/30 hover:shadow-sm transition-all group">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)] group-hover:scale-125 transition-transform"></div>
                <span className="text-muted-foreground group-hover:text-foreground font-medium transition-colors cursor-pointer leading-relaxed text-xs">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Data Context */}
        <div className="glass p-6 rounded-2xl border border-border lg:col-span-1 md:col-span-2 shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-cyan-500">
            <Database size={14}/> Current Data Context
          </h3>
          <div className="space-y-5">
            <div className="p-4 bg-background border border-border rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-2">
                <Server size={12}/> Active Dataset
              </span>
              <p className="text-lg font-bold text-foreground">Enterprise Analytics DW</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span> Synced: Just now
              </p>
            </div>
            
            <div className="p-4 bg-background border border-border rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 mb-3">
                <Filter size={12}/> Applied Filters
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded-full border border-cyan-500/20">YTD 2026</span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded-full border border-cyan-500/20">Global Region</span>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-xs font-bold rounded-full border border-cyan-500/20">All Segments</span>
              </div>
            </div>
            
            <div className="p-4 bg-background border border-border rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Available Tables</span>
              <div className="grid grid-cols-2 gap-2">
                {['fct_sales', 'dim_customers', 'fct_marketing', 'dim_products', 'fct_events', 'dim_geography'].map(table => (
                  <div key={table} className="text-xs px-2.5 py-1.5 bg-secondary/50 border border-border/50 rounded-md font-medium text-muted-foreground flex items-center gap-1.5">
                    <Database size={10} className="text-indigo-500/70" /> {table}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
