"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ROUTES } from "@/constants/navigation";
import { isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SCROLL_THRESHOLD = 15;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const leftLinks = [
    { label: "Hajj", href: ROUTES.hajj },
    { label: "Umrah", href: ROUTES.umrah },
    { label: "Tours", href: ROUTES.tours },
  ];

  const rightLinks = [
    { label: "Gallery", href: ROUTES.gallery },
    { label: "About", href: ROUTES.about },
    { label: "Contact", href: ROUTES.contact },
  ];

  const renderLink = (link: { label: string; href: string }) => {
    const active = isActiveRoute(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "text-[9px] font-extrabold uppercase tracking-[0.3em] transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          active
            ? "text-accent font-black"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-transparent bg-transparent transition-all duration-300",
          scrolled && "border-border bg-background/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.01)]"
        )}
      >
        <Container>
          <nav
            aria-label="Main navigation"
            className={cn(
              "flex items-center justify-between transition-all duration-300 relative",
              scrolled ? "h-20 lg:h-24" : "h-24 lg:h-36"
            )}
          >
            {/* Left Wing (Desktop) */}
            <div className="hidden lg:flex items-center gap-12 w-1/3 justify-start">
              {leftLinks.map(renderLink)}
            </div>

            {/* Central Visual Anchor Brand Logo */}
            <div className="flex items-center justify-center lg:w-1/3 shrink-0">
              <Link
                href={ROUTES.home}
                className="rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background shrink-0 block"
                aria-label="Dayar-E-Habib home"
              >
                {/* Visual Anchor Logo sizing structured to prevent horizontal shifts and overlap */}
                <Logo variant="full" className="hidden sm:block h-10 md:h-12 lg:h-14 w-auto text-foreground transition-all duration-300" />
                <Logo variant="mark" className="block sm:hidden h-10 w-auto text-foreground" />
              </Link>
            </div>

            {/* Right Wing (Desktop) */}
            <div className="hidden lg:flex items-center gap-12 w-1/3 justify-end">
              {rightLinks.map(renderLink)}
              <Link
                href={ROUTES.contact}
                className={cn(
                  "ml-4 inline-flex items-center justify-center rounded-xs bg-primary text-primary-foreground",
                  "text-[8px] font-black uppercase tracking-[0.25em] h-8 px-6",
                  "hover:bg-primary/95 transition-all duration-200"
                )}
              >
                Book
              </Link>
            </div>

            {/* Responsive Mobile controls (Balanced visual margins) */}
            <div className="flex lg:hidden items-center justify-between w-full sm:w-auto gap-4">
              <div className="sm:hidden w-8" />
              
              <div className="flex items-center gap-3">
                <Link
                  href={ROUTES.contact}
                  className={cn(
                    "inline-flex items-center justify-center rounded-xs bg-primary text-primary-foreground",
                    "text-[8px] font-black uppercase tracking-[0.2em] h-8 px-4 sm:hidden"
                  )}
                >
                  Book
                </Link>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation"
                >
                  <Menu aria-hidden="true" className="size-5 text-foreground" />
                </Button>
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
