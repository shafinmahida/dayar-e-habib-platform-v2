"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Link as LinkIcon, Loader2 } from "lucide-react";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { createClient } from "@/lib/supabase/client";

interface MediaItem {
  id: string;
  title: string;
  type: "video" | "image";
  src: string;
  category: string;
  description: string;
}

export default function GalleryPage() {
  const supabase = createClient();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "image">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .eq('folder', 'gallery')
      .order('created_at', { ascending: false });

    if (data && !error) {
      const formattedMedia: MediaItem[] = data.map((item) => {
        let cat = "General";
        // Attempt to extract category from mime_type or just use General
        if (item.mime_type.includes('youtube')) cat = "YouTube";
        else if (item.mime_type.includes('social')) cat = "Social";
        else if (item.media_type === 'image') cat = "Image Link";

        return {
          id: item.id,
          title: item.file_name,
          type: item.media_type as "video" | "image",
          src: item.public_url,
          category: cat,
          description: item.original_name // we store the original URL here
        };
      });
      setMediaList(formattedMedia);
    }
    setLoading(false);
  };

  const categories = ["all", ...Array.from(new Set(mediaList.map((item) => item.category)))];

  const filteredMedia = mediaList.filter((item) => {
    const matchesType = activeFilter === "all" || item.type === activeFilter;
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesType && matchesCategory;
  });

  const openLightbox = (id: string) => {
    const index = filteredMedia.findIndex((item) => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredMedia.length - 1 : prev! - 1));
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredMedia.length - 1 ? 0 : prev! + 1));
    }
  };

  const activeMedia = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  return (
    <main className="min-h-screen bg-[#F2EBDB] pt-24 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Title Header */}
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center text-[9px] font-black tracking-widest text-accent uppercase bg-accent/5 border border-accent/20 px-3 py-1 mb-4 select-none">
            Spiritual Media Archives
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Journey Gallery
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground/90">
            Browse through our global media directory powered entirely by external sources like YouTube, Instagram, and Facebook.
          </p>
        </header>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDD3C1] pb-6 mb-10">
          {/* Media Type Tabs */}
          <div className="flex bg-[#FCFAF5]/70 border border-[#DDD3C1] p-1 rounded-xl self-start">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg ${
                activeFilter === "all"
                  ? "bg-accent text-[#FCFAF5] shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveFilter("video")}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center gap-1.5 ${
                activeFilter === "video"
                  ? "bg-accent text-[#FCFAF5] shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="size-3.5" />
              Videos
            </button>
            <button
              onClick={() => setActiveFilter("image")}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center gap-1.5 ${
                activeFilter === "image"
                  ? "bg-accent text-[#FCFAF5] shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ImageIcon className="size-3.5" />
              Images
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all duration-300 rounded-lg ${
                  activeCategory === cat
                    ? "bg-[#FCFAF5] border-accent text-accent font-bold"
                    : "border-border/50 bg-[#FCFAF5]/30 text-muted-foreground hover:border-[#DDD3C1] hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All Sources" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin size-8 text-accent" />
          </div>
        ) : filteredMedia.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="group relative flex flex-col bg-[#FCFAF5] border border-border/45 rounded-2xl overflow-hidden cursor-pointer shadow-xs transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
              >
                {/* Media Preview Window */}
                <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden flex items-center justify-center bg-black">
                  <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-1 pointer-events-none" />
                  
                  {item.category === "Social" ? (
                     <div className="flex flex-col items-center justify-center w-full h-full bg-muted">
                        <LinkIcon className="size-10 text-muted-foreground opacity-50 mb-2" />
                        <span className="text-xs text-muted-foreground font-medium">External Social Media</span>
                     </div>
                  ) : (
                     <SmartMediaPlayer url={item.src} type={item.type} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 opacity-90" />
                  )}
                  
                  {item.type === "video" && item.category !== "Social" && (
                    <div className="absolute inset-0 bg-black/15 z-1 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/35 pointer-events-none">
                      <div className="flex size-12 items-center justify-center rounded-full bg-[#FCFAF5] text-accent border border-accent/20 shadow-md transform scale-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-[#FCFAF5] group-hover:border-accent">
                        <Play className="size-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 z-10 bg-[#FCFAF5]/90 border border-border/55 px-2.5 py-1 text-[8px] font-black tracking-widest text-accent uppercase select-none rounded-md">
                    {item.category}
                  </span>
                </div>

                {/* Content Block */}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-heading text-base font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[10px] text-muted-foreground/90 leading-relaxed truncate font-mono">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FCFAF5]/40 border border-dashed border-[#DDD3C1] rounded-2xl">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              No matching media items found.
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Media Lightbox Modal */}
      {activeMedia && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-8 select-none animate-in fade-in duration-300"
        >
          {/* Top Controls Bar */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            <button
              onClick={closeLightbox}
              className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
              aria-label="Close Lightbox"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={showPrev}
            className="absolute left-4 z-40 flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all duration-300"
            aria-label="Previous Media"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Media Center Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video bg-black flex items-center justify-center rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <SmartMediaPlayer url={activeMedia.src} type={activeMedia.type} className="w-full h-full object-contain" />
          </div>

          {/* Right Arrow */}
          <button
            onClick={showNext}
            className="absolute right-4 z-40 flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all duration-300"
            aria-label="Next Media"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Bottom Descriptive Caption */}
          <div className="mt-6 text-center max-w-2xl px-4">
            <span className="text-[9px] font-black tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md">
              {activeMedia.category} • {activeMedia.type}
            </span>
            <h2 className="mt-3 font-heading text-lg sm:text-xl font-bold text-white leading-tight">
              {activeMedia.title}
            </h2>
            <a href={activeMedia.src} target="_blank" rel="noopener noreferrer" className="mt-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 leading-relaxed block truncate">
              {activeMedia.src}
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
