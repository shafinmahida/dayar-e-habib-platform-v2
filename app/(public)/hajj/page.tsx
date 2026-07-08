import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PackageCard } from "@/components/sections/package/PackageCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Premium Hajj Packages | Dayar-E-Habib",
  description: "Explore our premium Hajj packages offering comfortable accommodations, experienced guidance, and comprehensive support for your spiritual pilgrimage.",
};

export default async function HajjPage() {
  const supabase = await createClient();
  
  // We need to fetch the category ID for 'hajj' first, or just join it
  const { data: hajjPackages } = await supabase
    .from('packages')
    .select(`*, package_categories!inner(slug)`)
    .eq('package_categories.slug', 'hajj')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  return (
    <div className="bg-background">
      <Section
        title="Hajj Packages"
        subtitle="Fully organized annual Hajj tours with dedicated camps, religious guides, and scholar lectures."
      >
        <Container className="-mt-4">
          {hajjPackages && hajjPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hajjPackages.map((pkg: any) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No Hajj packages are currently available. Please contact us for custom group bookings.
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
