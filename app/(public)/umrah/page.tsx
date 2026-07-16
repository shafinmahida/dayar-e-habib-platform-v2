import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PackageCard } from "@/components/sections/package/PackageCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Premium Umrah Packages",
  description: "Experience a spiritually enriching Umrah with our curated packages.",
};

export default async function UmrahPage() {
  const supabase = await createClient();
  
  const { data: umrahPackages } = await supabase
    .from('packages')
    .select(`*, package_categories!inner(slug)`)
    .eq('package_categories.slug', 'umrah')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  return (
    <div className="bg-background">
      <Section
        title="Umrah Packages"
        subtitle="Curated spiritual journeys to the holy cities of Makkah and Madinah."
      >
        <Container className="-mt-4">
          {umrahPackages && umrahPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {umrahPackages.map((pkg: any) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No Umrah packages are currently available. Please contact us for custom group bookings.
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
