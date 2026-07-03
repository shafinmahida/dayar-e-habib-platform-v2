import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TestimonialItem } from "@/types/cms";

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <Section 
      className="bg-[#FCFAF5] border-y border-border" 
      id="testimonials"
      title="Pilgrim Reflections"
      subtitle="Words of gratitude from families and individuals who have completed their sacred journeys with us."
    >
      <Container className="-mt-4 max-w-3xl">
        <div className="space-y-24">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto"
            >
              {/* Elegant Quote Symbol Accent */}
              <span className="font-serif text-6xl text-accent select-none" aria-hidden="true">&ldquo;</span>

              {/* Large, breathing quote text */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground font-serif italic -mt-8 font-light">
                {test.content}
              </blockquote>

              {/* Author Details */}
              <div className="space-y-1.5">
                <cite className="font-heading text-xs font-black text-foreground not-italic uppercase tracking-[0.2em]">
                  {test.name}
                </cite>
                <div className="flex justify-center items-center gap-2 text-[9px] font-black tracking-widest text-muted-foreground uppercase">
                  <span>{test.location}</span>
                  <span className="size-1 rounded-full bg-accent/60" aria-hidden="true" />
                  <span className="text-accent">{test.packageType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
