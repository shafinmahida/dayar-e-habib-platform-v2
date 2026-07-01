import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { CONTACT_DATA } from "@/constants/contact";
import { COMPANY_DATA } from "@/constants/company";
import { PackageEnquiry } from "@/components/sections/package/PackageEnquiry";

export const metadata: Metadata = {
  title: "Contact Us | Dayar-E-Habib",
  description: "Get in touch with our travel advisors to book a package, ask questions, or customize your pilgrimage itinerary.",
};

export default function ContactPage() {
  const primaryOffice = CONTACT_DATA.offices.find((o) => o.active) || CONTACT_DATA.offices[0];

  return (
    <div className="bg-background min-h-screen">
      {/* Header Banner */}
      <section className="bg-secondary/25 border-b border-border/45 py-12 lg:py-16">
        <Container>
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent uppercase tracking-wider">
              <Sparkles className="size-3 fill-current" />
              <span>Get In Touch</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Contact Our Travel Advisors
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
              We are here to assist you with visa processing, hotel bookings, flight tickets, or planning your personalized Hajj, Umrah, or Ziyarat journey.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form & Office Info Split Grid */}
      <Container className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            
            {/* Main Office Info */}
            {primaryOffice && (
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {primaryOffice.name}
                </h3>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-4 p-6 bg-card border border-border rounded-md">
                    <MapPin className="size-5 text-accent mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-foreground/80 uppercase">Address</div>
                      <address className="text-sm not-italic leading-relaxed text-muted-foreground">
                        {primaryOffice.address}
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 bg-card border border-border rounded-md">
                    <Clock className="size-5 text-accent mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-foreground/80 uppercase">Office Hours</div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {primaryOffice.workingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Connect Details */}
            <div className="space-y-6 pt-8 border-t border-border/60">
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Direct Communications
              </h3>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <a
                  href={`tel:${CONTACT_DATA.primaryPhone.replace(/\s/g, "")}`}
                  className="flex gap-4 p-6 bg-card border border-border rounded-md hover:border-accent/40 transition-colors duration-200"
                >
                  <Phone className="size-5 text-accent mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground/80 uppercase">Primary Phone</div>
                    <p className="text-sm font-bold text-foreground">
                      {CONTACT_DATA.primaryPhone}
                    </p>
                    <p className="text-xs text-muted-foreground">Call or message via WhatsApp</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_DATA.primaryEmail}`}
                  className="flex gap-4 p-6 bg-card border border-border rounded-md hover:border-accent/40 transition-colors duration-200"
                >
                  <Mail className="size-5 text-accent mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground/80 uppercase">Email Address</div>
                    <p className="text-sm font-bold text-foreground">
                      {CONTACT_DATA.primaryEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">For bookings, quotes & enquiries</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Accreditations Section */}
            <div className="space-y-6 pt-8 border-t border-border/60">
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Accreditations & Memberships
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Dayar-E-Habib Tours & Travels is fully licensed and recognized by major global aviation and pilgrimage authorities:
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs font-semibold tracking-wide text-muted-foreground uppercase pt-2">
                {COMPANY_DATA.registrations.map((reg) => (
                  <div key={reg} className="flex items-center gap-2 px-3 py-1.5 bg-secondary/40 border border-border/50 rounded-sm">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    <span>{reg}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Message Box */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <PackageEnquiry packageTitle="General Enquiry" />
          </div>

        </div>
      </Container>
    </div>
  );
}
