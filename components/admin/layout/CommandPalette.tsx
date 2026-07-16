"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Compass, Eye, Tag, FileText, Settings, ShieldAlert, LayoutTemplate, Image as ImageIcon, Box } from "lucide-react";

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
      icon: LayoutTemplate,
      name: "Edit Hero Section",
      category: "Website Builder",
      action: () => { router.push("/admin/website-builder?section=hero"); setIsOpen(false); }
    },
    {
      icon: ImageIcon,
      name: "Edit Gallery Section",
      category: "Website Builder",
      action: () => { router.push("/admin/website-builder?section=gallery"); setIsOpen(false); }
    },
    {
      icon: Box,
      name: "Edit Packages Section",
      category: "Website Builder",
      action: () => { router.push("/admin/website-builder?section=packages"); setIsOpen(false); }
    },
    {
      icon: ShieldAlert,
      name: "Inspect System Logs",
      category: "System",
      action: () => { router.push("/admin/audit"); setIsOpen(false); }
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-background/80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input */}
        <div className="flex items-center px-5 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full py-4 text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder-muted-foreground/70"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-bold text-muted-foreground bg-muted/50 border border-border rounded-md uppercase tracking-widest">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-3 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm font-medium text-muted-foreground">
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
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm rounded-xl transition-all duration-150 ${
                      isSelected
                        ? "bg-foreground text-background shadow-md"
                        : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-background" : "text-muted-foreground"}`} />
                      <span className="font-bold tracking-wide">{cmd.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] uppercase font-extrabold tracking-widest ${isSelected ? "text-background/70" : "text-muted-foreground/60"}`}>
                        {cmd.category}
                      </span>
                      {cmd.shortcut && (
                        <kbd className={`px-2 py-1 text-[9px] font-bold tracking-widest rounded uppercase ${isSelected ? "bg-background/20 text-background border-transparent" : "bg-muted/50 text-muted-foreground border border-border"}`}>
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
        <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-t border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center space-x-5">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>Dayar-E-Habib OS</span>
        </div>
      </div>
    </div>
  );
}
