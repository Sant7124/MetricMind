import { useState } from "react";
import { Download, FileText, Printer, Mail, Calendar, Clock, ArrowUp, Star, Filter, BarChart2, Zap, MoreVertical } from "lucide-react";

export function ReportCenter() {
  const reports = [
    { name: "Executive Summary", type: "PDF", date: "2026-08-01", views: 245, icon: <BarChart2 size={20} />, 
      theme: { border: "border-blue-500/20", bgTo: "to-blue-500/5", glow: "bg-blue-500/10 group-hover:bg-blue-500/20", iconBg: "bg-blue-500/15", iconText: "text-blue-600", btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20", borderHover: "hover:border-blue-500/40" } },
    { name: "Q3 Regional Sales", type: "Excel", date: "2026-08-02", views: 189, icon: <FileText size={20} />,
      theme: { border: "border-emerald-500/20", bgTo: "to-emerald-500/5", glow: "bg-emerald-500/10 group-hover:bg-emerald-500/20", iconBg: "bg-emerald-500/15", iconText: "text-emerald-600", btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20", borderHover: "hover:border-emerald-500/40" } },
    { name: "Customer Churn", type: "CSV", date: "2026-08-03", views: 156, icon: <Zap size={20} />,
      theme: { border: "border-amber-500/20", bgTo: "to-amber-500/5", glow: "bg-amber-500/10 group-hover:bg-amber-500/20", iconBg: "bg-amber-500/15", iconText: "text-amber-600", btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20", borderHover: "hover:border-amber-500/40" } },
    { name: "Cost Breakdown", type: "PDF", date: "2026-08-04", views: 98, icon: <Filter size={20} />,
      theme: { border: "border-purple-500/20", bgTo: "to-purple-500/5", glow: "bg-purple-500/10 group-hover:bg-purple-500/20", iconBg: "bg-purple-500/15", iconText: "text-purple-600", btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20", borderHover: "hover:border-purple-500/40" } },
  ];

  const categories = [
    { name: 'Finance', classes: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500 hover:text-white' },
    { name: 'Marketing', classes: 'bg-pink-500/10 text-pink-600 border-pink-500/20 hover:bg-pink-500 hover:text-white' },
    { name: 'Sales', classes: 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500 hover:text-white' },
    { name: 'Engineering', classes: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500 hover:text-white' },
    { name: 'HR', classes: 'bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500 hover:text-white' },
    { name: 'Operations', classes: 'bg-teal-500/10 text-teal-600 border-teal-500/20 hover:bg-teal-500 hover:text-white' },
    { name: 'Q3 Planning', classes: 'bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500 hover:text-white' },
    { name: 'Board Materials', classes: 'bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500 hover:text-white' }
  ];

  const deliveries = [
    { time: "Today, 5:00 PM", name: "Daily Sales Sync", recipients: "sales-team@acme.com", marker: "bg-indigo-500", text: "text-indigo-500" },
    { time: "Tomorrow, 9:00 AM", name: "Executive Dashboard PDF", recipients: "c-suite@acme.com", marker: "bg-blue-500", text: "text-blue-500" },
    { time: "Friday, 4:00 PM", name: "Weekly Churn Review", recipients: "retention@acme.com", marker: "bg-blue-500", text: "text-blue-500" },
  ];

  const downloads = [
    { name: "Q2 Financials", format: "Excel", time: "10 mins ago", user: "Finance Lead", badgeClasses: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", hoverClass: "hover:border-emerald-500/30" },
    { name: "May Churn Report", format: "PDF", time: "1 hr ago", user: "Admin", badgeClasses: "bg-rose-500/10 text-rose-600 border-rose-500/20", hoverClass: "hover:border-rose-500/30" },
    { name: "Active Users List", format: "CSV", time: "3 hrs ago", user: "Marketing Dir", badgeClasses: "bg-amber-500/10 text-amber-600 border-amber-500/20", hoverClass: "hover:border-amber-500/30" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header section with gradient */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-secondary/30 p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Report Center</h1>
          <p className="text-muted-foreground mt-2 font-medium">Access, schedule, and export enterprise tabular reports.</p>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2">
          <FileText size={18} /> Create New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Trending Reports with Vibrant Colors */}
          <div>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
              <Star size={22} className="text-amber-500" fill="currentColor"/> Trending Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reports.map((report, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${report.theme.border} bg-gradient-to-br from-background ${report.theme.bgTo} ${report.theme.borderHover} hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-all ${report.theme.glow}`}></div>
                  
                  <div className="flex justify-between items-start mb-5 relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${report.theme.iconBg} ${report.theme.iconText}`}>
                      {report.icon}
                    </div>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-background border border-border rounded-full text-foreground shadow-sm font-medium">
                      <ArrowUp size={14} className="text-emerald-500"/> {report.views} views
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 relative z-10 text-foreground">{report.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6 relative z-10">Generated: {report.date}</p>
                  
                  <div className="flex gap-2 relative z-10">
                    <button 
                      onClick={() => window.open(`http://localhost:8001/api/v1/export/csv?report_type=${encodeURIComponent(report.name)}`, '_blank')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 text-white rounded-lg text-sm font-medium shadow-md transition-colors ${report.theme.btn}`}
                    >
                      <Download size={16} /> {report.type}
                    </button>
                    <button className="p-2 bg-background border border-border hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground shadow-sm transition-colors">
                      <Printer size={16} />
                    </button>
                    <button className="p-2 bg-background border border-border hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground shadow-sm transition-colors">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Colorful Categories */}
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Explore by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat, i) => (
                <span key={i} className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-all shadow-sm ${cat.classes}`}>
                  {cat.name}
                </span>
              ))}
            </div>
          </div>

          {/* Automated Workflows */}
          <div className="glass p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">Automated Workflows</h2>
              <button className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1">View All <MoreVertical size={16} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Monthly Board Pack to S3", destination: "AWS S3", status: "Active" },
                { name: "Daily Sales Sync to CRM", destination: "Salesforce", status: "Active" },
                { name: "Weekly Churn Alerts", destination: "Slack #alerts", status: "Paused" },
                { name: "Support Metrics Export", destination: "Zendesk", status: "Active" }
              ].map((workflow, i) => (
                <div key={i} className="p-4 bg-background rounded-xl border border-border/60 hover:border-border hover:shadow-sm transition-all flex justify-between items-center group">
                  <div>
                    <h4 className="font-semibold text-sm group-hover:text-indigo-500 transition-colors">{workflow.name}</h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                       Target: {workflow.destination}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md shadow-sm ${workflow.status === 'Active' ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/15 text-amber-600 border border-amber-500/20'}`}>
                    {workflow.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Scheduled Deliveries */}
          <div className="glass p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <Calendar size={20} className="text-indigo-500"/> Scheduled Deliveries
            </h2>
            <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-6 relative z-10">
              {deliveries.map((delivery, i) => (
                <div key={i} className="relative pl-6">
                  <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ring-4 ring-background ${delivery.marker}`}></span>
                  <p className={`text-xs font-bold mb-1 ${delivery.text}`}>{delivery.time}</p>
                  <p className="text-sm font-semibold text-foreground">{delivery.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1 font-medium">
                    <Mail size={12} className="text-muted-foreground/70"/> {delivery.recipients}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2.5 border-2 border-indigo-500/30 border-dashed rounded-xl text-sm font-bold text-indigo-500 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all relative z-10 shadow-sm">
              + Schedule New Delivery
            </button>
          </div>
          
          {/* Recent Downloads */}
          <div className="glass p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <Clock size={20} className="text-emerald-500" /> Recent Downloads
            </h2>
            <div className="space-y-4">
              {downloads.map((dl, i) => (
                <div key={i} className={`flex justify-between items-center text-sm p-4 bg-background rounded-xl border border-border transition-all shadow-sm ${dl.hoverClass}`}>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{dl.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 font-medium">by {dl.user}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${dl.badgeClasses}`}>{dl.format}</span>
                    <span className="text-xs text-muted-foreground font-medium">{dl.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Report Analytics */}
          <div className="glass p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <Star size={20} className="text-amber-500"/> Report Analytics
            </h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-foreground">Executive Summary</span>
                  <span className="text-blue-500 font-bold">1.2k views</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-foreground">Q3 Regional Sales</span>
                  <span className="text-emerald-500 font-bold">850 views</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-500 w-[65%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-foreground">Customer Churn Analysis</span>
                  <span className="text-amber-500 font-bold">420 views</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-amber-500 w-[35%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
