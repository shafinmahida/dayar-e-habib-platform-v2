"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  spanClass: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/kaaba-sunset.png",
    alt: "The Holy Kaaba at sunset",
    caption: "Tawaf at the Holy Kaaba — Sunset Devotion",
    spanClass: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    src: "/madinah-dawn.png",
    alt: "Masjid an-Nabawi in Madinah at dawn",
    caption: "Al-Masjid an-Nabawi — Peaceful Salutations at Dawn",
    spanClass: "md:col-span-1 md:row-span-1 aspect-square",
  },
  {
    src: "/pilgrims-tawaf.png",
    alt: "Family of pilgrims in Makkah",
    caption: "Devotion and Fellowship — Sincere Supplications",
    spanClass: "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto",
  },
  {
    src: "/hospitality-hotel.png",
    alt: "Luxury hotel overlooking the Haram bounds",
    caption: "Premium Lodging — Comfort Within the Haram Bounds",
    spanClass: "md:col-span-1 md:row-span-1 aspect-square",
  },
  {
    src: "/family-prayer.png",
    alt: "Grandfather and grandson walking in Madinah",
    caption: "Generational Legacy — Guided Step by Step",
    spanClass: "md:col-span-2 md:row-span-1 aspect-[16/9] md:aspect-auto",
  },
  {
    src: "/premium-transport.png",
    alt: "High-speed train traversing the desert dunes",
    caption: "Seamless Transit — Modern Haramain High-Speed Train",
    spanClass: "md:col-span-1 md:row-span-1 aspect-square",
  },
];

export function Gallery() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  return (
    <Section
      className="bg-background border-t border-border/20"
      id="gallery"
      title="The Visual Chronicle"
      subtitle="Moments of quiet reflection, architectural majesty, and premium service curated for our pilgrims."
    >
      <Container className="-mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={classNameJoin(
                "relative group overflow-hidden border border-border/40 bg-card p-2 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.005)]",
                img.spanClass
              )}
              onClick={() => setActiveImage(img)}
            >
              <div className="relative w-full h-full overflow-hidden">
                {/* Visual shade filter */}
                <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 z-10 transition-colors duration-500 flex items-center justify-center">
                  <ZoomIn className="size-6 text-[#FCFAF5] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500" />
                </div>
                
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  loading="lazy"
                />

                {/* Subtitle slide up */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 select-none">
                  <p className="text-[8px] font-black tracking-widest text-accent uppercase">Spiritual Heritage</p>
                  <p className="text-xs text-[#FCFAF5] font-serif italic mt-0.5">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal overlay */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E1A16]/95 p-4 sm:p-10 transition-all duration-300 animate-in fade-in"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Close button wrapper */}
          <button
            type="button"
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-300 p-2 focus-visible:outline-none"
            onClick={() => setActiveImage(null)}
            aria-label="Close Lightbox"
          >
            <X className="size-6" />
          </button>

          {/* Expanded photo wrapper */}
          <div 
            className="relative max-w-4xl max-h-[75vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Description banner */}
          <div 
            className="mt-6 text-center max-w-md space-y-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[9px] font-black tracking-[0.25em] text-accent uppercase">Dayar-E-Habib Chronicle</p>
            <h3 className="font-heading text-lg text-white tracking-tight">{activeImage.caption}</h3>
            <p className="text-xs text-white/50">{activeImage.alt}</p>
          </div>
        </div>
      )}
    </Section>
  );
}

function classNameJoin(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
