import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TimelineStep } from "@/types/cms";

interface JourneyTimelineProps {
  steps: TimelineStep[];
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  return (
    <Section 
      className="bg-background" 
      id="journey-timeline"
      title="The Pilgrimage Chronicle"
      subtitle="From your initial consultation to your return home, every stage is structured with transparency."
    >
      <Container className="-mt-4 max-w-3xl">
        <div className="relative border-l border-border pl-8 sm:pl-12 ml-4 sm:ml-6 space-y-16 py-4">
          
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[53px] sm:-left-[69px] top-1.5 flex size-10 items-center justify-center rounded-xs border border-border bg-card font-heading text-xs font-bold text-foreground transition-all duration-300 group-hover:border-accent shadow-[0_2px_8px_rgba(0,0,0,0.01)] select-none">
                {step.stepNumber}
              </div>

              {/* Content block */}
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
