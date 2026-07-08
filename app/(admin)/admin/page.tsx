"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Database,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
  FileText,
  Activity,
  Layers,
  Inbox
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const supabase = createClient();
  const [greeting, setGreeting] = useState("Good Day");
  const [userName, setUserName] = useState("Admin");
  const [loading, setLoading] = useState(true);

  // Metrics
  const [totalPackages, setTotalPackages] = useState(0);
  const [activeEnquiries, setActiveEnquiries] = useState(0);
  const [totalMedia, setTotalMedia] = useState(0);

  // Lists
  const [latestEnquiries, setLatestEnquiries] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    const hours = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user?.user_metadata?.full_name) {
      setUserName(user.user_metadata.full_name);
    }

    // Fetch counts
    const { count: pkgCount } = await supabase.from('packages').select('*', { count: 'exact', head: true });
    if (pkgCount) setTotalPackages(pkgCount);

    const { count: enqCount } = await supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new');
    if (enqCount) setActiveEnquiries(enqCount);

    const { count: mediaCount } = await supabase.from('media_assets').select('*', { count: 'exact', head: true });
    if (mediaCount) setTotalMedia(mediaCount);

    // Fetch lists
    const { data: latestEnq } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(4);
    if (latestEnq) setLatestEnquiries(latestEnq);

    const { data: logs } = await supabase.from('audit_logs').select('*, profiles:user_id(full_name)').order('created_at', { ascending: false }).limit(6);
    if (logs) setRecentLogs(logs);

    setLoading(false);
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Welcome Heading */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {greeting}, {userName}
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          Here is your pilgrimage platform status overview today.
        </p>
      </div>

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Active Enquiries", value: activeEnquiries.toString(), icon: Inbox, color: "text-blue-600 bg-blue-50/50 dark:bg-blue-500/10" },
          { label: "Total Packages", value: totalPackages.toString(), icon: Layers, color: "text-amber-600 bg-amber-50/50 dark:bg-amber-500/10" },
          { label: "Media Assets", value: totalMedia.toString(), icon: Database, color: "text-emerald-600 bg-emerald-50/50 dark:bg-emerald-500/10" },
          { label: "System Health", value: "99.9%", icon: ShieldCheck, color: "text-purple-600 bg-purple-50/50 dark:bg-purple-500/10" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 bg-card border border-border rounded-2xl space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="text-2xl font-black tracking-tight text-foreground">
                  {loading ? '...' : stat.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Changes & Website Health */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Form Enquiries Table */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Latest Enquiries
              </h2>
              <Link href="/admin/enquiries" className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center space-x-1.5 transition-colors">
                <span>View All</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 text-[10px] uppercase font-extrabold tracking-widest text-muted-foreground border-b border-border">
                    <th className="px-6 py-4">Visitor Name</th>
                    <th className="px-6 py-4">Inquiry Details</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-xs">
                  {latestEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No recent enquiries found.</td>
                    </tr>
                  ) : latestEnquiries.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors duration-150">
                      <td className="px-6 py-4 font-bold text-foreground">{row.name}</td>
                      <td className="px-6 py-4 text-muted-foreground font-medium truncate max-w-[200px]">{row.package_title || row.message}</td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{timeAgo(row.created_at)}</td>
                      <td className="px-6 py-4">
                        {row.status === 'new' && <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">New</span>}
                        {row.status === 'contacted' && <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Contacted</span>}
                        {row.status === 'spam' && <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide bg-destructive/10 text-destructive">Spam</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Quick Shortcuts, Storage & Diagnostics */}
        <div className="space-y-8">
          {/* Quick Actions Shortcuts */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { label: "Configure Homepage", href: "/admin/website-builder" },
                { label: "Create New Package", href: "/admin/packages" },
                { label: "Manage Media Library", href: "/admin/media" },
                { label: "View All Enquiries", href: "/admin/enquiries" }
              ].map((act, idx) => (
                <Link
                  key={idx}
                  href={act.href}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 text-xs font-bold text-muted-foreground hover:text-foreground group"
                >
                  <span>{act.label}</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-200">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Audit Activities */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Activity Log
              </h2>
              <Link href="/admin/audit" className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center space-x-1.5 transition-colors">
                <span>View All</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentLogs.length === 0 ? (
                <div className="text-xs text-muted-foreground text-center py-4">No recent activity.</div>
              ) : recentLogs.map((log, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs leading-relaxed text-muted-foreground group">
                  <div className="flex items-center space-x-3">
                    <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${log.action === 'DELETE' ? 'bg-destructive' : 'bg-primary'}`} />
                    <span className="font-medium group-hover:text-foreground transition-colors max-w-[150px] truncate">
                      {log.action} {log.table_name}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground/70">{timeAgo(log.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
