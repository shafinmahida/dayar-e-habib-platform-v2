import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PACKAGES_DATA } from "@/constants/packages";
import { PackageCard } from "@/components/sections/package/PackageCard";

export const metadata: Metadata = {
  title: "All Pilgrimage & Ziyarat Packages | Dayar-E-Habib",
  description: "Browse our complete catalog of scholar-guided Hajj, Umrah, and historical Ziyarat packages. Secure your sacred journey today.",
};

export default function ToursPage() {
  const activePackages = PACKAGES_DATA.filter((p) => p.active);

  return (
    <div className="bg-background">
      <Section
        title="Our Pilgrimage Packages"
        subtitle="Browse our comprehensive selection of Hajj, Umrah, and scholar-guided Ziyarat packages."
      >
        <Container className="-mt-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activePackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
