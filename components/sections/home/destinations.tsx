import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { createClient } from "@/lib/supabase/server";

export async function Destinations() {
  const supabase = await createClient();
  // Fetch dynamic destinations from backend
  const { data: destinationsData } = await supabase.from("destinations").select("*").order("created_at");
  
  const destinations = destinationsData || [];

  return (
    <Section 
      className="bg-background border-t border-border/10 overflow-hidden relative" 
      id="destinations"
      title="Sacred Destinations"
      subtitle="Guiding you to the spiritual hearts of Hajj, Umrah, and historical Ziyarat journeys."
    >
      {/* Background elegant gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

      <div className="w-full relative mt-8 md:mt-12">
        {/* CSS Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 px-6 md:px-12 lg:px-24 pb-20 pt-4 max-w-[1600px] mx-auto w-full">
          {destinations.map((dest, index) => {
            const displayImage = dest.image_url || "/kaaba-sunset.png";
            
            return (
              <div 
                key={dest.id || index} 
                className="group relative flex flex-col space-y-4 transition-all duration-700 hover:-translate-y-2 break-inside-avoid mb-10"
              >
                {/* Natural Image Dimensions Frame */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-border/40 shadow-xl transition-all duration-700 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(138,106,54,0.15)] bg-[#120F0D]">
                  {/* Luxury overlays */}
                  <div className="absolute inset-0 bg-[#8A6A36]/5 mix-blend-overlay z-10 pointer-events-none" />
                  
                  {/* Intrinsic Image sizing to perfectly wrap whatever size was uploaded */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayImage}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                  />

                  {/* Image inner border for premium framing */}
                  <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Text Typography */}
                <div className="space-y-3 px-2 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-accent" />
                    <div className="text-[9px] font-black tracking-[0.25em] text-accent uppercase">
                      {dest.country || "Sacred Land"}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground/80 font-medium">
                    {dest.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
