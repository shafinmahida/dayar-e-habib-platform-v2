import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PackageFaq } from "@/types/package";

interface PackageFaqsProps {
  faqs?: PackageFaq[];
}

export function PackageFaqs({ faqs }: PackageFaqsProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <Accordion>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border/80">
            <AccordionTrigger className="font-heading text-base font-semibold py-4 text-foreground hover:no-underline hover:text-accent transition-colors duration-200">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
