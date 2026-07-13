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
  const [isIntersecting, setIsIntersecting] = useState(true); // Default to true so it plays immediately
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Intersection Observer for dual-audio prevention and smart pausing
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      { threshold: 0.1 } // Lower threshold to ensure it fires in modals
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
    const isCover = className?.includes("object-cover");
    return (
      <div 
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden flex items-center justify-center group bg-transparent", className)}
        onDoubleClick={handleFullscreen}
      >
        {/* Main Content Layer */}
        <img 
          src={url} 
          alt={alt} 
          className={cn(
            "relative pointer-events-none",
            isCover ? "w-full h-full object-cover" : "w-full h-auto max-h-full object-contain drop-shadow-md"
          )} 
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

  // Handle Videos (react-player natively handles youtube, fb, insta, vimeo, mp4)
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden bg-black flex items-center justify-center", className)}
      onDoubleClick={handleFullscreen}
    >
      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={false}
          controls={true}
          width="100%"
          height="100%"
          style={{ objectFit: className?.includes('object-cover') ? 'cover' : 'contain' }}
          playsinline={true}
          config={{
            youtube: {
              playerVars: { showinfo: 1, origin: typeof window !== 'undefined' ? window.location.origin : undefined }
            }
          }}
          onError={(e: any) => {
            console.error("ReactPlayer Error:", e);
            setHasError(true);
          }}
        />
      </div>
      
      {/* Caption */}
      {caption && (
        <div className="absolute bottom-4 left-4 max-w-[60%] bg-black/60 backdrop-blur-md text-white text-xs p-3 rounded-xl pointer-events-none border border-white/10 z-30">
          {caption}
        </div>
      )}
    </div>
  );
}
