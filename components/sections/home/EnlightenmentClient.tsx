"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const activePlace = finalData.holyPlaces[activeIndex] || finalData.holyPlaces[0];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;
    let scrollAccumulator = 0;
    const SCROLL_THRESHOLD = 75; // Pixels to scroll before switching slide

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault(); // Completely stop page scroll
      scrollAccumulator += e.deltaY;
      
      if (scrollAccumulator > SCROLL_THRESHOLD) {
        setActiveIndex((prev) => (prev + 1) % finalData.holyPlaces.length);
        scrollAccumulator = 0;
      } else if (scrollAccumulator < -SCROLL_THRESHOLD) {
        setActiveIndex((prev) => (prev - 1 + finalData.holyPlaces.length) % finalData.holyPlaces.length);
        scrollAccumulator = 0;
      }
    };

    const handleTouchStartNative = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      scrollAccumulator = 0;
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      e.preventDefault(); // Completely stop page scroll on touch
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      if (deltaY > SCROLL_THRESHOLD) {
        setActiveIndex((prev) => (prev + 1) % finalData.holyPlaces.length);
        touchStartY = touchY; 
        scrollAccumulator = 0;
      } else if (deltaY < -SCROLL_THRESHOLD) {
        setActiveIndex((prev) => (prev - 1 + finalData.holyPlaces.length) % finalData.holyPlaces.length);
        touchStartY = touchY;
        scrollAccumulator = 0;
      }
    };

    el.addEventListener("wheel", handleWheelNative, { passive: false });
    el.addEventListener("touchstart", handleTouchStartNative, { passive: false });
    el.addEventListener("touchmove", handleTouchMoveNative, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheelNative);
      el.removeEventListener("touchstart", handleTouchStartNative);
      el.removeEventListener("touchmove", handleTouchMoveNative);
    };
  }, [finalData.holyPlaces.length]);

  if (finalData.visible === false) return null;

  return (
    <Section
      className="bg-[#1E1A16] border-t border-border/10 py-20 lg:py-32 overflow-hidden relative perspective-[1000px]"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 70% Video Player Wheel */}
          <div 
            ref={containerRef}
            className="lg:col-span-8 w-full h-[600px] relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden touch-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
            style={{ perspective: "1500px" }}
          >
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
              {finalData.holyPlaces.map((place, idx) => {
                const count = finalData.holyPlaces.length;
                let diff = idx - activeIndex;

                // Handle infinite wrapping calculations
                if (diff < -Math.floor(count / 2)) diff += count;
                if (diff > Math.floor(count / 2)) diff -= count;

                const isActive = diff === 0;
                const absDiff = Math.abs(diff);
                const isHidden = absDiff > 2;

                // 3D Math for the wheel cylinder
                const translateY = diff * 240; // Vertical spacing
                const translateZ = isActive ? 0 : -absDiff * 150; // Push back non-active items
                const rotateX = -diff * 15; // Angle them towards the viewer
                const opacity = isActive ? 1 : Math.max(0, 1 - absDiff * 0.4);
                const scale = isActive ? 1 : Math.max(0.75, 1 - absDiff * 0.15);
                const currentVideo = place.videoUrl || "/kaaba-sunset.png";

                return (
                  <div
                    key={idx}
                    onClick={() => { if (!isActive) setActiveIndex(idx); }}
                    className={cn(
                      "absolute w-full max-w-4xl aspect-video transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex items-center justify-center [transform-style:preserve-3d] rounded-3xl overflow-hidden bg-black",
                      isActive 
                        ? "z-30 shadow-[0_0_60px_rgba(138,106,54,0.2)] border-2 border-[#8A6A36]/50 ring-1 ring-white/10" 
                        : "z-10 shadow-xl border border-white/10"
                    )}
                    style={{
                      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                      opacity: isHidden ? 0 : opacity,
                      pointerEvents: isHidden ? 'none' : 'auto',
                    }}
                  >
                    <SmartMediaPlayer url={currentVideo} type="video" className="w-full h-full object-cover rounded-none border-0" />
                    
                    {/* Active Place HUD Overlay inside the video */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <h3 className="font-heading text-3xl md:text-4xl font-black text-white drop-shadow-lg tracking-tight">
                            {place.title}
                          </h3>
                          {place.description && (
                            <p className="text-sm md:text-base text-white/90 mt-2 max-w-2xl drop-shadow-md font-medium leading-relaxed">
                              {place.description}
                            </p>
                          )}
                        </motion.div>
                      </div>
                    )}

                    {/* Interactive overlay for non-active slides so they can catch swipes and clicks without iframe interference */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/60 z-30 cursor-pointer hover:bg-black/40 transition-colors" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 30% Holy Places Synced 3D Text Wheel */}
          <div className="lg:col-span-4 w-full h-[500px] relative flex flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] mt-8 lg:mt-0">
            <h3 className="absolute top-0 left-0 text-[10px] font-black tracking-[0.2em] text-[#D4AF37] uppercase z-40 pl-2">
              Select a Destination
            </h3>
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]" style={{ perspective: "1200px" }}>
              {finalData.holyPlaces.map((place, idx) => {
                const count = finalData.holyPlaces.length;
                let diff = idx - activeIndex;

                // Handle infinite wrapping calculations
                if (diff < -Math.floor(count / 2)) diff += count;
                if (diff > Math.floor(count / 2)) diff -= count;

                const isActive = diff === 0;
                const absDiff = Math.abs(diff);
                const isHidden = absDiff > 4; // Show slightly more text items than videos

                // 3D Math for the text wheel
                const translateY = diff * 110; // Vertical spacing for text
                const translateZ = isActive ? 0 : -absDiff * 50; 
                const rotateX = -diff * 20; 
                const opacity = isActive ? 1 : Math.max(0, 1 - absDiff * 0.25);
                const scale = isActive ? 1 : Math.max(0.85, 1 - absDiff * 0.1);

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "absolute w-full text-left flex items-start gap-4 p-5 rounded-2xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) border group",
                      isActive 
                        ? "bg-[#8A6A36]/20 border-[#8A6A36] shadow-[0_10px_40px_rgba(138,106,54,0.15)] z-30" 
                        : "bg-[#1E1A16] border-white/5 hover:bg-white/5 hover:border-white/10 z-10"
                    )}
                    style={{
                      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                      opacity: isHidden ? 0 : opacity,
                      pointerEvents: isHidden ? 'none' : 'auto',
                    }}
                  >
                    {/* Subtle active glow inside button */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8A6A36]/10 to-transparent pointer-events-none rounded-2xl" />
                    )}
                    
                    <div className={cn(
                      "mt-0.5 rounded-full p-2 transition-colors duration-700 shrink-0 relative z-10",
                      isActive ? "bg-[#D4AF37] text-[#1E1A16] shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/80"
                    )}>
                      {isActive ? <PlayCircle className="size-4" /> : <MapPin className="size-4" />}
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <h4 className={cn(
                        "font-heading text-lg font-bold transition-colors duration-700",
                        isActive ? "text-white" : "text-white/50 group-hover:text-white/90"
                      )}>
                        {place.title}
                      </h4>
                      <p className={cn(
                        "text-xs mt-1 transition-colors duration-700 line-clamp-2 leading-relaxed",
                        isActive ? "text-[#D4AF37]/90 font-medium" : "text-white/30 group-hover:text-white/50"
                      )}>
                        {place.description || "Discover the history and significance."}
                      </p>
                    </div>
                    
                    <div className="relative z-10 shrink-0 self-center">
                      <ChevronRight className={cn(
                        "size-4 transition-transform duration-700",
                        isActive ? "text-[#D4AF37] translate-x-1" : "text-white/10 group-hover:text-white/30"
                      )} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
