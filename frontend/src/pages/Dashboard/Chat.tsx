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

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 glass rounded-xl border border-border p-4">
        <button 
          onClick={() => { setMessages([]); setCurrentId(null); }}
          className="flex items-center gap-2 w-full p-2 mb-4 bg-primary text-primary-foreground rounded-lg justify-center hover:bg-primary/90 transition"
        >
          <Plus size={18} /> New Analysis
        </button>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">History</div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {conversations.map(conv => (
            <div key={conv.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary cursor-pointer text-sm transition">
              <MessageSquare size={16} className="text-muted-foreground" />
              <span className="truncate flex-1">{conv.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass rounded-xl border border-border relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              key={i} 
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Bot size={18} />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-foreground border border-border'}`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown 
                    components={{ code: ChartRenderer }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1">
                  <User size={18} />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Bot size={18} />
              </div>
              <div className="bg-secondary/50 border border-border rounded-2xl p-4 flex gap-1 items-center">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-border backdrop-blur-sm">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about your business data..."
              className="w-full bg-secondary/50 border border-border rounded-full pl-6 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            {["Show monthly revenue", "Why did profit margin drop?", "Top 5 products by region"].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap px-3 py-1.5 text-xs bg-secondary/30 hover:bg-secondary border border-border rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
