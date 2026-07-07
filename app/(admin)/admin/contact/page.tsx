"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Contact2 } from "lucide-react";

export default function AdminContactPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Contact Channels Config
          </h1>
          <p className="text-xs text-stone-500">
            Edit offices coordinates, timings directories, phone lists, and Map links.
          </p>
        </div>
      </div>

      <PlaceholderView
        title="Contact Settings Workspace"
        description="Verify maps short links, update telephone numbers (e.g. +91 7045 707070), and adjust operating timings."
        actionLabel="Configure Timings"
        onAction={() => alert("Contact settings will write to the database in subsequent sprints.")}
        icon={Contact2}
      />
    </div>
  );
}
