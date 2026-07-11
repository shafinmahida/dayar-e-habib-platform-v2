"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SmartMediaPlayerProps {
  url: string;
  type?: "video" | "image";
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function SmartMediaPlayer({ url, type = "image", alt = "Media content", className }: SmartMediaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  };

  if (!url) return null;

  // 1. Check if it's an image
  const cleanUrl = url.split('?')[0];
  if (type === "image" || cleanUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center", className)}
        onDoubleClick={handleFullscreen}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt={alt} className={cn("w-full h-full object-cover pointer-events-none", className?.includes('object-contain') ? 'object-contain' : '')} />
      </div>
    );
  }

  // 2. Check if it's a direct MP4/WebM video
  if (cleanUrl.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center", className)}
        onDoubleClick={handleFullscreen}
      >
        <video 
          src={url} 
          autoPlay 
          muted 
          loop 
          playsInline
          className={cn("w-full h-full object-cover pointer-events-none", className?.includes('object-contain') ? 'object-contain' : '')}
        />
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    );
  }

  // 3. Assume YouTube for everything else and extract ID
  const extractYoutubeId = (link: string) => {
    const match = link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const ytId = extractYoutubeId(url);

  if (ytId) {
    // Generate YouTube embedded URL with strict parameters for silent autoplaying background loop
    const ytEmbedUrl = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${ytId}&disablekb=1&fs=0&iv_load_policy=3`;

    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center", className)}
        onDoubleClick={handleFullscreen}
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]">
          <iframe 
            src={ytEmbedUrl}
            className="w-full h-full border-0 pointer-events-none"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
        {/* Glass shield intercepts all clicks to prevent scrolling bugs */}
        <div className="absolute inset-0 z-10 bg-transparent" />
      </div>
    );
  }

  // Fallback if URL is totally unrecognized
  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center text-white/50 text-xs", className)}>
      Unsupported Media
    </div>
  );
}
