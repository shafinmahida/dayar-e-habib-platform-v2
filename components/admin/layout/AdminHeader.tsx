"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "../shared/Breadcrumbs";
import { ThemeToggle } from "../shared/ThemeToggle";
import { NotificationCenter } from "./NotificationCenter";
import { Search, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const updateActivity = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Update general profiles last_login
        await supabase
          .from("profiles")
          .update({ last_login: new Date().toISOString() })
          .eq("id", user.id);

        // 2. Manage admin_session
        let sessionId = sessionStorage.getItem("admin_session_id");
        const nowStr = new Date().toISOString();

        if (!sessionId) {
          // Fetch profile full name
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .single();

          const { data: session, error: sessError } = await supabase
            .from("admin_sessions")
            .insert({
              user_id: user.id,
              email: user.email,
              full_name: profile?.full_name || user.user_metadata?.full_name || "Admin",
              login_at: nowStr,
              last_seen_at: nowStr
            })
            .select("id")
            .single();

          if (session) {
            sessionStorage.setItem("admin_session_id", session.id);
          }
        } else {
          // Update existing session heartbeat
          await supabase
            .from("admin_sessions")
            .update({ last_seen_at: nowStr })
            .eq("id", sessionId);
        }
      } catch (err) {
        console.error("Error updating admin activity", err);
      }
    };

    updateActivity();
    // Update heartbeat every 1 minute for finer accuracy of session length
    const interval = setInterval(updateActivity, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-background/85 backdrop-blur-[4px] border-b border-border/60">
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
