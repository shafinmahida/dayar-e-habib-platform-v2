import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { TrustPropItem } from "@/types/cms";

interface WhyChooseUsProps {
  items: TrustPropItem[];
}

export function WhyChooseUs({ items }: WhyChooseUsProps) {
  return (
    <Section 
      className="bg-background" 
      id="why-choose-us"
      title="Why Families Trust Us"
      subtitle="Refined standards of personal stewardship, scholar guidance, and secure logistics."
    >
      <Container className="-mt-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border/60">
          {items.map((item, index) => (
            <div key={item.id} className="space-y-4 lg:first:pl-0 lg:pl-8">
              <div className="text-[9px] font-extrabold text-accent tracking-[0.25em] uppercase">
                Pillar 0{index + 1}
              </div>
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
