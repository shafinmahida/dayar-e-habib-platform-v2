"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Image } from "lucide-react";

export default function AdminMediaLibraryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Media Library
          </h1>
          <p className="text-xs text-stone-500">
            Manage all images, videos, and documents used across the platform.
          </p>
        </div>
      </div>

      <PlaceholderView
        title="Universal Media Hub"
        description="View and upload compressed media assets to your Supabase Storage buckets."
        actionLabel="Upload Media"
        onAction={() => alert("Media Library UI will be implemented in subsequent tasks.")}
        icon={Image}
      />
    </div>
  );
}
