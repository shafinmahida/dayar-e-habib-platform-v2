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

      <div className="w-full relative mt-8 md:mt-16">
        {/* Horizontal scroll container with hidden scrollbar */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-10 px-6 md:px-12 lg:px-24 pb-20 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {destinations.map((dest, index) => {
            const displayImage = dest.image_url || "/kaaba-sunset.png";
            
            return (
              <div 
                key={dest.id || index} 
                className="group relative flex-none w-[85vw] sm:w-[320px] md:w-[380px] snap-center flex flex-col space-y-6 transition-all duration-700 hover:-translate-y-2"
              >
                {/* Editorial Photo Frame - Adjusted for No Cropping */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/40 bg-[#120F0D] p-2 sm:p-3 shadow-xl transition-all duration-700 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(138,106,54,0.15)]">
                  <div className="relative w-full h-full overflow-hidden rounded-lg bg-black flex items-center justify-center">
                    {/* Luxury overlays */}
                    <div className="absolute inset-0 bg-[#8A6A36]/5 mix-blend-overlay z-10 pointer-events-none" />
                    
                    <Image
                      src={displayImage}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain transition-transform duration-[2s] ease-out group-hover:scale-[1.02]"
                    />

                    {/* Image inner border for premium framing */}
                    <div className="absolute inset-2 border border-white/20 rounded pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>

                {/* Text Typography */}
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-accent" />
                    <div className="text-[9px] font-black tracking-[0.25em] text-accent uppercase">
                      {dest.country || "Sacred Land"}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground/80 line-clamp-3 font-medium">
                    {dest.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual cue for scrolling */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-[80%] bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-[80%] bg-gradient-to-r from-background to-transparent pointer-events-none hidden md:block" />
      </div>
    </Section>
  );
}
