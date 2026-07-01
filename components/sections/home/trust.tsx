import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TrustPropItem } from "@/types/cms";

interface TrustProps {
  items: TrustPropItem[];
}

export function Trust({ items }: TrustProps) {
  return (
    <Section className="bg-[#1F1A16] text-[#FCFAF5] border-y border-border/5" id="trust-heritage">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 items-start">
          {/* Left Column: Direct Narrative Essay */}
          <div className="lg:col-span-6 space-y-8">
            <div className="text-[10px] font-extrabold tracking-[0.25em] text-accent uppercase">
              Stewardship Since 1986
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-md">
              A Covenant of Personal Care.
            </h2>
            
            <div className="space-y-6 text-[#FCFAF5]/70 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
              <p>
                Organizing a pilgrimage is not a business operation; it is a sacred trust. For nearly forty years, the Dayar-E-Habib family has guided pilgrims through Hajj and Umrah with absolute devotion.
              </p>
              <p>
                We handle the complete logistical landscape—verified premium lodging, direct flights, and visas—so you can devote your full attention to the spiritual rituals. Every group is guided by experienced scholars to ensure rituals are completed with theological accuracy.
              </p>
            </div>
          </div>

          {/* Right Column: Key Legacy Pillars */}
          <div className="lg:col-span-6 space-y-12">
            {items.map((item, idx) => (
              <div key={item.id} className="space-y-4 border-b border-border/10 pb-8 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <span className="font-heading text-xs font-black text-accent/60 tracking-wider">
                    0{idx + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#FCFAF5]/60 pl-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
