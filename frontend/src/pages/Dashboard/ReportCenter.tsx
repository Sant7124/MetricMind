import { useState } from "react";
import { Download, FileText, Printer, Mail } from "lucide-react";

export function ReportCenter() {
  const reports = [
    { name: "Executive Summary Report", type: "PDF", date: "2026-08-01" },
    { name: "Q3 Regional Sales", type: "Excel", date: "2026-08-02" },
    { name: "Customer Churn Analysis", type: "CSV", date: "2026-08-03" },
    { name: "Inventory Cost Breakdown", type: "PDF", date: "2026-08-04" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Center</h1>
          <p className="text-muted-foreground">Access and export enterprise tabular reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reports.map((report, i) => (
          <div key={i} className="glass p-5 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <FileText size={20} />
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
  );
}
