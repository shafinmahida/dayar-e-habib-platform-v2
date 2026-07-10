import Image from "next/image";

interface PackageGalleryProps {
  galleryUrls?: string[];
  videoUrls?: string[];
  mainImageUrl: string | null;
  title: string;
}

export function PackageGallery({ galleryUrls, videoUrls, mainImageUrl, title }: PackageGalleryProps) {
  const images = galleryUrls && galleryUrls.length > 0 ? galleryUrls : (mainImageUrl ? [mainImageUrl] : []);
  const videos = videoUrls && videoUrls.length > 0 ? videoUrls : [];

  if (images.length === 0 && videos.length === 0) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-secondary/35 flex items-center justify-center">
        {/* Elegant aesthetic placeholder */}
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

  // Helper to extract Youtube ID
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Render Videos First */}
      {videos.map((url, index) => {
        const yId = getYoutubeId(url);
        if (yId) {
          return (
            <div key={`vid-${index}`} className="relative aspect-[4/3] sm:aspect-auto sm:h-[400px] overflow-hidden rounded-md border border-border bg-black shadow-[0_2px_8px_rgba(0,0,0,0.015)] group">
              <iframe
                src={`https://www.youtube.com/embed/${yId}`}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover rounded-sm"
              ></iframe>
            </div>
          );
        }
        // Fallback for direct mp4 links
        return (
          <div key={`vid-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-black shadow-[0_2px_8px_rgba(0,0,0,0.015)] group">
            <video src={url} controls className="w-full h-full object-cover rounded-sm" />
          </div>
        );
      })}

      {/* Render Images */}
      {images.map((url, index) => (
        <div key={`img-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-card p-2 shadow-[0_2px_8px_rgba(0,0,0,0.015)] group">
          <Image
            src={url}
            alt={`${title} Gallery Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover rounded-sm transition-transform duration-500 group-hover:scale-103"
          />
        </div>
      ))}
    </div>
  );
}
