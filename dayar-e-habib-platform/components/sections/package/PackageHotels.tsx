import { Star, Building } from "lucide-react";
import type { HotelInfo } from "@/types/package";

interface PackageHotelsProps {
  hotels?: HotelInfo[];
}

export function PackageHotels({ hotels }: PackageHotelsProps) {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {hotels.map((hotel, index) => (
        <div key={index} className="flex gap-5 rounded-md border border-border bg-card p-6 items-start">
          <div className="flex size-12 items-center justify-center rounded-md bg-secondary text-accent border border-border/40 shrink-0">
            <Building className="size-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-heading text-base font-bold text-foreground">
                {hotel.name}
              </h4>
              <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase">
                <Star className="size-2.5 fill-current" />
                {hotel.rating}
              </span>
            </div>
            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Location: {hotel.location}
            </div>
            <p className="text-xs text-muted-foreground">
              Distance: {hotel.distance}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
