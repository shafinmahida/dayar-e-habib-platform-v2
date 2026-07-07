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
          <div className="relative space-y-12 lg:space-y-16 z-10 w-full">
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
                  {/* Timeline Ring Station Indicator - Perfect Centered Alignment */}
                  <div 
                    className="absolute left-6 lg:left-1/2 top-10 flex size-5 items-center justify-center rounded-full bg-[#FCFAF5] border border-accent/70 transform -translate-x-1/2 z-20 transition-all duration-500 group-hover:scale-110 group-hover:border-accent"
                    aria-hidden="true"
                  >
                    <span className="size-2 rounded-full bg-accent transition-all duration-500 group-hover:scale-125" />
                  </div>

                  {/* Step Card Container (50% Width on Desktop) */}
                  <div 
                    className={cn(
                      "w-full lg:w-[46%] pl-16 lg:pl-0 relative flex flex-col",
                      // Text alignment matches side
                      isEven ? "lg:text-left lg:pl-10" : "lg:text-right lg:pr-10"
                    )}
                  >
                    {/* Editorial Lift-on-Hover Card */}
                    <div 
                      className={cn(
                        "relative space-y-3 p-8 bg-[#FCFAF5]/40 border border-border/15 backdrop-blur-sm transition-all duration-700 rounded-sm overflow-hidden",
                        "group-hover:bg-[#FCFAF5] group-hover:border-accent/40 group-hover:shadow-[0_20px_40px_rgba(138,106,54,0.035)] group-hover:-translate-y-1",
                        !isEven && "lg:ml-auto"
                      )}
                    >
                      {/* Serif Watermark Number Background */}
                      <div 
                        className={cn(
                          "absolute text-7xl sm:text-8xl font-serif italic text-accent/[0.03] select-none pointer-events-none transition-all duration-[1000ms] ease-out",
                          "right-6 bottom-4 group-hover:text-accent/[0.08] group-hover:scale-105",
                          // Align watermark appropriately based on text layout
                          !isEven ? "left-6 right-auto" : "right-6"
                        )}
                        aria-hidden="true"
                      >
                        0{step.stepNumber}
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 space-y-2.5">
                        <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground/90">
                          {step.description}
                        </p>
                      </div>
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
