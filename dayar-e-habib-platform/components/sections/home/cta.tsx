import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_DATA } from "@/constants/contact";

export function Cta() {
  return (
    <Section className="bg-secondary/20 border-t border-border" id="cta-consultation">
      <Container className="-mt-4">
        <div className="mx-auto max-w-4xl rounded-md border border-border bg-card p-10 md:p-16 text-center space-y-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Plan Your Pilgrimage
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto">
            Connect with our experienced travel advisors to plan your custom pilgrimage itinerary or discuss details for upcoming group travels. We provide transparent schedules and direct guides.
          </p>
          <div className="pt-4 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 px-8 font-bold tracking-widest uppercase text-[10px] shadow-sm"
              )}
            >
              Request Group Details
            </Link>
            <a
              href={`tel:${CONTACT_DATA.primaryPhone.replace(/\s/g, "")}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 font-bold tracking-widest uppercase text-[10px] gap-2 group"
              )}
            >
              <PhoneCall className="size-4 text-accent transition-transform duration-200 group-hover:scale-105" />
              <span>Speak to a Representative</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
