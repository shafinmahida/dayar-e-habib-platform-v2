import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PackageCard } from "@/components/sections/package/PackageCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "All Tours & Packages | Dayar-E-Habib",
  description: "Browse all our premium Hajj, Umrah, and Ziyarat packages.",
};

export default async function ToursPage() {
  const supabase = await createClient();
  
  const { data: allPackages } = await supabase
    .from('packages')
    .select(`*, package_categories(name, slug)`)
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  return (
    <div className="bg-background">
      <Section
        title="All Tours & Packages"
        subtitle="Discover our complete catalogue of spiritual journeys and holiday packages."
      >
        <Container className="-mt-4">
          {allPackages && allPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPackages.map((pkg: any) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No packages are currently available. Please check back later.
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
