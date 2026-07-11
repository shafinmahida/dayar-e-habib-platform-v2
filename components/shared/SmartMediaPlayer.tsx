"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Maximize, Play, Pause } from "lucide-react";
import dynamic from "next/dynamic";
const Player: any = dynamic(() => import("react-player"), { ssr: false });

interface SmartMediaPlayerProps {
  url: string;
  type?: "video" | "image";
  alt?: string;
  className?: string;
  priority?: boolean;
}

export function SmartMediaPlayer({ url, type = "image", alt = "Media content", className, priority = false }: SmartMediaPlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [lastTap, setLastTap] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      handleFullscreen();
    }
    setLastTap(now);
  };

  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  // If explicitly an image, OR if the url is a static image (even with query params), render an img
  if (type === "image" || (url && url.split('?')[0].match(/\.(jpeg|jpg|gif|png|webp)$/i))) {
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

  // Videos
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-xl bg-black group flex items-center justify-center", className)}
      onDoubleClick={handleFullscreen}
      onTouchStart={handleTouchStart}
    >
      {isMounted && (
        <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.05]">
          {/* We scale the player slightly to hide YouTube's embedded borders/title if they sneak through */}
          <Player 
            url={url} 
            playing={isPlaying}
            muted={isMuted}
            loop={true}
            controls={false}
            playsinline={true}
            width="100%"
            height="100%"
            style={{ pointerEvents: 'none' }} // Crucial: forces player to ignore all clicks/scrolls
            config={{
              youtube: {
                playerVars: { 
                  showinfo: 0, 
                  modestbranding: 1, 
                  rel: 0,
                  fs: 0,
                  disablekb: 1,
                  iv_load_policy: 3
                }
              } as any
            }}
          />
        </div>
      )}
      
      {/* 
        The Glass Shield 
        Intercepts all clicks, scrolls, and swipes perfectly because pointer-events is blocked on the iframe 
      */}
      <div className="absolute inset-0 z-10 bg-transparent cursor-pointer" onClick={togglePlay} />

      {/* Audio Toggle Overlay */}
      <button 
        onClick={toggleMute}
        onTouchEnd={toggleMute}
        className="absolute bottom-4 right-4 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl"
        title="Toggle Audio"
      >
        {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>

      {/* Play/Pause Overlay */}
      <button 
        onClick={togglePlay}
        onTouchEnd={togglePlay}
        className="absolute bottom-4 left-4 p-3 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl"
        title="Toggle Playback"
      >
        {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
      </button>

      {/* Double Tap Hint */}
      <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <Maximize className="size-4" />
      </div>
    </div>
  );
}
