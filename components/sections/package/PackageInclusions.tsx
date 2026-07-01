import { Check, X } from "lucide-react";

interface PackageInclusionsProps {
  inclusions?: string[];
  exclusions?: string[];
}

export function PackageInclusions({ inclusions, exclusions }: PackageInclusionsProps) {
  const hasInclusions = inclusions && inclusions.length > 0;
  const hasExclusions = exclusions && exclusions.length > 0;

  if (!hasInclusions && !hasExclusions) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {hasInclusions && (
        <div className="space-y-6 rounded-md border border-border bg-card p-8">
          <h4 className="font-heading text-lg font-bold text-foreground tracking-tight border-b border-border/80 pb-4">
            What is Included
          </h4>
          <ul className="space-y-4" role="list">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Check className="size-4 shrink-0 text-accent mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasExclusions && (
        <div className="space-y-6 rounded-md border border-border bg-card p-8">
          <h4 className="font-heading text-lg font-bold text-foreground tracking-tight border-b border-border/80 pb-4">
            What is Excluded
          </h4>
          <ul className="space-y-4" role="list">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="size-4 shrink-0 text-destructive mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
