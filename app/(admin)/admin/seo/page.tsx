"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Globe } from "lucide-react";

export default function AdminSeoPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            SEO & Page Metadata
          </h1>
          <p className="text-xs text-stone-500">
            Configure metadata, page descriptions, site titles, and sitemaps.
          </p>
        </div>
      </div>

      <PlaceholderView
        title="SEO Parameters Workspace"
        description="Dynamic page description optimization, canonical URL setup, and open graph image uploads will be enabled here."
        actionLabel="Configure Metatags"
        onAction={() => alert("SEO updates will write to system settings table in subsequent sprints.")}
        icon={Globe}
      />
    </div>
  );
}
