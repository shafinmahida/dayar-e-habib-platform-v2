import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { PACKAGES_DATA } from "@/constants/packages";
import { DESTINATIONS_DATA } from "@/constants/destination";
import { cn } from "@/lib/utils";

// Import reusable package components
import { PackageItinerary } from "@/components/sections/package/PackageItinerary";
import { PackageInclusions } from "@/components/sections/package/PackageInclusions";
import { PackageHotels } from "@/components/sections/package/PackageHotels";
import { PackageFlights } from "@/components/sections/package/PackageFlights";
import { PackageFaqs } from "@/components/sections/package/PackageFaqs";
import { PackageEnquiry } from "@/components/sections/package/PackageEnquiry";
import { PackageGallery } from "@/components/sections/package/PackageGallery";

interface PackageDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for the Next.js compiler
export async function generateStaticParams() {
  return PACKAGES_DATA.map((pkg) => ({
    slug: pkg.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({
  params,
}: PackageDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = PACKAGES_DATA.find((p) => p.slug === slug);
  if (!pkg) return {};

  return {
    title: pkg.seoTitle || `${pkg.title} | Dayar-E-Habib`,
    description:
      pkg.seoDescription ||
      `Book the ${pkg.title}. Professional guides, comfortable accommodations, and transparent pricing.`,
  };
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const pkg = PACKAGES_DATA.find((p) => p.slug === slug && p.active);

  if (!pkg) {
    notFound();
  }

  const destinationNames = pkg.destinationSlugs
    .map((slug) => DESTINATIONS_DATA.find((d) => d.slug === slug)?.name || slug)
    .join(" & ");

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Header Section */}
      <section className="bg-secondary/25 border-b border-border/45 py-12 lg:py-16">
        <Container>
          <div className="space-y-6">
            {/* Back Button */}
            <Link
              href="/tours"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1.5 -ml-3 text-muted-foreground hover:text-foreground font-medium"
              )}
            >
              <ArrowLeft className="size-4" />
              <span>Back to Packages</span>
            </Link>

            {/* Title & Metadata */}
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent uppercase tracking-wider">
                <Sparkles className="size-3 fill-current" />
                <span>{pkg.categorySlug} Tour</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                {(() => {
                  const match = pkg.title.match(/^(.*?)\s*(\(\s*\d+\+?\s*Days\s*\))$/i);
                  if (match) {
                    return (
                      <>
                        <span className="text-foreground">{match[1]}</span>
                        <span className="text-accent ml-2 text-[0.65em] font-bold tracking-widest whitespace-nowrap inline-block align-middle font-sans">
                          {match[2]}
                        </span>
                      </>
                    );
                  }
                  return pkg.title;
                })()}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold tracking-wide text-muted-foreground uppercase pt-2">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4.5 text-accent" />
                  <span className="text-foreground/90">{destinationNames}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4.5 text-accent" />
                  <span className="text-foreground/90">{pkg.duration}</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main content split layout */}
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            
            {/* Highlights */}
            <div className="space-y-5">
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Journey Highlights
              </h3>
              <ul className="grid gap-3.5 sm:grid-cols-2 text-sm text-muted-foreground" role="list">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            {pkg.itinerary && (
              <div className="space-y-6 pt-8 border-t border-border/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                    Tentative Itinerary
                  </h3>
                  <span className="inline-flex items-center text-[9px] font-black tracking-widest text-accent bg-accent/5 border border-accent/20 px-3 py-1 uppercase rounded-none select-none">
                    * Details and timelines are tentative
                  </span>
                </div>
                <PackageItinerary itinerary={pkg.itinerary} />
              </div>
            )}

            {/* Accommodation */}
            {pkg.hotels && (
              <div className="space-y-6 pt-8 border-t border-border/60">
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  Accommodation Details
                </h3>
                <PackageHotels hotels={pkg.hotels} />
              </div>
            )}

            {/* Flights */}
            {pkg.flights && (
              <div className="space-y-6 pt-8 border-t border-border/60">
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  Flight & Transport Logistics
                </h3>
                <PackageFlights flights={pkg.flights} />
              </div>
            )}

            {/* Inclusions / Exclusions */}
            {(pkg.inclusions || pkg.complimentary || pkg.exclusions) && (
              <div className="pt-8 border-t border-border/60">
                <PackageInclusions 
                  inclusions={pkg.inclusions} 
                  complimentary={pkg.complimentary} 
                  exclusions={pkg.exclusions} 
                />
              </div>
            )}

            {/* Gallery */}
            <div className="space-y-6 pt-8 border-t border-border/60">
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Gallery
              </h3>
              <PackageGallery galleryUrls={pkg.galleryUrls} mainImageUrl={pkg.imageUrl} title={pkg.title} />
            </div>

            {/* FAQs */}
            {pkg.faqs && (
              <div className="space-y-6 pt-8 border-t border-border/60">
                <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                  Package FAQs
                </h3>
                <PackageFaqs faqs={pkg.faqs} />
              </div>
            )}

          </div>

          {/* Right Column: Sticky Enquiry CTA */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <PackageEnquiry packageTitle={pkg.title} />
          </div>

        </div>
      </Container>
    </div>
  );
}
