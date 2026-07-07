import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { CommandPalette } from "@/components/admin/layout/CommandPalette";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-stone-50 dark:bg-stone-900/10 text-stone-900 dark:text-stone-100">
      {/* Responsive navigation sidebar */}
      <AdminSidebar />

      {/* Main admin cockpit panel content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top administration navbar */}
        <AdminHeader />

        {/* Dynamic page contents routing wrapper */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global searchable shortcut command palette listener */}
      <CommandPalette />
    </div>
  );
}
