"use client";

import { useState, useRef, useEffect } from "react";
import { PlayCircle, MapPin, ChevronRight, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { cn } from "@/lib/utils";

export interface HolyPlace {
  title: string;
  description?: string;
  videoUrl: string;
}

export interface EnlightenmentData {
  visible?: boolean;
  overline?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  holyPlaces: HolyPlace[];
}

interface EnlightenmentClientProps {
  data: EnlightenmentData;
}

const DEFAULT_DATA: EnlightenmentData = {
  visible: true,
  overline: "Spiritual Heritage",
  sectionTitle: "Enlightenment to Holy Places",
  sectionSubtitle: "Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam.",
  holyPlaces: [
    {
      title: "Masjid Al-Haram",
      description: "The Great Mosque of Makkah, home to the Holy Kaaba.",
      videoUrl: "/kaaba-sunset.png"
    },
    {
      title: "Al-Masjid an-Nabawi",
      description: "The Prophet's Mosque in Madinah, a place of peace.",
      videoUrl: "/madinah-dawn.png"
    }
  ]
};

export function EnlightenmentClient({ data = DEFAULT_DATA }: EnlightenmentClientProps) {
  const finalData = data?.holyPlaces?.length ? data : DEFAULT_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const activePlace = finalData.holyPlaces[activeIndex] || finalData.holyPlaces[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Unmount when less than 10% visible
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  if (finalData.visible === false) return null;

  return (
    <Section
      className="bg-[#1E1A16] border-t border-border/10 py-20 lg:py-32 overflow-hidden relative"
      id="enlightenment"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#8A6A36]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <Container className="relative z-10">
        <div className="mb-12 md:mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8A6A36]/30 bg-[#8A6A36]/10 px-4 py-1.5 text-[9px] font-black tracking-widest text-[#D4AF37] uppercase select-none">
            <Sparkles className="size-3" />
            <span>{finalData.overline || "Spiritual Heritage"}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FCFAF5]">
            {finalData.sectionTitle || "Enlightenment to Holy Places"}
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed text-[#FCFAF5]/60 font-medium">
            {finalData.sectionSubtitle || "Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam."}
          </p>
        </div>

        <div ref={observerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: 70% Featured Video Player */}
          <div className="lg:col-span-8 w-full flex flex-col">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_60px_rgba(138,106,54,0.1)] border border-[#8A6A36]/20">
              {isVisible ? (
                <SmartMediaPlayer 
                  key={`media-${activeIndex}`} // Changing key forces remount, killing previous audio instantly
                  url={activePlace.videoUrl || "/kaaba-sunset.png"} 
                  type="video" 
                  className="w-full h-full object-cover rounded-none border-0" 
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  {/* Paused/Unmounted State when scrolled out of view */}
                </div>
              )}
              
              {/* Simple Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20">
                <h3 className="font-heading text-2xl md:text-3xl font-black text-white drop-shadow-lg tracking-tight">
                  {activePlace.title}
                </h3>
              </div>
            </div>
            
            {/* Description outside video */}
            {activePlace.description && (
              <div className="mt-6 px-4">
                <p className="text-base text-white/80 leading-relaxed font-medium">
                  {activePlace.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: 30% Sleek Scrolling List */}
          <div className="lg:col-span-4 w-full flex flex-col h-full max-h-[500px]">
            <h3 className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37] uppercase mb-4 pl-2">
              Select a Destination
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-3 pb-8 relative [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)]">
              <div className="py-2 space-y-3">
                {finalData.holyPlaces.map((place, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "w-full text-left flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 border group",
                        isActive 
                          ? "bg-[#8A6A36]/20 border-[#8A6A36]/50 shadow-[0_10px_30px_rgba(138,106,54,0.1)]" 
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 rounded-full p-2.5 transition-colors duration-300 shrink-0",
                        isActive ? "bg-[#D4AF37] text-[#1E1A16]" : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/80"
                      )}>
                        {isActive ? <PlayCircle className="size-4" /> : <MapPin className="size-4" />}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-heading text-lg font-bold transition-colors duration-300",
                          isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                        )}>
                          {place.title}
                        </h4>
                      </div>
                      
                      <div className="shrink-0 self-center">
                        <ChevronRight className={cn(
                          "size-4 transition-transform duration-300",
                          isActive ? "text-[#D4AF37] translate-x-1" : "text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5"
                        )} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
