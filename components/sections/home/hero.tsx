import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_DATA } from "@/constants/company";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background flex items-center border-b border-border/20 py-16 lg:py-24">
      {/* Soft atmospheric gradient */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(138,106,54,0.065)_0%,transparent_70%)]" 
      />
      
      <Container className="w-full">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Panel: Narrative Intro */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-8 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#8A6A36]/20 bg-[#F2EBDB]/60 px-4 py-1.5 text-[8.5px] font-black tracking-widest text-[#8A6A36] uppercase w-fit select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
              </span>
              <span>Serving Pilgrims Since 1986</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] max-w-xl">
                A Sacred <br />
                Journey. <br />
                <span className="text-muted-foreground/80 font-normal italic font-serif">Guided by Faith.</span>
              </h1>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground/90 font-medium">
                Established in {COMPANY_DATA.establishedYear}, Dayar-E-Habib orchestrates premium, scholar-led Hajj, Umrah, and Ziyarat experiences, focusing on deep personal devotion and comfort.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/tours"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-14 px-9 font-extrabold tracking-[0.25em] uppercase text-[9px] flex items-center justify-center gap-2.5",
                  "bg-primary text-primary-foreground hover:bg-accent transition-all duration-300 rounded-none shadow-none"
                )}
              >
                <span>View Offerings</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-14 px-9 font-extrabold tracking-[0.25em] uppercase text-[9px] flex items-center justify-center",
                  "border border-border bg-transparent hover:bg-card/85 text-foreground transition-all duration-300 rounded-none"
                )}
              >
                Connect with Advisor
              </Link>
            </div>

            {/* Accreditations & Memberships */}
            <div className="pt-8 border-t border-border/40 w-full space-y-3">
              <h4 className="text-[9px] font-black tracking-widest text-muted-foreground/60 uppercase select-none">
                Accreditations & Memberships
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full select-none">
                {/* Ministry of Minority Affairs (India) */}
                <div className="flex items-center gap-3 bg-card/15 border border-border/25 px-4 py-2.5 rounded-xl transition-all duration-300 hover:border-accent/35">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/minority-affairs-logo.png"
                      alt="Ministry of Minority Affairs Logo"
                      fill
                      className="object-contain filter grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[7.5px] font-black tracking-widest text-accent uppercase leading-none">Government of India</div>
                    <div className="text-[10px] font-extrabold text-foreground uppercase leading-tight">Ministry of Minority Affairs</div>
                    <div className="text-[7.5px] font-bold text-muted-foreground/80 uppercase leading-none">Hajj Organiser License</div>
                  </div>
                </div>

                {/* IATA Certified */}
                <div className="flex items-center gap-3 bg-card/15 border border-border/25 px-4 py-2.5 rounded-xl transition-all duration-300 hover:border-accent/35">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/iata-logo.png"
                      alt="IATA Certified Logo"
                      fill
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[7.5px] font-black tracking-widest text-accent uppercase leading-none">Accredited Agency</div>
                    <div className="text-[10px] font-extrabold text-foreground uppercase leading-tight">IATA Certified</div>
                    <div className="text-[7.5px] font-bold text-muted-foreground/80 uppercase leading-none">Global Aviation Standard</div>
                  </div>
                </div>

                {/* AIHUTOA Member */}
                <div className="flex items-center gap-3 bg-card/15 border border-border/25 px-4 py-2.5 rounded-xl transition-all duration-300 hover:border-accent/35">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/aihutoa-logo.png"
                      alt="AIHUTOA Member Logo"
                      fill
                      className="object-contain filter grayscale contrast-125 brightness-95 hover:grayscale-0 transition-all duration-300"
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

          {/* Right Panel: Portrait Editorial Frame */}
          <div className="relative lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/5] max-w-[460px] overflow-hidden rounded-none border border-border bg-card p-3 shadow-[0_24px_60px_rgba(0,0,0,0.02)] group transition-all duration-700 hover:border-accent/40">
              <div className="relative w-full h-full overflow-hidden border border-border/30 rounded-none bg-muted">
                {/* Luxury tint overlay */}
                <div className="absolute inset-0 bg-[#8A6A36]/3 mix-blend-color z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A16]/20 via-transparent to-transparent z-10 pointer-events-none" />
                
                {/* Live Status Badge */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2.5 rounded-none bg-[#1E1A16]/90 px-4 py-2 text-[8px] font-black tracking-[0.25em] text-[#FCFAF5] uppercase select-none border border-border/10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                  </span>
                  <span>Masjid Al-Haram — Golden Hour</span>
                </div>

                <Image
                  src="/kaaba-sunset.png"
                  alt="Kaaba at Masjid Al-Haram in Makkah, framed in an understated modern gallery frame"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-none transition-transform duration-[1200ms] ease-out group-hover:scale-104"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
