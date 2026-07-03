import type { Metadata } from "next";

import {
  AnnouncementBar,
  Footer,
  Navbar,
} from "@/components/layout";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import { fontBody, fontHeading, fontSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        fontBody.variable,
        fontHeading.variable,
        fontSerif.variable,
      )}
    >
      <body className="flex min-h-full flex-col font-sans">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
