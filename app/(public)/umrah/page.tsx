import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PACKAGES_DATA } from "@/constants/packages";
import { PackageCard } from "@/components/sections/package/PackageCard";

export const metadata: Metadata = {
  title: "Premium Umrah Packages | Dayar-E-Habib",
  description: "Browse custom and group Umrah packages. Includes hotel arrangements near Masjid Al-Haram and Masjid An-Nabawi.",
};

export default function UmrahPage() {
  const umrahPackages = PACKAGES_DATA.filter((p) => p.active && p.categorySlug === "umrah");

  return (
    <div className="bg-background">
      <Section
        title="Umrah Packages"
        subtitle="Umrah tour packages with premium hotel accommodations close to Haram, visa processing, and transport."
      >
        <Container className="-mt-4">
          {umrahPackages.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {umrahPackages.map((pkg) => (
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
