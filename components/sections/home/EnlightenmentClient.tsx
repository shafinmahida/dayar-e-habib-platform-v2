"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { cn } from "@/lib/utils";
import { Search, MapPin, X, ArrowRight, Play, Maximize2 } from "lucide-react";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export function EnlightenmentClient({ places = [] }: { places: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // Setup Fuzzy Search
  const fuse = useMemo(() => new Fuse(places, {
    keys: ["title", "short_description", "category", "presentation_overview"],
    threshold: 0.3,
  }), [places]);

  // Determine active results
  const results = useMemo(() => {
    let filtered = places;
    
    if (searchQuery.trim() !== "") {
      filtered = fuse.search(searchQuery).map(res => res.item);
    } else if (activeCategory) {
      filtered = places.filter(p => p.category === activeCategory);
    }
    
    return filtered;
  }, [searchQuery, activeCategory, places, fuse]);

  const categories = useMemo(() => {
    const cats = new Set(places.map(p => p.category || "Uncategorized"));
    return Array.from(cats);
  }, [places]);

  return (
    <section className="relative py-24 md:py-32 bg-[#FAF8F5] overflow-hidden" id="enlightenment">
      
      {/* Search Engine & Directory View */}
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#8A6A36]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-[#8A6A36] uppercase">
              The Enlightenment Engine
            </span>
            <div className="h-[1px] w-8 bg-[#8A6A36]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1]">
            Explore the Sacred
          </h2>
          <p className="text-[#1A1A1A]/60 text-sm md:text-base font-medium max-w-xl mx-auto">
            Discover the profound stories and visual majesty of Islam's holiest places. Search for a specific destination or explore by city.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-[#1A1A1A]/40 group-focus-within:text-[#8A6A36] transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-16 md:h-20 pl-16 pr-8 rounded-full bg-white border border-black/5 shadow-2xl shadow-black/5 text-lg md:text-xl font-bold text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-4 focus:ring-[#8A6A36]/10 focus:border-[#8A6A36] transition-all"
            placeholder="Where do you want to explore?"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveCategory(null);
            }}
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
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

        {/* Results List */}
        <AnimatePresence mode="popLayout">
          {(searchQuery || activeCategory) ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {results.length === 0 ? (
                <div className="col-span-full py-12 text-center text-[#1A1A1A]/40 font-medium">
                  No sacred places matched your search.
                </div>
              ) : (
                results.map(place => (
                  <button
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="flex flex-col text-left p-6 bg-white rounded-3xl border border-black/5 hover:border-[#8A6A36]/30 hover:shadow-xl hover:-translate-y-1 transition-all group"
                  >
                    <span className="text-[9px] font-black tracking-widest text-[#8A6A36] uppercase mb-2">
                      {place.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{place.title}</h3>
                    <p className="text-sm text-[#1A1A1A]/60 line-clamp-2">{place.short_description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#1A1A1A]/40 group-hover:text-[#8A6A36] transition-colors">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Explore Presentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {places.slice(0, 6).map(place => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="flex flex-col text-left group rounded-3xl overflow-hidden bg-white shadow-sm border border-black/5 hover:shadow-2xl hover:border-[#8A6A36]/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[4/3] bg-black overflow-hidden border-b border-black/5">
                    {place.gallery_images && place.gallery_images.length > 0 ? (
                      <Image 
                        src={place.gallery_images[0]} 
                        alt={place.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#FAF8F5] flex items-center justify-center text-[#1A1A1A]/20">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[8px] font-black tracking-widest text-[#8A6A36] uppercase rounded-full shadow-sm">
                      {place.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 line-clamp-1 group-hover:text-[#8A6A36] transition-colors">{place.title}</h3>
                    <p className="text-sm text-[#1A1A1A]/60 line-clamp-2">{place.short_description}</p>
                  </div>
                </button>
              ))}
              {places.length === 0 && (
                <div className="col-span-full py-16 text-center text-[#1A1A1A]/40 font-medium bg-white rounded-3xl border border-black/5">
                  The Enlightenment Directory is currently empty.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Presentation Overlay */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center overflow-hidden"
          >
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.98 }}
                transition={{ type: "spring", damping: 30, stiffness: 250 }}
                className="relative w-full max-w-4xl h-full md:h-[85vh] md:rounded-[2.5rem] bg-[#FCFAF5] border border-black/5 overflow-y-auto custom-scrollbar shadow-2xl p-6 md:p-12 flex flex-col"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-black/60 hover:text-black transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Info */}
                <div className="space-y-4 mb-8 pr-12">
                  <span className="inline-block px-3 py-1 bg-[#8A6A36]/10 text-[#8A6A36] text-[10px] font-black uppercase tracking-[0.2em] rounded-md border border-[#8A6A36]/20">
                    {selectedPlace.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight">
                    {selectedPlace.title}
                  </h1>
                  <div className="h-[1.5px] w-16 bg-[#8A6A36]" />
                </div>

                {/* Text Content (Above Media) */}
                <div className="prose prose-lg max-w-none mb-12">
                  <div className="text-base md:text-lg text-[#1A1A1A]/80 leading-[2.2] font-medium whitespace-pre-wrap text-justify">
                    {selectedPlace.presentation_overview || selectedPlace.short_description}
                  </div>
                </div>

                {/* Media Section (Below Text) */}
                <div className="space-y-12">
                  {selectedPlace.video_url && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#8A6A36] flex items-center gap-4">
                        <span>Video Presentation</span>
                        <div className="h-[1px] flex-1 bg-[#8A6A36]/20" />
                      </h3>
                      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-black shadow-xl border border-black/5">
                        <SmartMediaPlayer url={selectedPlace.video_url} type="video" className="w-full h-full" />
                      </div>
                    </div>
                  )}

                  {/* Gallery */}
                  {selectedPlace.gallery_images && selectedPlace.gallery_images.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.25em] text-[#8A6A36] flex items-center gap-4">
                        <span>Visual Gallery</span>
                        <div className="h-[1px] flex-1 bg-[#8A6A36]/20" />
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedPlace.gallery_images.map((img: string, idx: number) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-black/5 group border border-black/5 shadow-md">
                            <Image 
                              src={img} 
                              alt={`${selectedPlace.title} gallery ${idx + 1}`} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
