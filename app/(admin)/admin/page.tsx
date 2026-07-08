"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Database,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
  FileText
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("Good Day");
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const hours = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }
    };
    fetchUser();
  }, []);

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
          { label: "Active Enquiries", value: "24", change: "+12% this week", icon: FileText, color: "text-blue-600 bg-blue-50/50 dark:bg-blue-500/10" },
          { label: "Average Response", value: "420ms", change: "-8% latency", icon: Clock, color: "text-amber-600 bg-amber-50/50 dark:bg-amber-500/10" },
          { label: "Storage Capacity", value: "1.42 GB", change: "1.1% of 128GB", icon: Database, color: "text-emerald-600 bg-emerald-50/50 dark:bg-emerald-500/10" },
          { label: "System Health", value: "99.9%", change: "0 active alerts", icon: ShieldCheck, color: "text-purple-600 bg-purple-50/50 dark:bg-purple-500/10" }
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
                  {stat.value}
                </div>
                <div className="text-[11px] font-semibold text-muted-foreground flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500 mr-1.5" />
                  <span>{stat.change}</span>
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
                  {[
                    { name: "Abdullah Khan", topic: "Deluxe Umrah (14+ Days)", time: "10 mins ago", status: "New", color: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" },
                    { name: "Farhan Shaikh", topic: "Express Stay (18+ Days) Hajj", time: "2 hours ago", status: "Contacted", color: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" },
                    { name: "Kamil Patel", topic: "Holy Heritage (10+ Days)", time: "1 day ago", status: "Closed", color: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors duration-150">
                      <td className="px-6 py-4 font-bold text-foreground">{row.name}</td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{row.topic}</td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{row.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${row.color}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Website Overview Line Chart */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                  Website Overview
                </h2>
                <div className="flex items-baseline space-x-2.5">
                  <span className="text-2xl font-black tracking-tight text-foreground">28.4K</span>
                  <span className="text-[11px] font-bold text-emerald-500">+18% views</span>
                </div>
              </div>
              <select className="text-[11px] font-bold tracking-wide text-muted-foreground bg-muted/50 border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                <option>7D</option>
                <option>30D</option>
              </select>
            </div>
            <div className="relative">
              <svg viewBox="0 0 500 150" className="w-full h-40">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Y-axis guidelines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" strokeDasharray="4 4" className="text-border opacity-50" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" strokeDasharray="4 4" className="text-border opacity-50" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeDasharray="4 4" className="text-border opacity-50" />
                {/* Area under curve */}
                <path d="M 0 130 Q 80 80, 160 110 T 320 60 T 480 40 L 500 40 L 500 150 L 0 150 Z" fill="url(#lineGrad)" />
                {/* Stroke curve line */}
                <path d="M 0 130 Q 80 80, 160 110 T 320 60 T 480 40" fill="none" stroke="var(--primary)" strokeWidth="3" />
                {/* Interactive Peak Circles */}
                <circle cx="160" cy="110" r="4.5" fill="var(--primary)" />
                <circle cx="320" cy="60" r="4.5" fill="var(--primary)" />
                <circle cx="480" cy="40" r="4.5" fill="var(--primary)" />
              </svg>
              {/* Day Labels */}
              <div className="flex justify-between px-2 text-[10px] font-extrabold tracking-widest text-muted-foreground pt-3 uppercase">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
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
                { label: "Manage Media Library", href: "/admin/gallery" },
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

          {/* Storage Overview Gauge Chart */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Storage Overview
              </h2>
            </div>
            
            {/* SVG Doughnut Ring Chart */}
            <div className="relative flex items-center justify-center h-36 w-36 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                {/* Base background track */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="3" className="text-border opacity-50" />
                {/* Images: 762MB (approx 53%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="53 47" strokeDashoffset="0" />
                {/* Videos: 420MB (approx 29%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray="29 71" strokeDashoffset="-53" />
                {/* Documents: 120MB (approx 8%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="8 92" strokeDashoffset="-82" />
                {/* Others: 98MB (approx 7%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6B7280" strokeWidth="3" strokeDasharray="7 93" strokeDashoffset="-90" />
              </svg>
              {/* Inner ring text labels */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-foreground">1.42 GB</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mt-1">of 128 GB</span>
              </div>
            </div>

            {/* Color Legenda details */}
            <div className="grid grid-cols-2 gap-4 text-[11px] font-bold text-muted-foreground pt-3 border-t border-border">
              <div className="flex items-center space-x-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-sm" />
                <span>Images (762 MB)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-sm" />
                <span>Videos (420 MB)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm" />
                <span>Docs (120 MB)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-500 shadow-sm" />
                <span>Others (98 MB)</span>
              </div>
            </div>
          </div>

          {/* Recent Audit Activities */}
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Activity Log
            </h2>
            <div className="space-y-4">
              {[
                { label: "Shafin Mahida updated Hero Section", time: "2 hours ago" },
                { label: "Media file 'hero-bg.jpg' uploaded", time: "3 hours ago" },
                { label: "New enquiry from Abdullah Khan", time: "10 mins ago" },
                { label: "Site settings updated", time: "1 day ago" }
              ].map((log, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs leading-relaxed text-muted-foreground group">
                  <div className="flex items-center space-x-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors flex-shrink-0" />
                    <span className="font-medium group-hover:text-foreground transition-colors">{log.label}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground/70">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
