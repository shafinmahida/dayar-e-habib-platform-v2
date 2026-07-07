"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Compass,
  LayoutGrid,
  Layers,
  Image,
  Globe,
  Contact2,
  Mail,
  Sliders,
  Users2,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin", icon: Compass },
    { name: "Website Builder", href: "/admin/website-builder", icon: LayoutGrid },
    { name: "Packages", href: "/admin/packages", icon: Layers },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "SEO", href: "/admin/seo", icon: Globe },
    { name: "Contact", href: "/admin/contact", icon: Contact2 },
    { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: Sliders },
    { name: "Users", href: "/admin/users", icon: Users2 }
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#FCFAF5] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-850">
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase">
            DAYARE E HABIB
          </span>
          <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-widest">
            Control Center
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-400"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:sticky flex flex-col justify-between h-screen bg-[#FCFAF5] dark:bg-stone-950 border-r border-stone-200/80 dark:border-stone-900/60 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Section */}
        <div>
          {/* Logo / Header */}
          <div className="flex items-center justify-between px-5 py-6 border-b border-stone-100 dark:border-stone-900">
            {!isCollapsed ? (
              <div className="flex flex-col">
                <span className="text-xs font-extrabold tracking-[0.2em] text-stone-900 dark:text-stone-100 uppercase">
                  DAYARE E HABIB
                </span>
                <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-[0.15em] mt-0.5">
                  Control Center
                </span>
              </div>
            ) : (
              <div className="mx-auto text-xs font-black text-stone-800 dark:text-stone-200">
                DH
              </div>
            )}
            
            {/* Collapse Trigger (hidden on mobile) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-400 hover:text-stone-600 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Directory */}
          <nav className="p-3.5 space-y-1" aria-label="Sidebar Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm"
                      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-900/30"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Panel */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-900 bg-stone-50/50 dark:bg-stone-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                <User className="h-4 w-4" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate">
                    Shafin Mahida
                  </span>
                  <span className="text-[10px] text-stone-400 truncate">
                    Owner
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-400 hover:text-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 lg:hidden bg-stone-900/30 backdrop-blur-[1px]"
        />
      )}
    </>
  );
}
