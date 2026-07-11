import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Destinations | Dayar-E-Habib",
  description: "Explore the holy cities and historical sites covered in our spiritual journeys.",
};

export default async function DestinationsPage() {
  const supabase = await createClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-[#F2EBDB] pt-24 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="max-w-3xl mb-12">
          <span className="inline-flex items-center text-[9px] font-black tracking-widest text-accent uppercase bg-accent/5 border border-accent/20 px-3 py-1 mb-4 select-none">
            Sacred Sites
          </span>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Holy Destinations
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground/90">
            Explore the historical significance, spiritual majesty, and profound beauty of the sacred cities and sites we visit.
          </p>
        </header>

        {destinations && destinations.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <Link 
                key={dest.id} 
                href={`/destinations/${dest.slug}`}
                className="group flex flex-col bg-[#FCFAF5] rounded-2xl overflow-hidden border border-border/45 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {dest.image_url ? (
                  <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                    <SmartMediaPlayer url={dest.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold">No Media</span>
                  </div>
                )}
                
                <div className="flex-1 p-6 flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-2">
                    {dest.country || "Sacred Land"}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {dest.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FCFAF5]/40 border border-dashed border-[#DDD3C1] rounded-2xl">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              No destinations have been added yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
