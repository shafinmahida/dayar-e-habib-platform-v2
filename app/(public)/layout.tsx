import { AnnouncementBar, Footer, Navbar } from "@/components/layout";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BrandPreloader } from "@/components/layout/BrandPreloader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BrandPreloader />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
