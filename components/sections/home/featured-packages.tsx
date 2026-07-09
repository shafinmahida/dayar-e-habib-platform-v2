"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Package } from "@/types/package";
import { DESTINATIONS_DATA } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";

interface FeaturedPackagesProps {
  packages: Package[];
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const activePackages = packages.filter((pkg) => pkg.featured !== false && pkg.active !== false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Custom visual slides arrays for luxury card rotation inside carousel
  const slideshowMap: Record<string, string[]> = {
    "premium-hajj": ["/kaaba-sunset.png", "/hajj-mina.png", "/hajj-arafat.png"],
    "short-hajj": ["/hajj-mina.png", "/hajj-arafat.png", "/kaaba-sunset.png"],
    "deluxe-umrah": ["/pilgrims-tawaf.png", "/hospitality-hotel.png", "/kaaba-sunset.png"],
    "classic-ziyarat": ["/ziyarat-dome.png", "/ziyarat-najaf.png", "/madinah-dawn.png"],
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activePackages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activePackages.length) % activePackages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % activePackages.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + activePackages.length) % activePackages.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePackages.length]);

  // Touch Swipe Navigation handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeThreshold = distance > 30 || distance < -30;
    if (isSwipeThreshold) {
      if (distance > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="relative overflow-hidden bg-secondary/15 border-y border-border/25 py-24 sm:py-32" id="featured-packages">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <header className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="text-[9px] font-black tracking-[0.35em] text-accent uppercase mb-3">
            Estimated Timelines
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Featured Packages
          </h2>
          <p className="mt-5 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground/90 max-w-2xl mx-auto">
            Select custom itineraries curated for your spiritual devotion and absolute comfort. Browse through our estimated Hajj and Umrah programs.
          </p>
        </header>

        {/* Carousel Window */}
        <div 
          className="relative w-full h-[620px] md:h-[500px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {activePackages.map((pkg, idx) => {
              const count = activePackages.length;
              let diff = idx - activeIndex;

              // Handle infinite wrapping calculations
              if (diff < -1) diff += count;
              if (diff > 1) diff -= count;

              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;
              const isHidden = !isActive && !isPrev && !isNext;

              // Map destination names
              const destinationNames = (pkg.destinationSlugs || [])
                .map((slug: string) => DESTINATIONS_DATA.find(d => d.slug === slug)?.name || slug)
                .join(" & ");

              const cardSlides = slideshowMap[pkg.slug] || [pkg.imageUrl || "/kaaba-sunset.png"];

              return (
                <div
                  key={pkg.slug}
                  className={cn(
                    "absolute w-full max-w-[960px] h-[580px] md:h-[440px] transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col md:flex-row bg-[#FCFAF5] border border-border/45 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden rounded-3xl",
                    isActive && "opacity-100 scale-100 z-30 pointer-events-auto blur-0 translate-x-0 shadow-[0_30px_70px_rgba(138,106,54,0.06)] ring-1 ring-accent/15",
                    isPrev && "opacity-35 scale-[0.78] -translate-x-[75%] md:-translate-x-[60%] lg:-translate-x-[50%] z-10 pointer-events-none blur-[3px] select-none",
                    isNext && "opacity-35 scale-[0.78] translate-x-[75%] md:translate-x-[60%] lg:translate-x-[50%] z-10 pointer-events-none blur-[3px] select-none",
                    isHidden && "opacity-0 scale-[0.6] z-0 pointer-events-none blur-[8px] translate-x-0"
                  )}
                >
                  {/* Left Column: Visual Photo slideshow Portal (60% width on Desktop) */}
                  <div className="relative w-full h-[220px] md:h-full md:w-3/5 overflow-hidden border-b md:border-b-0 md:border-r border-border/20 bg-muted shrink-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
                    
                    {/* Slideshow inside card */}
                    <Slideshow images={cardSlides} isActive={isActive} pkgTitle={pkg.title} />

                    {/* Availability Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-[#FCFAF5]/95 border border-border/50 px-3 py-1.5 text-[8px] font-black tracking-widest text-foreground uppercase shadow-sm">
                      {pkg.availability || "Direct Booking"}
                    </div>
                  </div>

                  {/* Right Column: Editorial Brochure details */}
                  <div className="flex-1 flex flex-col p-6 md:p-8 justify-between text-left h-full">
                    <div className="space-y-4">
                      <div className="text-[8px] font-black tracking-[0.3em] text-accent uppercase flex items-center gap-2">
                        <span className="size-1 rounded-full bg-accent" />
                        <span>Guaranteed Legacy Journey</span>
                      </div>
                      
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-foreground leading-tight">
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

                      <div className="border-t border-border/20 my-4" />

                      {/* Highlights */}
                      <ul className="space-y-2.5 text-xs text-muted-foreground/95" role="list">
                        {(pkg.highlights || []).slice(0, 4).map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start gap-2.5">
                            <span className="mt-1.5 size-1 rounded-full bg-accent/60 shrink-0" aria-hidden="true" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6 mt-auto">
                      <Link
                        href={`/tours/${pkg.slug}`}
                        className={cn(
                          "w-full inline-flex items-center justify-between border border-border bg-transparent hover:bg-accent hover:text-[#FCFAF5] hover:border-accent transition-all duration-300 font-black tracking-[0.25em] uppercase text-[9px] h-11 px-5 rounded-none"
                        )}
                      >
                        <span>Explore Itinerary</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows (Positioned centered beside active card - hidden on mobile/tablet) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Package"
            className="hidden md:flex absolute left-4 z-40 size-12 items-center justify-center border border-border bg-[#FCFAF5]/90 text-foreground hover:bg-accent hover:text-white hover:border-accent active:scale-95 transition-all duration-300 rounded-full shadow-md backdrop-blur-xs focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Package"
            className="hidden md:flex absolute right-4 z-40 size-12 items-center justify-center border border-border bg-[#FCFAF5]/90 text-foreground hover:bg-accent hover:text-white hover:border-accent active:scale-95 transition-all duration-300 rounded-full shadow-md backdrop-blur-xs focus-visible:outline-none"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Small Navigation Dots (Tablet & Mobile only) */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {activePackages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-1.5 transition-all duration-300 rounded-none",
                idx === activeIndex ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Inner Slideshow helper component to cycle through images smoothly
function Slideshow({ images, isActive, pkgTitle }: { images: string[]; isActive: boolean; pkgTitle: string }) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!isActive || images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isActive, images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`${pkgTitle} Visual Slide ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className={cn(
            "object-cover absolute inset-0 transition-all duration-[1200ms] ease-in-out",
            idx === slideIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          )}
          priority={idx === 0 && isActive}
        />
      ))}
    </div>
  );
}
