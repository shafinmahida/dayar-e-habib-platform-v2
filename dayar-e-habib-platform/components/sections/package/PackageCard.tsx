import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { Package } from "@/types/package";
import { DESTINATIONS_DATA } from "@/constants/destination";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const destinationNames = pkg.destinationSlugs
    .map(slug => DESTINATIONS_DATA.find(d => d.slug === slug)?.name || slug)
    .join(" & ");

  return (
    <div className="flex flex-col rounded-arch-t border border-border bg-card p-8 sm:p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.015)]">
      {/* Luxury Arched Top Panel simulating brochure feel */}
      <div className="space-y-4">
        <div className="text-[9px] font-extrabold tracking-[0.25em] text-accent uppercase flex items-center gap-2">
          <span className="size-1 rounded-full bg-accent" />
          <span>Curated Offering</span>
        </div>
        
        <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground leading-tight">
          {pkg.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-extrabold tracking-widest text-muted-foreground uppercase pt-1">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent/80" />
            <span>{destinationNames}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-accent/80" />
            <span>{pkg.duration}</span>
          </span>
        </div>
      </div>

      <div className="my-8 border-t border-border/60" />

      {/* Highlights List */}
      <ul className="flex-1 space-y-4 text-xs sm:text-sm text-muted-foreground mb-8" role="list">
        {pkg.highlights.slice(0, 4).map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-2 size-1.5 rounded-full bg-accent/80 shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Footer details */}
      <div className="mt-auto pt-6 border-t border-border/60 space-y-4">
        <div className="text-[9px] font-extrabold tracking-widest text-muted-foreground uppercase">
          Status: <span className="text-foreground font-black">{pkg.availability || "Direct Consultation"}</span>
        </div>
        <Link
          href={`/tours/${pkg.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "w-full justify-between font-bold tracking-widest uppercase text-[9px] h-10 px-4 group rounded-xs"
          )}
        >
          <span>View Catalog</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
