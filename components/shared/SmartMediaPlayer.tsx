"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Play, Pause, Maximize } from "lucide-react";

// Dynamically import ReactPlayer to avoid SSR hydration issues
const ReactPlayer: any = dynamic(() => import("react-player"), { ssr: false });

interface SmartMediaPlayerProps {
  url: string;
  type?: "video" | "image" | "document" | "auto";
  alt?: string;
  className?: string;
  caption?: string;
  priority?: boolean;
}

export function SmartMediaPlayer({ url, type = "auto", alt = "Media content", className, caption, priority }: SmartMediaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Intersection Observer for dual-audio prevention and smart pausing
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Pause if it scrolls out of view to prevent background audio clash
          setPlaying(false);
        } else {
          // Play if it scrolls into view (but only if it was already meant to be autoplaying)
          setPlaying(true);
        }
      },
      { threshold: 0.2 } // 20% visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
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

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted(!muted);
  };

  if (!url || hasError) return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-xl bg-muted flex flex-col items-center justify-center text-muted-foreground text-xs p-4 text-center", className)}>
      <span className="mb-2">Media Unavailable</span>
    </div>
  );

  const cleanUrl = url.split('?')[0].toLowerCase();
  
  // 1. Determine Type
  let detectedType = type;
  if (detectedType === "auto") {
    if (cleanUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
      detectedType = "image";
    } else if (cleanUrl.match(/\.(pdf)$/i)) {
      detectedType = "document";
    } else {
      // Treat everything else (mp4, youtube, facebook, instagram) as video for react-player
      detectedType = "video";
    }
  }

  // Handle Images
  if (detectedType === "image") {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full overflow-hidden flex items-center justify-center group bg-transparent", className)}
        onDoubleClick={handleFullscreen}
      >
        {/* Main Content Layer (Uncropped, purely intrinsic) */}
        <img 
          src={url} 
          alt={alt} 
          className="relative w-full h-auto max-h-full object-contain pointer-events-none drop-shadow-md" 
          onError={() => setHasError(true)}
        />
        {caption && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs p-2 rounded-lg pointer-events-none z-20">
            {caption}
          </div>
        )}
      </div>
    );
  }

  // Handle Documents (PDF)
  if (detectedType === "document") {
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden bg-white", className)}
      >
        <iframe src={`${url}#toolbar=0`} className="w-full h-full border-0" title={alt} />
      </div>
    );
  }

  // Helper for YouTube Thumbnails
  const getYoutubeThumbnail = (videoUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` : null;
  };
  const ytThumb = getYoutubeThumbnail(url);

  // Handle Videos (react-player handles youtube, fb, insta, vimeo, mp4 natively)
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden bg-transparent group flex items-center justify-center", className)}
      onDoubleClick={handleFullscreen}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="relative w-full h-full pointer-events-none z-10 flex items-center justify-center">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing && isIntersecting}
          muted={muted}
          loop={true}
          width="100%"
          height="100%"
          style={{ objectFit: 'contain' }}
          playsinline={true}
          controls={false}
          config={{
            youtube: {
              playerVars: { showinfo: 0, modestbranding: 1, rel: 0, fs: 0 }
            }
          }}
          onError={() => {
            setHasError(true);
          }}
        />
      </div>

      {/* Invisible interceptor shield for double click and hover detection without pausing native player */}
      <div 
        className="absolute inset-0 z-10 bg-transparent cursor-pointer" 
        onClick={togglePlay}
        onDoubleClick={handleFullscreen}
      />

      {/* Custom UI Overlays (z-20) */}
      <div className={cn("absolute inset-0 z-20 pointer-events-none transition-opacity duration-300", showControls || !playing ? "opacity-100" : "opacity-0")}>
        
        {/* Center Play/Pause */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:scale-110 transition-all pointer-events-auto"
          >
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
        </div>

        {/* Bottom Corner Mute & Fullscreen */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button 
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all pointer-events-auto"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all pointer-events-auto"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

        {/* Caption */}
        {caption && (
          <div className="absolute bottom-4 left-4 max-w-[60%] bg-black/60 backdrop-blur-md text-white text-xs p-3 rounded-xl pointer-events-none border border-white/10">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
