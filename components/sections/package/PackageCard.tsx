"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { Package } from "@/types/package";
import { DESTINATIONS_DATA } from "@/lib/data/destinations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const destinationNames = (pkg.destinationSlugs || [])
    .map((slug: string) => DESTINATIONS_DATA.find(d => d.slug === slug)?.name || slug)
    .join(" & ");

  // Custom visual slides arrays for luxury rotation
  const slideshowMap: Record<string, string[]> = {
    "premium-hajj": ["/kaaba-sunset.png", "/hajj-mina.png", "/hajj-arafat.png"],
    "deluxe-umrah": ["/pilgrims-tawaf.png", "/hospitality-hotel.png", "/kaaba-sunset.png"],
    "classic-ziyarat": ["/ziyarat-dome.png", "/ziyarat-najaf.png", "/madinah-dawn.png"],
  };

  // Support multiple images separated by commas from the new admin media editor
  // We use `any` casting since Supabase raw row returns snake_case but types might be camelCase
  const rawPkg = pkg as any;
  let defaultSlides = ["/kaaba-sunset.png"];
  let videoSlides: string[] = [];

  if (rawPkg.image_url) {
    defaultSlides = rawPkg.image_url.split(',').filter(Boolean);
  } else if (rawPkg.imageUrl) {
    defaultSlides = rawPkg.imageUrl.split(',').filter(Boolean);
  }

  if (rawPkg.video_url) {
    videoSlides = rawPkg.video_url.split(',').filter(Boolean);
  } else if (rawPkg.videoUrl) {
    videoSlides = rawPkg.videoUrl.split(',').filter(Boolean);
  }

  const slides = slideshowMap[pkg.slug] || defaultSlides;
  const totalMedia = slides.length + videoSlides.length;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (totalMedia <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalMedia);
    }, 4500);
    return () => clearInterval(timer);
  }, [totalMedia]);

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-col rounded-3xl border border-border bg-card p-4 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.025)] group">
      {/* Luxury Rectangular Gallery Window with Double Borders */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-card p-2.5 transition-all duration-500 hover:border-accent/40">
        <div className="relative w-full h-full overflow-hidden border border-border/30 rounded-xl bg-black">
          {/* Color filter tint */}
          <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
          
          {/* Render Videos */}
          {videoSlides.map((url, idx) => {
            const yId = getYoutubeId(url);
            return (
              <div
                key={`vid-${idx}`}
                className={cn(
                  "absolute inset-0 transition-all duration-[1200ms] ease-in-out",
                  idx === activeSlide ? "opacity-100 scale-100 z-0" : "opacity-0 scale-95 -z-10"
                )}
              >
                {yId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${yId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${yId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full object-cover rounded-sm pointer-events-none"
                  ></iframe>
                ) : (
                  <video src={url} autoPlay muted loop playsInline className="w-full h-full object-cover rounded-sm pointer-events-none" />
                )}
              </div>
            );
          })}

          {/* Render Images */}
          {slides.map((slide, idx) => {
            const globalIdx = videoSlides.length + idx;
            return (
              <Image
                key={slide}
                src={slide}
                alt={`${pkg.title} - View ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={cn(
                  "object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-104 absolute inset-0",
                  globalIdx === activeSlide ? "opacity-100 scale-100 z-0" : "opacity-0 scale-95 -z-10"
                )}
                priority={globalIdx === 0}
              />
            );
          })}
          
          {/* Availability Badge */}
          <div className="absolute top-4 right-4 z-20 bg-[#FCFAF5] border border-border/50 px-3 py-1 text-[8px] font-black tracking-widest text-foreground uppercase select-none shadow-sm">
            {pkg.availability || "Direct Booking"}
          </div>
        </div>
      </div>

      {/* Brochure Content */}
      <div className="flex-1 flex flex-col p-6 sm:p-8">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="text-[8px] font-black tracking-[0.3em] text-accent uppercase flex items-center gap-2 mt-1">
              <span className="size-1 rounded-full bg-accent" />
              <span>{rawPkg.package_categories?.name || "Premium Journey"}</span>
            </div>
            
            {pkg.priceMin && (
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase mb-0.5">From</span>
                <span className="font-heading text-lg font-black text-accent leading-none">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: pkg.priceCurrency || 'INR',
                    maximumFractionDigits: 0
                  }).format(pkg.priceMin)}
                </span>
              </div>
            )}
          </div>
          
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors duration-300 pr-2">
            {(() => {
              const match = pkg.title.match(/^(.*?)\s*(\(\s*\d+\+?\s*Days\s*\))$/i);
              if (match) {
                const daysText = match[2].replace(/\s+/g, "");
                return (
                  <>
                    <span className="text-foreground">{match[1]}</span>
                    <span className="text-[#D4AF37] ml-1.5 text-[0.55em] font-extrabold tracking-wide whitespace-nowrap inline-block align-middle font-sans uppercase">
                      {daysText}
                    </span>
                  </>
                );
              }
              return pkg.title;
            })()}
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
          {(pkg.highlights || []).slice(0, 4).map((highlight: string, index: number) => (
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
