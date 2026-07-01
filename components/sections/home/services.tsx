import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Service } from "@/types/service";

interface ServicesProps {
  items: Service[];
}

export function Services({ items }: ServicesProps) {
  return (
    <Section className="bg-secondary/20 border-y border-border" id="services">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Sticky Title & Description */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
              Our Capabilities
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-none">
              Services
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              Comprehensive administrative, visa, lodging, and logistical ground arrangements for domestic and international pilgrims.
            </p>
          </div>

          {/* Right Column: Editorial Typography-driven list */}
          <div className="lg:col-span-8 space-y-20">
            {items.filter(s => s.active).map((service, index) => {
              const displayIndex = String(index + 1).padStart(2, "0");

              return (
                <div 
                  key={service.slug} 
                  className="group flex flex-col sm:flex-row gap-6 sm:gap-10 items-start border-b border-border/60 pb-12 last:border-b-0"
                >
                  {/* Big Muted Number */}
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent/35 select-none tracking-tight">
                    {displayIndex}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-4 flex-1">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
                      {service.description}
                    </p>
                    
                    {/* Inline Muted Details List */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-semibold tracking-wider text-foreground/80 uppercase">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {idx > 0 && <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />}
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
