"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center bg-card border border-border rounded-2xl max-w-lg mx-auto my-12 shadow-sm">
      <div className="p-3 bg-destructive/10 rounded-full text-destructive mb-4">
        <AlertCircle className="size-6" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-2">
        Dashboard Module Failed to Load
      </h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        An error occurred while fetching or rendering this dashboard panel. You can try reloading this module.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={reset}
          variant="default"
          className="flex items-center gap-2"
        >
          <RotateCcw className="size-4" />
          <span>Reload Module</span>
        </Button>
      </div>
    </div>
  );
}
