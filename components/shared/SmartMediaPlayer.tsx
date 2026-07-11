"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Maximize } from "lucide-react";

interface SmartMediaPlayerProps {
  url: string;
  type?: "video" | "image";
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function SmartMediaPlayer({ url, type = "image", alt = "Media content", className, priority = false }: SmartMediaPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [lastTap, setLastTap] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleTouchStart = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleFullscreen();
    }
    setLastTap(now);
  };

  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // If explicitly an image, render an image intrinsically sized
  if (type === "image" || url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center", className)}
        onDoubleClick={handleFullscreen}
        onTouchStart={handleTouchStart}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Handle Videos
  
  // 1. YouTube (Standard & Shorts)
  const isShort = url.includes('/shorts/');
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };
  
  const yId = getYoutubeId(url);
  if (yId) {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center", isShort ? "aspect-[9/16]" : "aspect-video", className)}
        onDoubleClick={handleFullscreen}
        onTouchStart={handleTouchStart}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${yId}&fs=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="absolute inset-0 w-full h-full"
        />
        {/* We can't overlay buttons cleanly on YouTube without blocking interactions, so we rely on controls=1 */}
      </div>
    );
  }

  // 2. Instagram
  const getInstagramId = (url: string) => {
    const match = url.match(/(?:instagram\.com\/(?:p|reel|tv)\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  
  const igId = getInstagramId(url);
  if (igId) {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black", className)}
        onDoubleClick={handleFullscreen}
        onTouchStart={handleTouchStart}
      >
        <iframe 
          src={`https://www.instagram.com/p/${igId}/embed`} 
          className="absolute inset-0 w-full h-full border-0"
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen
        />
      </div>
    );
  }

  // 3. Native Video (Uploaded MP4s, etc)
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-xl bg-black group", className)}
      onDoubleClick={handleFullscreen}
      onTouchStart={handleTouchStart}
    >
      <video 
        ref={videoRef}
        src={url} 
        autoPlay 
        muted={isMuted}
        loop 
        playsInline 
        className="w-full h-full object-contain" 
      />
      
      {/* Audio Toggle Overlay */}
      <button 
        onClick={toggleMute}
        onTouchEnd={toggleMute}
        className="absolute bottom-4 right-4 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl"
        title="Toggle Audio"
      >
        {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>

      {/* Double Tap Hint */}
      <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <Maximize className="size-4" />
      </div>
    </div>
  );
}
