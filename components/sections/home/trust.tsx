"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TrustPropItem } from "@/types/cms";
import { cn } from "@/lib/utils";

interface TrustProps {
  items: TrustPropItem[];
}

export function Trust({ items }: TrustProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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
    <div ref={sectionRef} id="trust-section" className="relative">
      <Section className="bg-[#1E1A16] text-[#FCFAF5] border-y border-white/5 py-32 overflow-hidden relative" id="trust-heritage">
        {/* Ambient moving light orbs to create luxury mood in dark section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
          <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-[#8A6A36]/20 blur-[140px] animate-[pulse_10s_infinite_alternate]" />
          <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full bg-[#FCFAF5]/5 blur-[140px] animate-[pulse_15s_infinite_alternate-reverse]" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
            
            {/* Left Column: Direct Narrative Essay (Staggered Fade-Up) */}
            <div className="lg:col-span-6 space-y-10">
              <div 
                className={cn(
                  "text-[10px] font-black tracking-[0.3em] text-accent uppercase transition-all duration-1000 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                Stewardship Since 1986
              </div>
              
              <h2 
                className={cn(
                  "font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] max-w-md transition-all duration-1000 delay-200 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                A Covenant of Personal Care.
              </h2>
              
              <div 
                className={cn(
                  "space-y-6 text-[#FCFAF5]/70 text-sm sm:text-base leading-relaxed font-medium max-w-lg transition-all duration-1000 delay-400 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <p>
                  Organizing a pilgrimage is not a business operation; it is a sacred trust. For nearly forty years, the Dayar-E-Habib family has guided pilgrims through Hajj and Umrah with absolute devotion.
                </p>
                <p>
                  We handle the complete logistical landscape—verified premium lodging, direct flights, and visas—so you can devote your full attention to the spiritual rituals. Every group is guided by experienced scholars to ensure rituals are completed with theological accuracy.
                </p>
              </div>

              <div 
                className={cn(
                  "pt-8 border-t border-white/10 max-w-xs transition-all duration-1000 delay-600 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                )}
              >
                <p className="font-serif italic text-base text-[#FCFAF5]/90 hover:text-accent transition-colors duration-300 cursor-default select-none">
                  Mohammed Hussain Bumedia
                </p>
                <p className="text-[9px] font-black tracking-widest text-[#FCFAF5]/50 uppercase mt-1">Founder, Dayar-E-Habib</p>
              </div>
            </div>

            {/* Right Column: Key Legacy Pillars */}
            <div className="lg:col-span-6 space-y-12 lg:pt-4">
              {items.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "space-y-4 border-b border-white/5 pb-8 last:border-0 last:pb-0 group cursor-default transition-all duration-[1200ms] ease-out transform",
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-12",
                  )}
                  style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-xs font-black text-accent/60 tracking-wider group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                      0{idx + 1}
                    </span>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#FCFAF5]/60 pl-8 group-hover:text-[#FCFAF5]/85 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
