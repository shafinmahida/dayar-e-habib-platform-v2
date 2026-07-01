"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BookNowButton } from "@/components/layout/BookNowButton";
import { Logo } from "@/components/layout/Logo";
import { NavLinks } from "@/components/layout/NavLinks";
import type { MobileNavProps } from "@/types/navigation";

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const handleNavigate = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-navigation"
        side="right"
        className="flex w-full max-w-xs flex-col p-0 bg-card border-l border-border"
      >
        <SheetHeader className="border-b border-border px-6 py-6 text-left">
          <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Browse Dayar-E-Habib Tours & Travels pages and book a package.
          </SheetDescription>
          <Logo variant="full" className="h-10 w-auto text-foreground" />
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col px-4 py-6"
        >
          <NavLinks
            orientation="vertical"
            linkClassName="px-4 py-3.5 text-sm font-semibold uppercase tracking-widest block"
            onNavigate={handleNavigate}
          />
        </nav>

        <div className="mt-auto border-t border-border p-6 bg-secondary/20">
          <BookNowButton className="w-full h-11" onNavigate={handleNavigate} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
