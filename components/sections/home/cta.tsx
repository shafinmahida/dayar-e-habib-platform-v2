import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export async function Cta() {
  const supabase = await createClient();
  const { data } = await supabase.from('contact_offices').select('phone').limit(1).single();
  const phone = data?.phone || "+91 91722 22718";

  return (
    <Section className="bg-[#FCFAF5] border-t border-border py-32" id="cta-consultation">
      <Container className="-mt-4">
        <div className="mx-auto max-w-3xl border border-border bg-card p-10 md:p-20 text-center space-y-10 shadow-[0_12px_40px_rgba(0,0,0,0.01)] rounded-none">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">
            Plan Your Pilgrimage
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
            Begin Your Spiritual Journey.
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground/90 max-w-lg mx-auto">
            Connect with our experienced group guides and travel advisors to plan your custom pilgrimage itinerary or discuss registration options for upcoming group packages.
          </p>
          <div className="pt-4 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 px-9 font-black tracking-[0.25em] uppercase text-[9px] bg-primary text-primary-foreground hover:bg-accent rounded-none transition-all duration-300 shadow-none"
              )}
            >
              Request Details
            </Link>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-14 px-9 font-black tracking-[0.25em] uppercase text-[9px] gap-2.5 group border-border bg-transparent hover:bg-card/85 text-foreground transition-all duration-300 rounded-none"
              )}
            >
              <PhoneCall className="size-3.5 text-accent transition-transform duration-300 group-hover:scale-105" />
              <span>Speak with Advisor</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
