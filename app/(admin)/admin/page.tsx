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

export default function AdminDashboardPage() {
  const [greeting, setGreeting] = useState("Good Day");
  const userName = "Shafin"; // Prepared to be dynamic later

  useEffect(() => {
    const hours = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Heading */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          {greeting}, {userName}
        </h1>
        <p className="text-xs text-stone-500">
          Here is your pilgrimage platform status overview today.
        </p>
      </div>

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Enquiries", value: "24", change: "+12% this week", icon: FileText, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/10" },
          { label: "Average Response", value: "420ms", change: "-8% latency", icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/10" },
          { label: "Storage Capacity", value: "1.42 GB", change: "1.1% of 128GB", icon: Database, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10" },
          { label: "System Health", value: "99.9%", change: "0 active alerts", icon: ShieldCheck, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/10" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {stat.value}
                </div>
                <div className="text-[10px] font-semibold text-stone-400 flex items-center">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Changes & Website Health */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Form Enquiries Table */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-900 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-850 dark:text-stone-250">
                Latest Enquiries
              </h2>
              <Link href="/admin/enquiries" className="text-[10px] font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center space-x-1">
                <span>View All</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/50 dark:bg-stone-900/10 text-[10px] uppercase font-bold text-stone-400 border-b border-stone-100 dark:border-stone-900">
                    <th className="px-5 py-3">Visitor Name</th>
                    <th className="px-5 py-3">Inquiry Details</th>
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-900 text-xs">
                  {[
                    { name: "Abdullah Khan", topic: "Deluxe Umrah (14+ Days)", time: "10 mins ago", status: "New", color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                    { name: "Farhan Shaikh", topic: "Express Stay (18+ Days) Hajj", time: "2 hours ago", status: "Contacted", color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
                    { name: "Kamil Patel", topic: "Holy Heritage (10+ Days)", time: "1 day ago", status: "Closed", color: "bg-stone-150 text-stone-750 dark:bg-stone-900/30 dark:text-stone-300" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/30 dark:hover:bg-stone-900/20 text-stone-605 dark:text-stone-400">
                      <td className="px-5 py-3.5 font-semibold text-stone-800 dark:text-stone-200">{row.name}</td>
                      <td className="px-5 py-3.5">{row.topic}</td>
                      <td className="px-5 py-3.5 text-stone-400">{row.time}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.color}`}>
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
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-855 dark:text-stone-245">
                  Website Overview
                </h2>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">28.4K</span>
                  <span className="text-[10px] font-semibold text-emerald-600">+18% views</span>
                </div>
              </div>
              <select className="text-[10px] font-semibold text-stone-500 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded px-2 py-1 focus:outline-none">
                <option>7D</option>
                <option>30D</option>
              </select>
            </div>
            <div className="relative">
              <svg viewBox="0 0 500 150" className="w-full h-36">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Y-axis guidelines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-stone-900/50" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-stone-900/50" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-stone-900/50" />
                {/* Area under curve */}
                <path d="M 0 130 Q 80 80, 160 110 T 320 60 T 480 40 L 500 40 L 500 150 L 0 150 Z" fill="url(#lineGrad)" />
                {/* Stroke curve line */}
                <path d="M 0 130 Q 80 80, 160 110 T 320 60 T 480 40" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                {/* Interactive Peak Circles */}
                <circle cx="160" cy="110" r="4" fill="#D4AF37" />
                <circle cx="320" cy="60" r="4" fill="#F59E0B" />
                <circle cx="480" cy="40" r="4" fill="#D4AF37" />
              </svg>
              {/* Day Labels */}
              <div className="flex justify-between px-2 text-[9px] font-bold text-stone-400 pt-2 uppercase">
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

          {/* Recent Audit Activities */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Recent Activity
            </h2>
            <div className="space-y-3.5">
              {[
                { label: "Shafin Mahida updated Hero Section", time: "2 hours ago" },
                { label: "Media file 'hero-bg.jpg' uploaded", time: "3 hours ago" },
                { label: "New enquiry from Abdullah Khan", time: "10 mins ago" },
                { label: "Site settings updated", time: "1 day ago" }
              ].map((log, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs leading-relaxed text-stone-605 dark:text-stone-400">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                    <span>{log.label}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts, Storage & Diagnostics */}
        <div className="space-y-6">
          {/* Quick Actions Shortcuts */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: "Configure Homepage", href: "/admin/website-builder" },
                { label: "Create New Package", href: "/admin/packages" },
                { label: "Manage Media Library", href: "/admin/gallery" },
                { label: "View All Enquiries", href: "/admin/enquiries" }
              ].map((act, idx) => (
                <Link
                  key={idx}
                  href={act.href}
                  className="flex items-center justify-between p-3 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50/50 dark:border-stone-900 dark:hover:bg-stone-900/50 transition-all duration-150 text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 group"
                >
                  <span>{act.label}</span>
                  <span className="text-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Storage Overview Gauge Chart */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-900 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Storage Overview
              </h2>
            </div>
            
            {/* SVG Doughnut Ring Chart */}
            <div className="relative flex items-center justify-center h-32 w-32 mx-auto">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Base background track */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F3EFE6" strokeWidth="3" className="dark:stroke-stone-900" />
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
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">1.42 GB</span>
                <span className="text-[8px] text-stone-400 uppercase tracking-wider font-semibold mt-0.5">of 128 GB</span>
              </div>
            </div>

            {/* Color Legenda details */}
            <div className="grid grid-cols-2 gap-3 text-[10px] font-semibold text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-900">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span>Images (762 MB)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Videos (420 MB)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Docs (120 MB)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-gray-500" />
                <span>Others (98 MB)</span>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/admin/gallery" className="text-[10px] font-bold text-stone-450 hover:text-stone-800 dark:hover:text-stone-200 transition-colors">
                View Details
              </Link>
            </div>
          </div>

          {/* Server / Health Health Diagnostics */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-850 dark:text-stone-250">
              Website Overview
            </h2>
            <div className="space-y-3.5">
              {[
                { label: "Core Database", value: "Fully Connected", status: "Active", color: "text-emerald-500" },
                { label: "Storage API Gateway", value: "All Buckets Operational", status: "Active", color: "text-emerald-500" },
                { label: "Dynamic Edge Rendering", value: "Turbopack Active", status: "Idle", color: "text-stone-450" }
              ].map((diag, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex flex-col space-y-0.5">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{diag.label}</span>
                    <span className="text-[10px] text-stone-400">{diag.value}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full bg-current ${diag.color}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">{diag.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
