"use client";

import { useState } from "react";
import { Plus, Calendar, ShieldCheck } from "lucide-react";

export default function AdminPackagesPage() {
  const [packages] = useState([
    { title: "Grand Stay (34+Days)", category: "Hajj", duration: "Tentative", status: "Active", availability: "Limited" },
    { title: "Express Stay (18+Days)", category: "Hajj", duration: "Tentative", status: "Active", availability: "Limited" },
    { title: "Umrah (14+Days)", category: "Umrah", duration: "14 Days", status: "Active", availability: "Open" },
    { title: "Holy Heritage (10+Days)", category: "Ziyarat", duration: "10 Days", status: "Active", availability: "Open" }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Tour Packages Catalog
          </h1>
          <p className="text-xs text-stone-500">
            Publish and manage Hajj, Umrah, and Ziyarat packages.
          </p>
        </div>
        <button
          onClick={() => alert("Creating packages requires database schema initialization in SPRINT 2.")}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Package</span>
        </button>
      </div>

      {/* Packages Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.title}
            className="p-5 bg-white dark:bg-stone-950 border border-stone-200/60 dark:border-stone-850 rounded-2xl shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-50 dark:bg-stone-900 text-stone-500">
                  {pkg.category}
                </span>
                <span className="flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{pkg.status}</span>
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-850 dark:text-stone-200">
                {pkg.title}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-900 text-[10px] text-stone-400">
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{pkg.duration}</span>
              </span>
              <span className="font-semibold text-stone-500">
                Availability: {pkg.availability}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
