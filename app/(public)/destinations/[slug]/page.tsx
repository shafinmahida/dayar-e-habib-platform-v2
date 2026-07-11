import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { SmartMediaPlayer } from "@/components/shared/SmartMediaPlayer";
import { PackageCard } from "@/components/sections/package/PackageCard";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = await createClient();
  const { data: destination } = await supabase
    .from("destinations")
    .select("name, description")
    .eq("slug", params.slug)
    .single();

  if (!destination) return { title: "Destination Not Found" };

  return {
    title: `${destination.name} | Dayar-E-Habib`,
    description: destination.description?.substring(0, 160) || `Explore ${destination.name} with Dayar-E-Habib Tours.`,
  };
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  
  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!destination) {
    notFound();
  }

  // Fetch packages that contain this destination's ID in their destination_ids array
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .contains("destination_ids", [destination.id])
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F2EBDB] pt-24 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="inline-flex items-center text-[9px] font-black tracking-widest text-accent uppercase bg-accent/5 border border-accent/20 px-3 py-1 select-none">
              {destination.country || "Sacred Destination"}
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {destination.name}
            </h1>
            <div className="prose prose-sm sm:prose-base prose-stone text-muted-foreground/90 max-w-none">
              {destination.description?.split('\n').map((paragraph: string, i: number) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            {destination.image_url ? (
              <div className="relative aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-2xl">
                <SmartMediaPlayer url={destination.image_url} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="relative aspect-[4/3] bg-[#FCFAF5] border border-dashed border-border rounded-2xl flex items-center justify-center">
                <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold">No Media Available</span>
              </div>
            )}
          </div>
        </div>

        {/* Packages Section */}
        <div className="pt-12 border-t border-[#DDD3C1]">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground mb-8">
            Tours visiting {destination.name}
          </h2>
          
          {packages && packages.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FCFAF5]/40 border border-dashed border-[#DDD3C1] rounded-2xl">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Currently, no active tours visit this destination.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
