import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Package } from "@/types/package";
import { PackageCard } from "@/components/sections/package/PackageCard";

interface FeaturedPackagesProps {
  packages: Package[];
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  return (
    <Section 
      className="bg-secondary/20 border-y border-border" 
      id="featured-packages"
      title="Featured Packages"
      subtitle="Select custom itineraries curated for your spiritual devotion and absolute comfort."
    >
      <Container className="-mt-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.filter(pkg => pkg.active && pkg.featured).map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
