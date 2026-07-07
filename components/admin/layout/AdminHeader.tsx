"use client";

import { useState } from "react";
import { Breadcrumbs } from "../shared/Breadcrumbs";
import { ThemeToggle } from "../shared/ThemeToggle";
import { NotificationCenter } from "./NotificationCenter";
import { Search, Bell } from "lucide-react";

export function AdminHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FCFAF5]/85 dark:bg-stone-950/85 backdrop-blur-[4px] border-b border-stone-200/80 dark:border-stone-900/60">
      {/* Left side: Breadcrumb path tracking */}
      <Breadcrumbs />

      {/* Right side: Global Search, Theme Switcher, and Notifications */}
      <div className="flex items-center space-x-3">
        {/* Mock Search Trigger representing Cmd+K shortcut */}
        <button
          onClick={() => {
            // Dispatch a mock Ctrl+K event to activate Command Palette
            const event = new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
              bubbles: true
            });
            window.dispatchEvent(event);
          }}
          className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 dark:border-stone-850 dark:hover:bg-stone-900 text-stone-400 text-[10px] font-semibold transition-all duration-150"
          aria-label="Open search command palette"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-block px-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded text-[9px]">
            Ctrl K
          </kbd>
        </button>

        {/* Theme Toggler */}
        <ThemeToggle />

        {/* Notifications Drawer Toggler */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-800 transition-colors dark:border-stone-800 dark:hover:bg-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Notifications Slider Center Drawer */}
        <NotificationCenter
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />
      </div>
    </header>
  );
}
