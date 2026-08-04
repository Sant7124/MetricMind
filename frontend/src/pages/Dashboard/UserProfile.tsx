import { useState } from "react";
import { User, Mail, Building, Clock, Globe, Shield } from "lucide-react";

export function UserProfile() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your enterprise account settings.</p>
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-3xl">
            A
          </div>
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                <div className="font-medium flex items-center gap-2"><User size={14}/> Alice Executive</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <div className="font-medium flex items-center gap-2"><Mail size={14}/> alice@metricmind.com</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Department</label>
                <div className="font-medium flex items-center gap-2"><Building size={14}/> Finance</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Role</label>
                <div className="font-medium flex items-center gap-2"><Shield size={14} className="text-indigo-400"/> Super Admin</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm">
              <option>UTC (Default)</option>
              <option>America/New_York</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
