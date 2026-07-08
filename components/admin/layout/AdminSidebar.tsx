"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [userName, setUserName] = useState("Admin");
  const [userRole, setUserRole] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata) {
        if (user.user_metadata.full_name) setUserName(user.user_metadata.full_name);
        if (user.user_metadata.role) setUserRole(user.user_metadata.role);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin", icon: Compass },
    { name: "Packages", href: "/admin/packages", icon: Layers },
    { name: "Website Builder", href: "/admin/website-builder", icon: LayoutGrid },
    { name: "Global Content", href: "/admin/content", icon: Globe },
    { name: "Media Library", href: "/admin/media", icon: Image },
    { name: "Settings", href: "/admin/settings", icon: Sliders }
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-card border-b border-border shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-widest text-foreground uppercase">
            DAYARE E HABIB
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Control Center
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:sticky flex flex-col justify-between h-screen bg-card border-r border-border transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[88px]" : "w-72"
        } ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Section */}
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Logo / Header */}
          <div className="flex items-center justify-between px-6 py-8 border-b border-border/50">
            {!isCollapsed ? (
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-black tracking-[0.25em] text-foreground uppercase">
                  DAYARE E HABIB
                </span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  Control Center
                </span>
              </div>
            ) : (
              <div className="mx-auto text-sm font-black text-foreground tracking-widest">
                DH
              </div>
            )}
            
            {/* Collapse Trigger (hidden on mobile) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Directory */}
          <nav className="flex-1 p-4 space-y-1.5" aria-label="Sidebar Navigation">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                    isActive
                      ? "bg-foreground text-background shadow-md shadow-foreground/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? "text-background" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {!isCollapsed && <span className="ml-4 tracking-wide">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Panel */}
        <div className="p-5 border-t border-border bg-muted/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted border border-border text-foreground shadow-sm">
                <User className="h-4.5 w-4.5" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-extrabold tracking-tight text-foreground truncate">
                    {userName}
                  </span>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest truncate mt-0.5">
                    {userRole}
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 lg:hidden bg-background/80 backdrop-blur-sm transition-opacity"
        />
      )}
    </>
  );
}
