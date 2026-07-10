"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartMediaPlayerProps {
  url: string;
  type?: "video" | "image";
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function SmartMediaPlayer({ url, type = "image", alt = "Media content", className, priority = false }: SmartMediaPlayerProps) {
  // If explicitly an image, render an image intrinsically sized
  if (type === "image" || url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        className={cn("w-full h-auto block rounded-xl", className)}
      />
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
    // If we want no black borders, we must set the exact aspect ratio of the iframe wrapper
    return (
      <div className={cn("relative w-full rounded-xl overflow-hidden bg-black", isShort ? "aspect-[9/16]" : "aspect-video", className)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${yId}&fs=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] max-w-none max-h-none -translate-x-1/2 -translate-y-1/2 opacity-95 pointer-events-none"
        />
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
      <div className={cn("relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black", className)}>
        <iframe 
          src={`https://www.instagram.com/p/${igId}/embed`} 
          className="w-full h-full object-cover absolute inset-0" 
          frameBorder="0" 
          scrolling="no" 
          allowTransparency={true}
        />
      </div>
    );
  }

  // 3. Facebook
  const isFacebook = url.includes('facebook.com');
  if (isFacebook) {
    return (
      <div className={cn("relative w-full aspect-video rounded-xl overflow-hidden bg-black", className)}>
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=auto`}
          className="w-full h-full object-cover absolute inset-0"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    );
  }

  // 4. Default native video for .mp4, .webm, etc.
  return (
    <video 
      src={url} 
      autoPlay 
      muted 
      loop 
      playsInline 
      className={cn("w-full h-auto block rounded-xl", className)} 
    />
  );
}
