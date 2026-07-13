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
        <div className="space-y-16">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              className="relative w-full max-w-xl mx-auto bg-[#FDFCF7] border border-[#CFC4AF]/80 shadow-[0_20px_50px_rgba(30,26,22,0.04)] p-8 pt-10 rounded-sm"
            >
              {/* Spiral Binder Loops at the top of the notepad card */}
              <div className="absolute top-0 left-0 right-0 -translate-y-3 flex justify-between px-10 select-none z-10">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Steel Ring */}
                    <div className="w-1.5 h-6 rounded-full bg-stone-300 border border-stone-400 shadow-sm" />
                    {/* Ring Hole */}
                    <div className="w-2 h-2 rounded-full bg-[#FCFAF5] border border-[#CFC4AF] -mt-1.5" />
                  </div>
                ))}
              </div>

              {/* Ruled Notebook Paper Content Frame */}
              <div 
                className="relative border-l-2 border-red-300/40 pl-8 pr-2 py-1"
                style={{
                  backgroundImage: "linear-gradient(#d1e4f3 1px, transparent 1px)",
                  backgroundSize: "100% 2.3rem",
                  lineHeight: "2.3rem",
                }}
              >
                <blockquote className="font-handwritten text-xl sm:text-2xl font-bold text-[#2A241E] leading-[2.3rem] text-left">
                  &ldquo;{test.content}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4 text-left">
                  {test.avatar_url && (
                    <div className="relative size-14 rotate-[-3deg] border-2 border-white rounded-md shadow-md shrink-0 bg-stone-100 overflow-hidden transform hover:rotate-0 transition-transform duration-300 z-10">
                      <img 
                        src={test.avatar_url} 
                        alt={test.name} 
                        className="w-full h-full object-cover"
                      />
                      {/* Glossy sheen overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <cite className="block font-handwritten text-lg sm:text-xl font-bold text-accent not-italic">
                      — {test.name}
                    </cite>
                    <div className="text-[9px] font-sans font-black tracking-widest text-muted-foreground uppercase flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>{test.location}</span>
                      <span className="text-accent/60" aria-hidden="true">&bull;</span>
                      <span className="text-accent">{test.package_type || test.packageType || 'General'}</span>
                      {test.rating && (
                        <>
                          <span className="text-accent/60" aria-hidden="true">&bull;</span>
                          <span className="text-amber-500 font-bold flex items-center gap-0.5">
                            ★ {test.rating}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
