"use client";

import { useState } from "react";
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
  rotatingVideos: string[];
  holyPlaces: HolyPlace[];
}

interface EnlightenmentClientProps {
  data: EnlightenmentData;
}

const DEFAULT_DATA: EnlightenmentData = {
  rotatingVideos: ["/kaaba-sunset.png"],
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activePlace = finalData.holyPlaces[activeIndex] || finalData.holyPlaces[0];
  const currentVideo = activePlace?.videoUrl || finalData.rotatingVideos?.[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % finalData.holyPlaces.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + finalData.holyPlaces.length) % finalData.holyPlaces.length);
  };

  // Touch Swipe Handlers for the vertical wheel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeThreshold = distance > 30 || distance < -30;
    if (isSwipeThreshold) {
      if (distance > 0) handleNext(); // Swiped up
      else handlePrev(); // Swiped down
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 20) {
      handleNext();
    } else if (e.deltaY < -20) {
      handlePrev();
    }
  };

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
            <span>Spiritual Heritage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FCFAF5]">
            Enlightenment to Holy Places
          </h2>
          <p className="max-w-2xl mx-auto text-sm leading-relaxed text-[#FCFAF5]/60 font-medium">
            Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 70% Video Player */}
          <div className="lg:col-span-8 w-full">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-[#8A6A36]/30 shadow-[0_0_50px_rgba(138,106,54,0.15)] bg-black group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <SmartMediaPlayer url={currentVideo} type="video" className="w-full h-full object-cover rounded-none border-0" />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay Gradient for luxury feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Active Place HUD */}
              <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  {activePlace && (
                    <motion.div
                      key={activePlace.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="font-heading text-3xl md:text-4xl font-black text-white drop-shadow-lg tracking-tight">
                        {activePlace.title}
                      </h3>
                      {activePlace.description && (
                        <p className="text-sm md:text-base text-white/90 mt-2 max-w-xl drop-shadow-md font-medium leading-relaxed">
                          {activePlace.description}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: 30% iOS Clock-style Vertical Wheel */}
          <div 
            className="lg:col-span-4 w-full h-[500px] relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl"
            style={{ perspective: "1000px" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {/* Visual selection markers (like iOS date picker borders) */}
            <div className="absolute top-1/2 left-0 right-0 h-[100px] -translate-y-1/2 border-y border-[#8A6A36]/30 bg-[#8A6A36]/5 pointer-events-none rounded-xl" />

            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
              {finalData.holyPlaces.map((place, idx) => {
                const count = finalData.holyPlaces.length;
                let diff = idx - activeIndex;

                // Handle infinite wrapping calculations
                if (diff < -Math.floor(count / 2)) diff += count;
                if (diff > Math.floor(count / 2)) diff -= count;

                const isActive = diff === 0;
                
                // Absolute distance from center for opacity/scaling
                const absDiff = Math.abs(diff);
                const isHidden = absDiff > 3; // Hide items too far away

                // 3D Math for the wheel cylinder
                const translateY = diff * 85; // Vertical spacing
                const translateZ = isActive ? 0 : -absDiff * 50; // Push back non-active items
                const rotateX = -diff * 20; // Angle them towards the viewer
                const opacity = isActive ? 1 : Math.max(0, 1 - absDiff * 0.35);
                const scale = isActive ? 1 : Math.max(0.7, 1 - absDiff * 0.1);

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "absolute w-full px-4 transition-all duration-500 ease-out flex items-center justify-center [transform-style:preserve-3d]",
                      isActive ? "z-30 pointer-events-auto" : "z-10 cursor-pointer pointer-events-auto"
                    )}
                    style={{
                      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                      opacity: isHidden ? 0 : opacity,
                      pointerEvents: isHidden ? 'none' : 'auto',
                    }}
                  >
                    <div className={cn(
                      "w-full max-w-[320px] p-5 rounded-2xl border transition-all duration-500 flex items-center gap-4 backdrop-blur-md",
                      isActive 
                        ? "bg-[#8A6A36]/20 border-[#8A6A36]/50 shadow-[0_0_30px_rgba(138,106,54,0.2)]" 
                        : "bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10"
                    )}>
                      <div className={cn(
                        "rounded-full p-2.5 transition-colors duration-500 shrink-0",
                        isActive ? "bg-[#D4AF37] text-[#1E1A16] shadow-lg shadow-[#D4AF37]/30" : "bg-white/10 text-white/50"
                      )}>
                        {isActive ? <PlayCircle className="size-5" /> : <MapPin className="size-5" />}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-heading font-bold transition-colors duration-500",
                          isActive ? "text-white text-xl" : "text-white/60 text-lg"
                        )}>
                          {place.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </Container>
    </Section>
  );
}
