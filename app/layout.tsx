import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { fontBody, fontHeading, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('site_name, site_description').single();
  return {
    title: data?.site_name || "Dayar-E-Habib Tours",
    description: data?.site_description || "Premium Hajj & Umrah Packages",
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
      )}
    >
      <body className="flex min-h-full flex-col font-sans bg-[#F2EBDB]">
        {children}
      </body>
    </html>
  );
}
