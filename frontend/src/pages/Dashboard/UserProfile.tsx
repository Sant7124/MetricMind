import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Building, Clock, Globe, Shield } from "lucide-react";
import { UserAvatar } from "../../components/UserAvatar";

export function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your enterprise account settings.</p>
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex items-start gap-6">
          <UserAvatar user={user} className="w-24 h-24 shadow-lg" textClass="text-4xl drop-shadow-md" />
          <div className="space-y-4 flex-1 mt-2">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">Full Name</label>
                <div className="font-medium flex items-center gap-2"><User size={16} className="text-primary"/> {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.name}</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">Email Address</label>
                <div className="font-medium flex items-center gap-2"><Mail size={16} className="text-primary"/> {user?.email}</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">Department</label>
                <div className="font-medium flex items-center gap-2"><Building size={16} className="text-primary"/> Enterprise Operations</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block uppercase tracking-wider">System Role</label>
                <div className="font-medium flex items-center gap-2 capitalize"><Shield size={16} className="text-indigo-400"/> {user?.role_id}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Language Preference</label>
            <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Display Timezone</label>
            <select className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
              <option>UTC (Default)</option>
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
              <option>Europe/London</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
