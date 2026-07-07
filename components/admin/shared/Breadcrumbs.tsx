"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  // Split path, remove empty strings
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        
        // Format names nicely (e.g. website-builder -> Website Builder)
        const name = segment
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        if (isLast) {
          return (
            <span key={href} className="text-stone-800 font-semibold" aria-current="page">
              {name}
            </span>
          );
        }

        return (
          <div key={href} className="flex items-center space-x-1.5">
            <Link
              href={href}
              className="hover:text-stone-800 transition-colors duration-150"
            >
              {name}
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
          </div>
        );
      })}
    </nav>
  );
}
