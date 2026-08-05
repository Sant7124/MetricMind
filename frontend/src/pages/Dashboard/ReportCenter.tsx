import { useState } from "react";
import { Download, FileText, Printer, Mail, Calendar, Clock, ArrowUp, Star } from "lucide-react";

export function ReportCenter() {
  const reports = [
    { name: "Executive Summary Report", type: "PDF", date: "2026-08-01", views: 245 },
    { name: "Q3 Regional Sales", type: "Excel", date: "2026-08-02", views: 189 },
    { name: "Customer Churn Analysis", type: "CSV", date: "2026-08-03", views: 156 },
    { name: "Inventory Cost Breakdown", type: "PDF", date: "2026-08-04", views: 98 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Center</h1>
          <p className="text-muted-foreground">Access, schedule, and export enterprise tabular reports.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Create New Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star size={18} className="text-amber-500" fill="currentColor"/> Trending Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, i) => (
                <div key={i} className="glass p-5 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <span className="flex items-center gap-1 text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                      <ArrowUp size={12} className="text-emerald-500"/> {report.views} views
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{report.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">Generated: {report.date}</p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => window.open(`http://localhost:8001/api/v1/export/csv?report_type=${encodeURIComponent(report.name)}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-secondary hover:bg-secondary/80 rounded text-xs font-medium"
                    >
                      <Download size={14} /> {report.type}
                    </button>
                    <button className="p-1.5 bg-secondary hover:bg-secondary/80 rounded text-muted-foreground hover:text-foreground">
                      <Printer size={14} />
                    </button>
                    <button className="p-1.5 bg-secondary hover:bg-secondary/80 rounded text-muted-foreground hover:text-foreground">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass p-6 rounded-xl border border-border">
            <h2 className="text-lg font-semibold mb-4">Report Categories</h2>
            <div className="flex flex-wrap gap-2">
              {['Finance', 'Marketing', 'Sales', 'Engineering', 'HR', 'Operations', 'Q3 Planning', 'Board Materials'].map((cat, i) => (
                <span key={i} className="px-3 py-1.5 bg-secondary/50 border border-border/50 rounded-full text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer transition-colors">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="glass p-6 rounded-xl border border-border mt-6">
            <h2 className="text-lg font-semibold mb-4">Automated Report Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Monthly Board Pack to S3", destination: "AWS S3", status: "Active" },
                { name: "Daily Sales Sync to CRM", destination: "Salesforce", status: "Active" },
                { name: "Weekly Churn Alerts", destination: "Slack #alerts", status: "Paused" },
                { name: "Support Metrics Export", destination: "Zendesk", status: "Active" }
              ].map((workflow, i) => (
                <div key={i} className="p-4 bg-secondary/20 rounded-lg border border-border/50 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{workflow.name}</h4>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                       Target: {workflow.destination}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${workflow.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {workflow.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 text-sm text-primary hover:underline font-medium">Manage Workflows &rarr;</button>
          </div>
        </div>

        {/* Right Sidebar - Scheduled Deliveries */}
        <div className="space-y-6">
          <div className="glass p-5 rounded-xl border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar size={18} /> Scheduled Deliveries
            </h2>
            <div className="relative border-l border-border/50 ml-3 space-y-6">
              {[
                { time: "Today, 5:00 PM", name: "Daily Sales Sync", recipients: "sales-team@acme.com", status: "Upcoming" },
                { time: "Tomorrow, 9:00 AM", name: "Executive Dashboard PDF", recipients: "c-suite@acme.com", status: "Scheduled" },
                { time: "Friday, 4:00 PM", name: "Weekly Churn Review", recipients: "retention@acme.com", status: "Scheduled" },
              ].map((delivery, i) => (
                <div key={i} className="relative pl-6">
                  <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-primary rounded-full ring-4 ring-background"></span>
                  <p className="text-xs font-medium text-primary mb-1">{delivery.time}</p>
                  <p className="text-sm font-semibold">{delivery.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Mail size={12}/> {delivery.recipients}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-border border-dashed rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-solid transition-all">
              + Schedule New Report
            </button>
          </div>
          <div className="glass p-5 rounded-xl border border-border mt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} /> Recent Downloads
            </h2>
            <div className="space-y-4">
              {[
                { name: "Q2 Financials", format: "Excel", time: "10 mins ago", user: "Finance Lead" },
                { name: "May Churn Report", format: "PDF", time: "1 hr ago", user: "Admin" },
                { name: "Active Users List", format: "CSV", time: "3 hrs ago", user: "Marketing Dir" },
              ].map((dl, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-3 bg-secondary/10 rounded-lg border border-border/30">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{dl.name}</span>
                    <span className="text-xs text-muted-foreground">by {dl.user}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded text-primary">{dl.format}</span>
                    <span className="text-xs text-muted-foreground mt-1">{dl.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass p-5 rounded-xl border border-border mt-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star size={18} /> Report Analytics
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>Executive Summary</span>
                  <span>1.2k views</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>Q3 Regional Sales</span>
                  <span>850 views</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 text-muted-foreground">
                  <span>Customer Churn Analysis</span>
                  <span>420 views</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[35%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
