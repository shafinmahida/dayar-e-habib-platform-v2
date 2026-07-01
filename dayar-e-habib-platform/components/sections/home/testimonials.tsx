import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TestimonialItem } from "@/types/cms";

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <Section 
      className="bg-secondary/20 border-y border-border" 
      id="testimonials"
      title="Pilgrim Experiences"
      subtitle="Reflections from clients who have completed their sacred journeys with us."
    >
      <Container className="-mt-4 max-w-4xl">
        <div className="space-y-24">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
            >
              {/* Elegant Quote Symbol Accent */}
              <span className="font-serif text-5xl text-accent/40 select-none">&ldquo;</span>

              {/* Large, breathing quote text */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground/90 font-medium italic -mt-6">
                {test.content}
              </blockquote>

              {/* Author Details */}
              <div className="space-y-1">
                <cite className="font-heading text-sm font-bold text-foreground not-italic uppercase tracking-widest">
                  {test.name}
                </cite>
                <div className="flex justify-center items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
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
