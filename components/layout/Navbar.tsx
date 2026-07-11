"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ROUTES } from "@/lib/config/ui";
import { isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SCROLL_THRESHOLD = 20;

export function Navbar({ categories = [] }: { categories?: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasPreloaded, setHasPreloaded] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setHasPreloaded(false);
    }, 0);

    const timer = setTimeout(() => {
      setHasPreloaded(true);
    }, 1500);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(timer);
    };
  }, []);

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

  const rightLinks = [
    // Destinations section completely removed per architectural decision
    { label: "Gallery", href: ROUTES.GALLERY },
    { label: "About", href: ROUTES.ABOUT },
    { label: "Contact", href: ROUTES.CONTACT },
  ];

  const renderLink = (link: { label: string; href: string }) => {
    const active = isActiveRoute(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          "text-[10px] font-extrabold uppercase tracking-[0.35em] transition-all duration-300 relative py-2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          active
            ? "text-accent font-black"
            : "text-muted-foreground hover:text-foreground",
          "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-accent after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
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
          "sticky top-0 z-40 w-full border-b border-transparent bg-transparent transition-all duration-500",
          scrolled && "border-border/30 bg-background/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.015)]"
        )}
      >
        <Container>
          <nav
            aria-label="Main navigation"
            className={cn(
              "flex items-center justify-between transition-all duration-500 relative",
              scrolled ? "h-20" : "h-24 lg:h-28"
            )}
          >
            {/* Left Side: Brand Logo (Appears strong and prominent on the leftmost margin) */}
            <div className="flex items-center justify-start shrink-0">
              <Link
                href={ROUTES.HOME}
                className={cn(
                  "focus-visible:outline-none shrink-0 block py-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-[1000ms]",
                  hasPreloaded ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
                aria-label="Dayar-E-Habib Home"
              >
                {/* Visual Anchor Logo scaled up for premium presence */}
                <Logo 
                  variant="full" 
                  className={cn(
                    "w-auto text-foreground transition-all duration-500",
                    scrolled ? "h-12 sm:h-12 md:h-13 lg:h-15" : "h-16 sm:h-16 md:h-19 lg:h-23"
                  )} 
                />
              </Link>
            </div>

            {/* Right Side: Desktop Nav (4 tabs only: Packages dropdown, Gallery, About, Contact) */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-14 justify-end flex-1">
              
              {/* Packages Dropdown Trigger */}
              <div 
                className="relative py-2 group cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "text-[10px] font-extrabold uppercase tracking-[0.35em] transition-all duration-300 flex items-center gap-1.5 focus-visible:outline-none",
                    dropdownOpen || pathname.includes("/tours") || categories?.some((c: any) => pathname.includes(`/${c.slug}`))
                      ? "text-accent font-black"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>Packages</span>
                  <ChevronDown className={cn("size-3 transition-transform duration-300", dropdownOpen && "rotate-180")} />
                </button>
                
                {/* Dropdown Menu Panel (Luxury styling, floating below) */}
                <div 
                  className={cn(
                    "absolute right-0 top-full mt-2 w-52 bg-[#FCFAF5] border border-border/80 shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-3 px-1.5 z-50 transition-all duration-300 rounded-none origin-top-right",
                    dropdownOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
                  )}
                >
                  {categories && categories.length > 0 ? (
                    categories.map((cat: any) => {
                      // For legacy pages (hajj, umrah, ziyarat) link directly to them if they exist, otherwise link to filtered tours page
                      const isLegacy = ["hajj", "umrah", "ziyarat"].includes(cat.slug);
                      const href = isLegacy ? `/${cat.slug}` : `/tours?category=${cat.slug}`;
                      return (
                        <Link 
                          key={cat.id}
                          href={href}
                          className="block px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-foreground hover:bg-secondary/40 hover:text-accent transition-colors duration-200"
                        >
                          {cat.name}
                        </Link>
                      );
                    })
                  ) : (
                    <div className="px-4 py-2 text-[9px] text-muted-foreground uppercase tracking-widest">No Categories Found</div>
                  )}
                  <Link 
                    href="/tours"
                    className="block px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-accent/80 hover:bg-secondary/40 hover:text-accent transition-colors duration-200 border-t border-border mt-1 pt-3"
                  >
                    View All Packages
                  </Link>
                </div>
              </div>

              {rightLinks.map(renderLink)}
            </div>

            {/* Responsive Mobile controls */}
            <div className="flex lg:hidden items-center justify-end flex-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="hover:bg-transparent"
              >
                <Menu aria-hidden="true" className="size-6 text-foreground" />
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
