"use client";

import { useState } from "react";
import { CheckCircle2, Download, Inbox } from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries] = useState([
    { id: "1", name: "Abdullah Khan", phone: "+91 98765 43210", email: "abdullah@gmail.com", package: "Deluxe Umrah (14+Days)", message: "Assalamu Alaikum, I want to book a double-sharing room package for my parents.", time: "10 mins ago", status: "New" },
    { id: "2", name: "Farhan Shaikh", phone: "+91 91234 56789", email: "farhan@yahoo.com", package: "Express Stay (18+Days) Hajj", message: "What convenient airlines options are available for departure from Mumbai?", time: "2 hours ago", status: "Contacted" },
    { id: "3", name: "Kamil Patel", phone: "+91 98111 22233", email: "kamil@outlook.com", package: "Holy Heritage (10+Days)", message: "Please share the detailed itinerary schedule PDF for Ziyarat.", time: "1 day ago", status: "Closed" }
  ]);

  const exportCSV = () => {
    alert("Exporting leads history to CSV format.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Enquiries Inbox
          </h1>
          <p className="text-xs text-stone-500">
            View, track, and manage pilgrim booking requests and leads.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportCSV}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold rounded-lg transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-stone-200 rounded-2xl text-stone-400">
            <Inbox className="h-10 w-10 mb-2 opacity-50" />
            <span className="text-xs">No active enquiries found</span>
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="p-6 bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-900 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-stone-850 dark:text-stone-200">
                    {enq.name}
                  </h3>
                  <div className="flex items-center space-x-3 text-[10px] text-stone-450 font-semibold">
                    <span>{enq.phone}</span>
                    <span>•</span>
                    <span>{enq.email}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 self-start sm:self-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-50 dark:bg-stone-900 text-stone-500">
                    {enq.package}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {enq.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-stone-600 dark:text-stone-405 leading-relaxed bg-stone-50/50 dark:bg-stone-900/10 p-3 rounded-lg border border-stone-100/50 dark:border-stone-900/50">
                {enq.message}
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span>Received {enq.time}</span>
                <button
                  onClick={() => alert("Updating lead status requires Supabase integration in subsequent sprints.")}
                  className="flex items-center space-x-1 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-semibold"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mark as Contacted</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
