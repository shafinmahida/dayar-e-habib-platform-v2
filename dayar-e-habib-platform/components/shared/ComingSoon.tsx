import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <Section className="flex flex-1 items-center justify-center py-20 lg:py-32">
      <Container className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 animate-pulse">
          <Clock className="size-8" />
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <div className="mx-auto mt-4 h-1 w-12 bg-primary rounded" />
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
        <p className="mt-2 text-sm text-foreground/50">
          We are currently preparing this section to bring you the best experience. Stay tuned!
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-2 transition-all hover:-translate-x-1"
            )}
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
