import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PACKAGES_DATA } from "@/constants/packages";
import { PackageCard } from "@/components/sections/package/PackageCard";

export const metadata: Metadata = {
  title: "Sacred Ziyarat Packages | Dayar-E-Habib",
  description: "Browse our premium Ziyarat tour packages. Scholar-guided devotions and comfortable hotel bookings in Baghdad, Najaf, and Karbala.",
};

export default function ZiyaratPage() {
  const ziyaratPackages = PACKAGES_DATA.filter((p) => p.active && p.categorySlug === "ziyarat");

  return (
    <div className="bg-background">
      <Section
        title="Ziyarat Packages"
        subtitle="Scholar-guided tours to sacred shrines and historical landmarks of Baghdad, Najaf, and Karbala."
      >
        <Container className="-mt-4">
          {ziyaratPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {ziyaratPackages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No Ziyarat packages are currently available. Please contact us for custom group bookings.
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
