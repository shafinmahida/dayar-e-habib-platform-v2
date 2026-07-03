"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TimelineStep } from "@/types/cms";
import { cn } from "@/lib/utils";

interface JourneyTimelineProps {
  steps: TimelineStep[];
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} id="timeline-container" className="relative">
      <Section 
        className="bg-background border-t border-border/25 py-24 sm:py-32" 
        id="journey-timeline"
        title="The Pilgrimage Chronicle"
        subtitle="From your initial consultation to your return home, every stage is structured with transparent, meticulous stewardship."
      >
        <Container className="relative mt-8">
          
          {/* Centered Vertical Timeline Line on desktop, Left-aligned on mobile */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1.5px] bg-accent/25 transform lg:-translate-x-1/2 z-0" />

          {/* Timeline steps list */}
          <div className="relative space-y-16 lg:space-y-24 z-10 w-full">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "relative flex flex-col lg:flex-row w-full group transition-all duration-[1000ms] ease-out transform",
                    // Left or Right Alignment on Desktop
                    isEven ? "lg:justify-end" : "lg:justify-start",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Step Container (50% Width on Desktop) */}
                  <div 
                    className={cn(
                      "w-full lg:w-[45%] pl-14 lg:pl-0 relative flex flex-col",
                      // Text alignment matches side
                      isEven ? "lg:text-left lg:pl-10" : "lg:text-right lg:pr-10"
                    )}
                  >
                    {/* Timeline Indicator Box - Serif Luxury Styling */}
                    <div 
                      className={cn(
                        "absolute top-0.5 flex size-11 items-center justify-center rounded-none border border-accent bg-[#FCFAF5] font-serif text-sm font-bold text-accent transition-all duration-500",
                        "group-hover:bg-[#8A6A36] group-hover:text-white shadow-[0_4px_16px_rgba(138,106,54,0.03)] select-none z-20",
                        // Align left on mobile, swap sides on desktop
                        "left-4 lg:left-auto",
                        isEven ? "lg:left-[-22px]" : "lg:right-[-22px]"
                      )}
                    >
                      0{step.stepNumber}
                    </div>

                    {/* Content text */}
                    <div className="space-y-3">
                      <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                        {step.title}
                      </h3>
                      <p className={cn(
                        "text-xs sm:text-sm leading-relaxed text-muted-foreground/90 max-w-lg",
                        !isEven && "lg:ml-auto"
                      )}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </Container>
      </Section>
    </div>
  );
}
