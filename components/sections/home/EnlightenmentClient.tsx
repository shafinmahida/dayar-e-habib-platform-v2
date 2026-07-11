"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { Play } from "lucide-react";

export interface HolyPlace {
  title: string;
  category?: string;
  description: string;
  videoUrl: string;
}

export interface EnlightenmentData {
  visible: boolean;
  overline: string;
  sectionTitle: string;
  sectionSubtitle: string;
  holyPlaces: HolyPlace[];
}

const DEFAULT_DATA: EnlightenmentData = {
  visible: true,
  overline: "Spiritual Heritage",
  sectionTitle: "Enlightenment to Holy Places",
  sectionSubtitle: "Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam.",
  holyPlaces: [
    { title: "Masjid Al-Haram", category: "Makkah", description: "The Great Mosque of Makkah", videoUrl: "/kaaba-sunset.png" },
    { title: "Jabal Al-Nour", category: "Makkah", description: "Cave of Hira", videoUrl: "/kaaba-sunset.png" },
    { title: "Al-Masjid an-Nabawi", category: "Madinah", description: "The Prophet's Mosque", videoUrl: "/madinah-dawn.png" },
    { title: "Masjid Quba", category: "Madinah", description: "First Mosque of Islam", videoUrl: "/madinah-dawn.png" },
    { title: "Al-Balad", category: "Jeddah", description: "Historic District", videoUrl: "/media__1783076608743.png" },
  ]
};

export function EnlightenmentClient({ data }: { data?: EnlightenmentData }) {
  const finalData = data || DEFAULT_DATA;
  const places = finalData.holyPlaces || [];
  
  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(places.map(p => p.category || "Other"));
    return ["All", ...Array.from(cats)];
  }, [places]);

  const [activeCategory, setActiveCategory] = useState("All");

  if (!finalData.visible) return null;

  const filteredPlaces = activeCategory === "All" 
    ? places 
    : places.filter(p => (p.category || "Other") === activeCategory);

  return (
    <section className="relative py-24 md:py-32 bg-[#FAF8F5] overflow-hidden" id="enlightenment">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#8A6A36]" />
            <span className="text-xs md:text-sm font-black tracking-[0.25em] text-[#8A6A36] uppercase">
              {finalData.overline || "Spiritual Heritage"}
            </span>
            <div className="h-[1px] w-8 bg-[#8A6A36]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1]">
            {finalData.sectionTitle || "Enlightenment to Holy Places"}
          </h2>
          
          <p className="text-base md:text-lg text-[#1A1A1A]/70 font-medium leading-relaxed max-w-2xl mx-auto">
            {finalData.sectionSubtitle || "Explore the sacred history, profound stories, and majestic significance of the most revered destinations in Islam."}
          </p>
        </div>

        {/* Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeCategory === cat
                    ? "bg-[#8A6A36] text-white shadow-lg shadow-[#8A6A36]/20 scale-105"
                    : "bg-white text-[#1A1A1A]/60 hover:bg-[#8A6A36]/10 hover:text-[#8A6A36] border border-black/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPlaces.map((place, idx) => {
            const currentVideo = place.videoUrl || "/kaaba-sunset.png";
            
            return (
              <div 
                key={idx}
                className="group relative h-[400px] md:h-[450px] w-full rounded-3xl overflow-hidden bg-black isolation-isolate shadow-xl shadow-black/5"
              >
                {/* Background Media Engine */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                  <SmartMediaPlayer url={currentVideo} className="w-full h-full object-cover rounded-none border-0" />
                </div>

                {/* Dark Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />

                {/* Content HUD */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none z-20">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    
                    {place.category && (
                      <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                        {place.category}
                      </span>
                    )}
                    
                    <h3 className="font-heading text-2xl md:text-3xl font-black text-white drop-shadow-lg tracking-tight mb-3">
                      {place.title}
                    </h3>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="text-white/80 text-sm font-medium leading-relaxed drop-shadow-md pb-1">
                          {place.description}
                        </p>
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* Subtle Hover Play Icon Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100 pointer-events-none z-20">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>

              </div>
            );
          })}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-24 px-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-black/5">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">No places found</h3>
            <p className="text-[#1A1A1A]/60">There are no holy places in this category yet.</p>
          </div>
        )}

      </div>
    </section>
  );
}
