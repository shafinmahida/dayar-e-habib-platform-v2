"use client";

import { PlaceholderView } from "@/components/admin/shared/PlaceholderView";
import { Image } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Media Archive Storage
          </h1>
          <p className="text-xs text-stone-500">
            Organize pilgrimage journey videos and photos.
          </p>
        </div>
      </div>

      {/* Main empty state workspace */}
      <PlaceholderView
        title="No media has been added yet"
        description="Your media gallery is empty. Upload journey files (images or .mp4 clips) to populate the frontend slideshow grids."
        actionLabel="Upload Media"
        onAction={() => alert("Media uploads require Supabase storage bucket initialization in SPRINT 2.")}
        icon={Image}
      />
    </div>
  );
}
