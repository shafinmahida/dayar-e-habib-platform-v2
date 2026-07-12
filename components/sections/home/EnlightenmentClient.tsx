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
          {(searchQuery || activeCategory) && (
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
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl h-full md:h-[90vh] md:rounded-[3rem] bg-[#0A0A0A] border border-white/10 overflow-y-auto custom-scrollbar flex flex-col shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPlace(null)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Header */}
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-black shrink-0 border-b border-white/10">
                {selectedPlace.video_url ? (
                  <SmartMediaPlayer url={selectedPlace.video_url} type="video" />
                ) : selectedPlace.gallery_images?.length > 0 ? (
                  <SmartMediaPlayer url={selectedPlace.gallery_images[0]} type="image" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">No Media Available</div>
                )}
                
                {/* Gradient Overlay for Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
                    {selectedPlace.category}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
                    {selectedPlace.title}
                  </h1>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 md:p-12 space-y-12 shrink-0">
                <div className="prose prose-invert max-w-3xl">
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
                    {selectedPlace.presentation_overview || selectedPlace.short_description}
                  </p>
                </div>

                {/* Gallery */}
                {selectedPlace.gallery_images && selectedPlace.gallery_images.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Visual Archives</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedPlace.gallery_images.map((img: string, idx: number) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 group border border-white/10">
                          <Image 
                            src={img} 
                            alt={`${selectedPlace.title} gallery ${idx + 1}`} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
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
