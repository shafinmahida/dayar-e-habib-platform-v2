import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PACKAGES_DATA } from "@/constants/packages";
import { PackageCard } from "@/components/sections/package/PackageCard";

export const metadata: Metadata = {
  title: "Premium Hajj Packages | Dayar-E-Habib",
  description: "Explore our premium Hajj packages offering comfortable accommodations, experienced guidance, and comprehensive support for your spiritual pilgrimage.",
};

export default function HajjPage() {
  const hajjPackages = PACKAGES_DATA.filter((p) => p.active && p.categorySlug === "hajj");

  return (
    <div className="bg-background">
      <Section
        title="Hajj Packages"
        subtitle="Fully organized annual Hajj tours with dedicated camps, religious guides, and scholar lectures."
      >
        <Container className="-mt-4">
          {hajjPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {hajjPackages.map((pkg) => (
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
