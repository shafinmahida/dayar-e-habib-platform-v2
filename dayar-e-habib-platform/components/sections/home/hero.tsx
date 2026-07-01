import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_DATA } from "@/constants/company";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background min-h-[85vh] lg:min-h-[92vh] flex items-center border-b border-border pb-16 lg:pb-0">
      {/* Soft radial backdrop canvas glow */}
      <div 
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_15%,rgba(133,105,54,0.045)_0%,transparent_90%)]" 
      />
      
      <Container className="py-20 lg:py-0">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column - Luxury Editorial Proportions */}
          <div className="flex flex-col items-start text-left lg:col-span-7 xl:col-span-6 space-y-10">
            
            <div className="text-[10px] font-extrabold tracking-[0.3em] text-accent uppercase">
              Established {COMPANY_DATA.establishedYear} — Serving Pilgrims
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-lg">
              A Heritage <br />
              of Faith. <br />
              <span className="text-muted-foreground font-normal italic">Guided by Trust.</span>
            </h1>

            <p className="max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
              We specialize in premium, scholar-led Hajj, Umrah, and Ziyarat journeys, prioritizing quiet personal devotion, comfort, and transparent care.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-4">
              <Link
                href="/tours"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-12 px-8 font-bold tracking-widest uppercase text-[9px] flex items-center justify-center gap-2"
                )}
              >
                <span>Explore Journeys</span>
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8 font-bold tracking-widest uppercase text-[9px] flex items-center justify-center"
                )}
              >
                Connect with Advisor
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-10 border-t border-border w-full text-[9px] font-extrabold tracking-[0.2em] text-muted-foreground uppercase">
              {COMPANY_DATA.registrations.map((reg) => (
                <div key={reg} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
                  <span>{reg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Photography Frame with Arched Portals & Video loop indicator */}
          <div className="relative lg:col-span-5 xl:col-span-6 w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-[460px] overflow-hidden rounded-arch-t border border-border bg-card p-3 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
              {/* Luxury sepia wash overlay */}
              <div className="absolute inset-0 bg-[#856936]/4 mix-blend-color z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10 pointer-events-none" />
              
              {/* Quiet Media Looping Indicator Badge */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-xs bg-[#1F1A16]/85 px-3 py-1.5 text-[8px] font-extrabold tracking-widest text-[#FCFAF5] uppercase backdrop-blur-xs select-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
                <span>Masjid Al-Haram — Live</span>
              </div>

              <Image
                src="/makkah-hero.png"
                alt="Kaaba at Masjid Al-Haram in Makkah, framed in an understated Islamic arch shape"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-arch-t transition-transform duration-700 ease-out hover:scale-102"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
