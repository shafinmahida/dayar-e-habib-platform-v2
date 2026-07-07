"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Compass, Eye, Tag, FileText, Settings, ShieldAlert, Sparkles } from "lucide-react";

interface CommandItem {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      icon: Compass,
      name: "Go to Dashboard",
      category: "Navigation",
      shortcut: "G D",
      action: () => { router.push("/admin"); setIsOpen(false); }
    },
    {
      icon: Eye,
      name: "Go to Website Builder",
      category: "Navigation",
      shortcut: "G W",
      action: () => { router.push("/admin/website-builder"); setIsOpen(false); }
    },
    {
      icon: Tag,
      name: "Manage Packages & Tours",
      category: "Management",
      shortcut: "G P",
      action: () => { router.push("/admin/packages"); setIsOpen(false); }
    },
    {
      icon: FileText,
      name: "View Enquiries & Leads",
      category: "Management",
      shortcut: "G E",
      action: () => { router.push("/admin/enquiries"); setIsOpen(false); }
    },
    {
      icon: Settings,
      name: "Configure Site Settings",
      category: "System",
      shortcut: "G S",
      action: () => { router.push("/admin/settings"); setIsOpen(false); }
    },
    {
      icon: Sparkles,
      name: "Search Hero Section Editor",
      category: "Quick Action",
      action: () => { router.push("/admin/website-builder?section=hero"); setIsOpen(false); }
    },
    {
      icon: ShieldAlert,
      name: "Inspect System Logs & Errors",
      category: "System",
      action: () => { alert("Diagnostics log overview is empty."); setIsOpen(false); }
    }
  ];

  // Filter commands by search query
  const filtered = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-stone-900/40 backdrop-blur-[2px]">
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-stone-200 dark:border-stone-800">
          <Search className="h-4 w-4 text-stone-400 dark:text-stone-600 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full py-3.5 text-sm bg-transparent border-0 focus:outline-none focus:ring-0 text-stone-900 dark:text-stone-100 placeholder-stone-400"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-stone-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[320px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-stone-400">
              No results found for &ldquo;{search}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((cmd, index) => {
                const Icon = cmd.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={cmd.name}
                    onClick={cmd.action}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-sm rounded-lg transition-colors duration-100 ${
                      isSelected
                        ? "bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 ${isSelected ? "text-stone-900 dark:text-stone-100" : "text-stone-400"}`} />
                      <span>{cmd.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400">
                        {cmd.category}
                      </span>
                      {cmd.shortcut && (
                        <kbd className="px-1.5 py-0.5 text-[9px] bg-stone-200/50 dark:bg-stone-800 border border-stone-300/30 dark:border-stone-700 rounded text-stone-500">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-stone-50 dark:bg-stone-900/30 border-t border-stone-200 dark:border-stone-800 text-[10px] text-stone-400">
          <div className="flex items-center space-x-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Dayar-E-Habib Control Center</span>
        </div>
      </div>
    </div>
  );
}
