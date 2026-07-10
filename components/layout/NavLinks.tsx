"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS } from "@/lib/config/ui";
import { isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavLinksProps } from "@/types/navigation";

interface ExtendedNavLinksProps extends NavLinksProps {
  categories?: any[];
}

export function NavLinks({
  className,
  linkClassName,
  orientation = "horizontal",
  onNavigate,
  categories = [],
}: ExtendedNavLinksProps) {
  const pathname = usePathname();

  // Create a dynamic version of NAV_LINKS
  const dynamicNavLinks = NAV_LINKS.map(link => {
    if (link.label === "Packages") {
      return {
        ...link,
        children: categories.length > 0 ? categories.map(cat => ({
          label: cat.name,
          href: ["hajj", "umrah", "ziyarat"].includes(cat.slug) ? `/${cat.slug}` : `/tours?category=${cat.slug}`
        })) : link.children
      };
    }
    return link;
  });

  return (
    <ul
      role="list"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-4 lg:gap-8"
          : "flex flex-col gap-2",
        className,
      )}
    >
      {dynamicNavLinks.map((link) => {
        const active = isActiveRoute(pathname, link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "bg-secondary text-foreground font-bold dark:bg-secondary/60 dark:text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40",
                linkClassName,
              )}
            >
              {link.label}
            </Link>
            
            {/* Render children for vertical mobile view */}
            {orientation === "vertical" && link.children && (
              <ul className="ml-4 mt-2 space-y-1 border-l border-border pl-2">
                {link.children.map(child => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className="block px-4 py-2 text-[10px] font-semibold text-muted-foreground hover:text-foreground uppercase tracking-widest"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
