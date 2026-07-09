import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

import { Container } from "@/components/layout/Container";
import { PackageEnquiry } from "@/components/sections/package/PackageEnquiry";

export const metadata: Metadata = {
  title: "Contact Us | Dayar-E-Habib",
  description: "Get in touch with our travel advisors to book a package, ask questions, or customize your pilgrimage itinerary.",
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: offices } = await supabase.from('contact_offices').select('*').eq('active', true).order('display_order');
  const primaryOffice = offices?.[0];

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
                      {primaryOffice.map_link ? (
                        <a 
                          href={primaryOffice.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm not-italic leading-relaxed text-muted-foreground hover:text-accent transition-colors duration-200"
                        >
                          <address className="not-italic cursor-pointer">
                            {primaryOffice.address}
                          </address>
                        </a>
                      ) : (
                        <address className="text-sm not-italic leading-relaxed text-muted-foreground">
                          {primaryOffice.address}
                        </address>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 p-6 bg-card border border-border rounded-md">
                    <Clock className="size-5 text-accent mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-foreground/80 uppercase">Office Hours</div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {primaryOffice.working_hours}
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
                  href={`tel:${(primaryOffice?.phone || "").replace(/\s/g, "")}`}
                  className="flex gap-4 p-6 bg-card border border-border rounded-md hover:border-accent/40 transition-colors duration-200"
                >
                  <Phone className="size-5 text-accent mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground/80 uppercase">Contact us</div>
                    <p className="text-sm font-bold text-foreground whitespace-nowrap">
                      {primaryOffice?.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">Call or message via WhatsApp</p>
                  </div>
                </a>

                <a
                  href={`mailto:${primaryOffice?.email}`}
                  className="flex gap-4 p-6 bg-card border border-border rounded-md hover:border-accent/40 transition-colors duration-200"
                >
                  <Mail className="size-5 text-accent mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-foreground/80 uppercase">Email Address</div>
                    <p className="text-sm font-bold text-foreground">
                      {primaryOffice?.email}
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
              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                {/* Ministry of Minority Affairs (India) */}
                <div className="flex items-center gap-3.5 bg-card border border-border p-4 rounded-xl hover:border-accent/40 transition-all duration-300">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/minority-affairs-logo.png"
                      alt="Ministry of Minority Affairs Government of India Logo"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[7.5px] font-black tracking-widest text-accent uppercase leading-none">Government of India</div>
                    <div className="text-[10px] font-extrabold text-foreground uppercase leading-tight">Ministry of Minority Affairs</div>
                    <div className="text-[7.5px] font-bold text-muted-foreground/80 uppercase leading-none">Hajj Organiser License</div>
                  </div>
                </div>

                {/* IATA Certified */}
                <div className="flex items-center gap-3.5 bg-card border border-border p-4 rounded-xl hover:border-accent/40 transition-all duration-300">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/iata-logo.png"
                      alt="IATA Certified Logo"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[7.5px] font-black tracking-widest text-accent uppercase leading-none">Accredited Agency</div>
                    <div className="text-[10px] font-extrabold text-foreground uppercase leading-tight">IATA Certified</div>
                    <div className="text-[7.5px] font-bold text-muted-foreground/80 uppercase leading-none">Global Aviation Standard</div>
                  </div>
                </div>

                {/* AIHUTOA Member */}
                <div className="flex items-center gap-3.5 bg-card border border-border p-4 rounded-xl hover:border-accent/40 transition-all duration-300">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/aihutoa-logo.png"
                      alt="AIHUTOA Member Logo"
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[7.5px] font-black tracking-widest text-accent uppercase leading-none">Registered Association</div>
                    <div className="text-[10px] font-extrabold text-foreground uppercase leading-tight">AIHUTOA Member</div>
                    <div className="text-[7.5px] font-bold text-muted-foreground/80 uppercase leading-none">National Pilgrimage Body</div>
                  </div>
                </div>
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
