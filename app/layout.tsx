import type { Metadata } from "next";

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
      <body className="flex min-h-full flex-col font-sans bg-[#F2EBDB]">
        {children}
      </body>
    </html>
  );
}
