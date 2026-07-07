"use client";

import { useEffect, useRef } from "react";
import { X, Bell, Info, Mail, AlertTriangle, CheckCircle2 } from "lucide-react";

interface NotificationItem {
  id: string;
  type: "inquiry" | "info" | "warning" | "success";
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  const notifications: NotificationItem[] = [
    {
      id: "1",
      type: "inquiry",
      title: "New Enquiry Received",
      description: "Abdullah Khan sent a booking inquiry for Deluxe Umrah.",
      time: "10 mins ago",
      unread: true
    },
    {
      id: "2",
      type: "success",
      title: "Connection Verifier Passed",
      description: "Supabase client connected successfully to the API endpoint.",
      time: "2 hours ago",
      unread: false
    },
    {
      id: "3",
      type: "warning",
      title: "Heavy Media Warning",
      description: "Breakfast.mov is 142MB. Consider compressing for optimal mobile delivery.",
      time: "1 day ago",
      unread: false
    },
    {
      id: "4",
      type: "info",
      title: "Preloader Size Set",
      description: "Mobile viewport max-width is set to 85vw.",
      time: "3 days ago",
      unread: false
    }
  ];

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/30 backdrop-blur-[1px]">
      <div
        ref={drawerRef}
        className="w-full max-w-sm h-full bg-white dark:bg-stone-950 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-stone-500" />
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              System Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-stone-400">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <span className="text-xs">No notifications yet</span>
            </div>
          ) : (
            notifications.map((notif) => {
              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-lg border transition-colors ${
                    notif.unread
                      ? "bg-stone-50/80 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800"
                      : "bg-transparent border-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {notif.type === "inquiry" && <Mail className="h-4 w-4 text-blue-500" />}
                      {notif.type === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {notif.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {notif.type === "info" && <Info className="h-4 w-4 text-stone-400" />}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                          {notif.title}
                        </span>
                        <span className="text-[9px] text-stone-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900/20 border-t border-stone-200 dark:border-stone-800 text-center">
          <button className="text-xs font-semibold text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
