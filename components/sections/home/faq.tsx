import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/cms";

interface FaqProps {
  items: FaqItem[];
}

export function Faq({ items }: FaqProps) {
  return (
    <Section 
      className="bg-background" 
      id="faq"
      title="Frequently Asked Questions"
      subtitle="Find answers to common logistical and booking queries regarding Hajj, Umrah, and Ziyarat."
    >
      <Container className="-mt-4 max-w-3xl">
        <Accordion>
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-border/80">
              <AccordionTrigger className="font-heading text-base font-semibold py-5 text-foreground hover:no-underline hover:text-accent transition-colors duration-200">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
