"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Globe } from "lucide-react";

export default function AdminGlobalContentPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Global Content
          </h1>
          <p className="text-xs text-stone-500">
            Manage reusable content like Destinations, FAQs, Testimonials, and Team Members.
          </p>
        </div>
      </div>

      <PlaceholderView
        title="Global Content Database"
        description="This module connects to the Supabase tables to let you manage reusable content that appears across multiple packages and pages."
        actionLabel="Manage Content"
        onAction={() => alert("Global Content UI will be implemented in subsequent tasks.")}
        icon={Globe}
      />
    </div>
  );
}
