"use client";

import { useState } from "react";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface PackageGalleryProps {
  galleryUrls?: string[];
  videoUrls?: string[];
  mainImageUrl: string | null;
  title: string;
}

export function PackageGallery({ galleryUrls, videoUrls, mainImageUrl, title }: PackageGalleryProps) {
  const images = galleryUrls && galleryUrls.length > 0 ? galleryUrls : (mainImageUrl ? [mainImageUrl] : []);
  const videos = videoUrls && videoUrls.length > 0 ? videoUrls : [];
  
  const [fullscreenMedia, setFullscreenMedia] = useState<{url: string, type: 'video'|'image'} | null>(null);

  if (images.length === 0 && videos.length === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-secondary/35 flex items-center justify-center">
        <div className="text-center space-y-2 p-6">
          <div className="text-xs font-bold text-accent tracking-widest uppercase">
            Dayar-E-Habib Travels
          </div>
          <p className="text-xs text-muted-foreground">
            Spiritual guidance since 1986
          </p>
        </div>
      </div>
    );
  }

  const allMedia = [
    ...videos.map(v => ({ url: v, type: 'video' as const })),
    ...images.map(img => ({ url: img, type: 'image' as const }))
  ];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {allMedia.map((media, index) => (
          <div 
            key={index} 
            className="relative break-inside-avoid overflow-hidden rounded-xl border border-border bg-black shadow-[0_2px_8px_rgba(0,0,0,0.015)] group cursor-pointer"
            onClick={() => setFullscreenMedia(media)}
          >
            {/* The SmartMediaPlayer now uses intrinsic sizing internally */}
            <SmartMediaPlayer url={media.url} type={media.type} className="group-hover:opacity-90 transition-opacity" />
            
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <Expand className="size-4 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenMedia && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button 
            onClick={() => setFullscreenMedia(null)}
            className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X className="size-6" />
          </button>
          
          <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            {fullscreenMedia.type === 'image' || fullscreenMedia.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={fullscreenMedia.url} alt="Fullscreen" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
            ) : (
              <div className="w-full max-h-[90vh] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                <SmartMediaPlayer url={fullscreenMedia.url} type="video" className="max-h-[90vh] object-contain" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
