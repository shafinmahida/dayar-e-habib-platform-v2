"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  // Custom visual slides arrays for luxury rotation
  const slideshowMap: Record<string, string[]> = {
    "premium-hajj": ["/kaaba-sunset.png", "/hajj-mina.png", "/hajj-arafat.png"],
    "deluxe-umrah": ["/pilgrims-tawaf.png", "/hospitality-hotel.png", "/kaaba-sunset.png"],
    "classic-ziyarat": ["/ziyarat-dome.png", "/ziyarat-najaf.png", "/madinah-dawn.png"],
  };

  const slides = slideshowMap[pkg.slug] || [pkg.imageUrl || "/kaaba-sunset.png"];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col rounded-none border border-border bg-card p-4 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.025)] group">
      {/* Luxury Rectangular Gallery Window with Double Borders */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border bg-card p-2.5 transition-all duration-500 hover:border-accent/40">
        <div className="relative w-full h-full overflow-hidden border border-border/30 rounded-none bg-muted">
          {/* Color filter tint */}
          <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
          
          {slides.map((slide, idx) => (
            <Image
              key={slide}
              src={slide}
              alt={`${pkg.title} - View ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={cn(
                "object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-104 absolute inset-0",
                idx === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              priority={idx === 0}
            />
          ))}
          
          {/* Availability Badge - Now 100% visible inside the rectangular box layout */}
          <div className="absolute top-4 right-4 z-20 bg-[#FCFAF5] border border-border/50 px-3 py-1 text-[8px] font-black tracking-widest text-foreground uppercase select-none">
            {pkg.availability || "Direct Booking"}
          </div>
        </div>
      </div>

      {/* Brochure Content */}
      <div className="flex-1 flex flex-col p-6 sm:p-8">
        <div className="space-y-4">
          <div className="text-[8px] font-black tracking-[0.3em] text-accent uppercase flex items-center gap-2">
            <span className="size-1 rounded-full bg-accent" />
            <span>Guaranteed Legacy Journey</span>
          </div>
          
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
            {pkg.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-bold tracking-widest text-muted-foreground uppercase pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3 text-accent" />
              <span>{destinationNames}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3 text-accent" />
              <span>{pkg.duration}</span>
            </span>
          </div>
        </div>

        <div className="my-6 border-t border-border/30" />

        {/* Highlights List */}
        <ul className="flex-1 space-y-3.5 text-xs sm:text-sm text-muted-foreground/90 mb-6" role="list">
          {pkg.highlights.slice(0, 4).map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="mt-auto pt-6 border-t border-border/30">
          <Link
            href={`/tours/${pkg.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "w-full justify-between font-black tracking-[0.25em] uppercase text-[9px] h-11 px-5 group rounded-none border-border bg-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
            )}
          >
            <span>Explore Itinerary</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
