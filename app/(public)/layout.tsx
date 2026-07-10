import { AnnouncementBar, Footer, Navbar } from "@/components/layout";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BrandPreloader } from "@/components/layout/BrandPreloader";
import { createClient } from "@/lib/supabase/server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const [{ data: settings }, { data: categories }] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('package_categories').select('*').order('display_order', { ascending: true })
  ]);
  
  const announcementText = settings?.announcement_text || "Bookings for Hajj 2026 are now open.";
  const announcementEnabled = settings?.announcement_enabled ?? true;

  return (
    <>
      <BrandPreloader />
      <AnnouncementBar text={announcementText} enabled={announcementEnabled} />
      <Navbar categories={categories || []} />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
