"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_LINKS } from "@/lib/config/ui";
import { isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavLinksProps } from "@/types/navigation";

export function NavLinks({
  className,
  linkClassName,
  orientation = "horizontal",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

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
      {NAV_LINKS.map((link) => {
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
          </li>
        );
      })}
    </ul>
  );
}
