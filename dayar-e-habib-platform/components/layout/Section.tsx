import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/components";

export function Section({
  title,
  subtitle,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-20 md:py-28 lg:py-32 transition-colors duration-300 ease-in-out", 
        className
      )}
    >
      <Container>
        {(title || subtitle) && (
          <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            {title && (
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
