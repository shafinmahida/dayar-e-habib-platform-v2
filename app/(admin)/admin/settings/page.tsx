"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Sliders } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Control Center Settings
          </h1>
          <p className="text-xs text-stone-500">
            Configure system configurations, third-party integrations, and API keys.
          </p>
        </div>
      </div>

      <PlaceholderView
        title="Settings Workspace"
        description="Verify Web3Forms integration keys, toggle floating WhatsApp contact advisor widget parameters, and manage developer keys."
        actionLabel="Verify API Gateway"
        onAction={() => alert("Settings values will write to the database in subsequent sprints.")}
        icon={Sliders}
      />
    </div>
  );
}
