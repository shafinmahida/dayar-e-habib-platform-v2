import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { fontBody, fontHeading, fontSerif, fontHandwritten } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('site_name, site_description').single();

  const siteName = data?.site_name || "Dayar-E-Habib Tours";
  const siteDescription = data?.site_description || "Premium Hajj & Umrah Packages — Trusted since 1986";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dayarehabib.com'),
    openGraph: {
      title: siteName,
      description: siteDescription,
      siteName,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full antialiased",
        fontBody.variable,
        fontHeading.variable,
        fontSerif.variable,
        fontHandwritten.variable,
      )}
    >
      <body className="flex min-h-full flex-col font-sans bg-[#F2EBDB]">
        {children}
      </body>
    </html>
  );
}
