"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Database,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
  PlusCircle,
  FileText,
  UserCheck
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
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-900 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-850 dark:text-stone-250">
                Latest Leads & Enquiries
              </h2>
              <Link href="/admin/enquiries" className="text-[10px] font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center space-x-1">
                <span>View Inbox</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50/50 dark:bg-stone-900/10 text-[10px] uppercase font-bold text-stone-400 border-b border-stone-100 dark:border-stone-900">
                    <th className="px-5 py-3">Visitor Name</th>
                    <th className="px-5 py-3">Inquiry Details</th>
                    <th className="px-5 py-3">Timestamp</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-900 text-xs">
                  {[
                    { name: "Abdullah Khan", topic: "Deluxe Umrah (14+Days)", time: "10 mins ago", status: "New", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
                    { name: "Farhan Shaikh", topic: "Express Stay (18+Days) Hajj", time: "2 hours ago", status: "Contacted", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
                    { name: "Kamil Patel", topic: "Holy Heritage (10+Days)", time: "1 day ago", status: "Closed", color: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/30 dark:hover:bg-stone-900/20 text-stone-600 dark:text-stone-400">
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

          {/* Recent Audit Activities */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Recent Modifications Log
            </h2>
            <div className="space-y-3.5">
              {[
                { actor: "Shafin Mahida", action: "Updated dynamic highlights inside Deluxe Umrah", time: "2 hours ago" },
                { actor: "Vercel Buildbot", action: "Successfully deployed Production branch commit f7d4fc0", time: "3 hours ago" },
                { actor: "System Agent", action: "Optimized Breakfast.mov media grid thumbnail seek seek tags", time: "1 day ago" }
              ].map((log, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-semibold text-stone-800 dark:text-stone-200 mr-1.5">{log.actor}</span>
                    <span>{log.action}</span>
                    <span className="text-[10px] text-stone-400 ml-2">({log.time})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Shortcuts, Storage & Diagnostics */}
        <div className="space-y-6">
          {/* Quick Actions Shortcuts */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              Administrative Shortcuts
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              <Link
                href="/admin/website-builder"
                className="flex items-center space-x-3 p-2.5 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 dark:border-stone-900 dark:hover:bg-stone-900/50 transition-all duration-150 text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <PlusCircle className="h-4 w-4 text-stone-400" />
                <span>Configure Website Homepage</span>
              </Link>
              <Link
                href="/admin/packages"
                className="flex items-center space-x-3 p-2.5 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 dark:border-stone-900 dark:hover:bg-stone-900/50 transition-all duration-150 text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <PlusCircle className="h-4 w-4 text-stone-400" />
                <span>Create New Pilgrimage Package</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center space-x-3 p-2.5 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 dark:border-stone-900 dark:hover:bg-stone-900/50 transition-all duration-150 text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              >
                <UserCheck className="h-4 w-4 text-stone-400" />
                <span>Manage Coordinator Staff Roles</span>
              </Link>
            </div>
          </div>

          {/* Server / Health Health Diagnostics */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-xl shadow-sm p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-850 dark:text-stone-250">
              System Diagnostics
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
