import Image from "next/image";

interface PackageGalleryProps {
  galleryUrls?: string[];
  mainImageUrl: string | null;
  title: string;
}

export function PackageGallery({ galleryUrls, mainImageUrl, title }: PackageGalleryProps) {
  const images = galleryUrls && galleryUrls.length > 0 ? galleryUrls : (mainImageUrl ? [mainImageUrl] : []);

  if (images.length === 0) {
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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((url, index) => (
        <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-card p-2 shadow-[0_2px_8px_rgba(0,0,0,0.015)] group">
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
