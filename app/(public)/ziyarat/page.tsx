import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PackageCard } from "@/components/sections/package/PackageCard";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Ziyarat Tours",
  description: "Embark on guided tours to sacred Islamic heritage sites.",
};

export default async function ZiyaratPage() {
  const supabase = await createClient();
  
  const { data: ziyaratPackages } = await supabase
    .from('packages')
    .select(`*, package_categories!inner(slug)`)
    .eq('package_categories.slug', 'ziyarat')
    .eq('status', 'published')
    .order('display_order', { ascending: true });

  return (
    <div className="bg-background">
      <Section
        title="Ziyarat Tours"
        subtitle="Guided tours to sacred Islamic heritage sites in Iraq, Iran, Jordan & Palestine."
      >
        <Container className="-mt-4">
          {ziyaratPackages && ziyaratPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ziyaratPackages.map((pkg: any) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No Ziyarat tours are currently available. Please contact us for custom group bookings.
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
