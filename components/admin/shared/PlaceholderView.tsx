"use client";

import { useState } from "react";
import { Info, AlertCircle, RefreshCw } from "lucide-react";

interface PlaceholderViewProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export function PlaceholderView({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Info
}: PlaceholderViewProps) {
  const [viewState, setViewState] = useState<"content" | "loading" | "error">("content");

  const triggerMockReload = () => {
    setViewState("loading");
    setTimeout(() => {
      // 20% chance to error out, just to display mock error handling state
      if (Math.random() < 0.2) {
        setViewState("error");
      } else {
        setViewState("content");
      }
    }, 1200);
  };

  if (viewState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-in fade-in duration-200">
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 border-2 border-stone-200 border-t-stone-850 dark:border-stone-800 dark:border-t-stone-200 rounded-full animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-xs font-semibold text-stone-800 dark:text-stone-200">Loading Module Data</h3>
          <p className="text-[10px] text-stone-400">Verifying backend communication...</p>
        </div>
      </div>
    );
  }

  if (viewState === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-red-150 bg-red-50/10 dark:border-red-900/30 rounded-xl space-y-4 max-w-md mx-auto text-center animate-in zoom-in-95 duration-150">
        <div className="p-2.5 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-full">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
            Communication Failure
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            A network error occurred while querying the dynamic tables. The server role credentials failed to resolve.
          </p>
        </div>
        <button
          onClick={() => setViewState("content")}
          className="flex items-center space-x-2 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Retry Handshake</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-950/20 max-w-2xl mx-auto text-center space-y-5 shadow-sm animate-in fade-in duration-200">
      {/* Decorative Brand Accent Circle */}
      <div className="p-4 bg-stone-50 dark:bg-stone-900/50 text-stone-450 dark:text-stone-650 rounded-full">
        <Icon className="h-8 w-8" />
      </div>

      {/* Typography Description */}
      <div className="max-w-md space-y-1.5">
        <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
          {title}
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Control Actions Row */}
      <div className="flex items-center space-x-3">
        {actionLabel && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-850 dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-950 text-white text-xs font-semibold rounded-lg transition-all duration-150 shadow-sm"
          >
            {actionLabel}
          </button>
        )}
        <button
          onClick={triggerMockReload}
          className="px-4 py-2 border border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-400 text-xs font-semibold rounded-lg transition-all duration-150"
        >
          Refresh State
        </button>
      </div>
    </div>
  );
}
