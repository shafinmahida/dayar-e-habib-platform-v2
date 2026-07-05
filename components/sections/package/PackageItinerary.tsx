import type { ItineraryItem } from "@/types/package";

interface PackageItineraryProps {
  itinerary: ItineraryItem[];
}

export function PackageItinerary({ itinerary }: PackageItineraryProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="relative border-l-2 border-[#CFC4AF]/40 pl-6 ml-4 space-y-10">
        {itinerary.map((item) => (
          <div key={item.dayNumber} className="relative space-y-2 text-left">
            {/* Dot Indicator */}
            <div className="absolute -left-[33px] top-1.5 flex size-4 items-center justify-center rounded-full bg-[#FCFAF5] border border-accent">
              <span className="size-1.5 rounded-full bg-accent" />
            </div>

            <div className="text-xs font-bold text-accent tracking-wider uppercase">
              Day {item.dayNumber}
            </div>
            <h4 className="font-heading text-lg font-bold text-foreground tracking-tight">
              {item.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
