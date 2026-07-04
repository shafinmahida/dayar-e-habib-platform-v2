"use client";

import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import type { ItineraryItem } from "@/types/package";

interface PackageItineraryProps {
  itinerary: ItineraryItem[];
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [rotation, setRotation] = useState(90); // default 90deg (pointing down)

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Start tracking when the top of the element crosses the 75% height of screen
      // End tracking when the bottom of the element crosses the 25% height of screen
      const startTrigger = viewportHeight * 0.75;
      const endTrigger = viewportHeight * 0.25;

      const elementTopRelative = rect.top;
      const totalScrollableHeight = elementHeight + (startTrigger - endTrigger);
      const currentScrollProgress = startTrigger - elementTopRelative;

      let pct = currentScrollProgress / totalScrollableHeight;
      pct = Math.max(0, Math.min(1, pct)); // Clamp between 0% and 100%
      setProgress(pct);

      // Determine rotation based on scroll direction
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setRotation(90); // Pointing down (90deg)
      } else if (currentScrollTop < lastScrollTop) {
        setRotation(-90); // Pointing up (-90deg)
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial compute
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="space-y-8 select-none">
      <div 
        ref={containerRef}
        className="relative border-l-2 border-dashed border-border/80 pl-6 ml-4 space-y-10"
      >
        {/* Gold active scroll progress timeline line */}
        <div 
          className="absolute left-[-2px] top-0 w-[2px] bg-accent transition-all duration-300 ease-out" 
          style={{ height: `${progress * 100}%` }}
        />

        {/* Scrolling Golden Airplane indicator */}
        <div 
          className="absolute left-[-11px] flex size-5 items-center justify-center rounded-full bg-[#FCFAF5] border border-accent text-accent shadow-sm transition-all duration-300 ease-out z-30"
          style={{ 
            top: `calc(${progress * 100}% - 10px)`,
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <Plane className="size-3 fill-current rotate-45" />
        </div>

        {itinerary.map((item) => (
          <div key={item.dayNumber} className="relative space-y-2 text-left">
            {/* Dot Indicator */}
            <div className="absolute -left-[33px] top-1.5 flex size-4 items-center justify-center rounded-full bg-background border border-accent">
              <span className="size-1.5 rounded-full bg-accent" />
            </div>

            <div className="text-xs font-bold text-accent tracking-wider uppercase">
              Day {item.dayNumber}
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground tracking-tight">
              {item.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
