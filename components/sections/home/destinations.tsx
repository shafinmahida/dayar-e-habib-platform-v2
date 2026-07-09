import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DESTINATIONS_DATA } from "@/lib/data/destinations";

export function Destinations() {
  // Map destination slugs to generated luxury photos
  const destImageMap: Record<string, string> = {
    makkah: "/kaaba-sunset.png",
    madinah: "/madinah-dawn.png",
    baghdad: "/ziyarat-dome.png",
  };

  return (
    <Section 
      className="bg-background border-t border-border/20" 
      id="destinations"
      title="Sacred Destinations"
      subtitle="Guiding you to the spiritual hearts of Hajj, Umrah, and historical Ziyarat journeys."
    >
      <Container className="-mt-4">
        <div className="grid gap-12 md:grid-cols-3 items-start">
          {DESTINATIONS_DATA.filter(d => d.active).map((dest, index) => {
            // Apply offset layout to create editorial asymmetric rhythm
            const offsetClass = index === 1 ? "md:translate-y-8" : "";
            const displayImage = destImageMap[dest.slug] || dest.imageUrl || "/kaaba-sunset.png";
            const displayName = dest.slug === "baghdad" ? "Sacred Ziyarat Shrines" : dest.name;
            
            return (
              <div 
                key={dest.slug} 
                className={classNameJoin(
                  "group flex flex-col space-y-6 transition-transform duration-500",
                  offsetClass
                )}
              >
                {/* Photo window framed inside luxury gallery rectangular borders */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none border border-border bg-card p-3 shadow-[0_8px_32px_rgba(0,0,0,0.015)] transition-all duration-300 hover:border-accent/40">
                  <div className="relative w-full h-full overflow-hidden border border-border/30">
                    {/* Luxury filter overlay */}
                    <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A16]/10 to-transparent z-10 pointer-events-none" />
                    
                    <Image
                      src={displayImage}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-104"
                    />
                  </div>
                </div>

                {/* Text details */}
                <div className="space-y-2 px-1">
                  <div className="text-[9px] font-black tracking-[0.25em] text-accent uppercase">
                    {dest.slug === "baghdad" ? "Baghdad & Karbala" : dest.country}
                  </div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {displayName}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground/90">
                    {dest.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function classNameJoin(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
