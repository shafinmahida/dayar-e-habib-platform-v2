import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { CommandPalette } from "@/components/admin/layout/CommandPalette";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/20">
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
