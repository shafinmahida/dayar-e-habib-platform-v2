interface PackageInclusionsProps {
  inclusions?: string[];
  complimentary?: string[];
  exclusions?: string[];
}

export function PackageInclusions({ inclusions, complimentary, exclusions }: PackageInclusionsProps) {
  const hasInclusions = inclusions && inclusions.length > 0;
  const hasComplimentary = complimentary && complimentary.length > 0;
  const hasExclusions = exclusions && exclusions.length > 0;

  if (!hasInclusions && !hasComplimentary && !hasExclusions) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {hasInclusions && (
        <div className="space-y-6 rounded-md border border-border bg-card p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <h4 className="font-heading text-lg font-bold text-foreground tracking-tight border-b border-border/80 pb-4">
            What is Included
          </h4>
          <ul className="space-y-4" role="list">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasComplimentary && (
        <div className="space-y-6 rounded-md border border-border bg-card p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <h4 className="font-heading text-lg font-bold text-accent tracking-tight border-b border-border/80 pb-4">
            Complimentary Services
          </h4>
          <ul className="space-y-4" role="list">
            {complimentary.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-accent/90">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="leading-relaxed font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasExclusions && (
        <div className="space-y-6 rounded-md border border-border bg-card p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <h4 className="font-heading text-lg font-bold text-foreground tracking-tight border-b border-border/80 pb-4">
            What is Excluded
          </h4>
          <ul className="space-y-4" role="list">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive/60" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
