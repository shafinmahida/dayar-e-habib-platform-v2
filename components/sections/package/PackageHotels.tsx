import { Star } from "lucide-react";
import { KaabaIcon, MadinahIcon, AziziaIcon } from "@/components/icons/SketchedIcons";
import type { HotelInfo } from "@/types/package";

interface PackageHotelsProps {
  hotels?: HotelInfo[];
}

export function PackageHotels({ hotels }: PackageHotelsProps) {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {hotels.map((hotel, index) => {
        // Resolve appropriate sketched icon based on location string
        const isMakkah = hotel.location.toLowerCase().includes("makkah");
        const isMadinah = hotel.location.toLowerCase().includes("madinah");

        return (
          <div key={index} className="flex gap-5 rounded-md border border-border bg-card p-6 items-start shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
            <div className="flex size-12 items-center justify-center rounded-md bg-secondary text-accent border border-border/40 shrink-0">
              {isMakkah ? (
                <KaabaIcon className="size-6" />
              ) : isMadinah ? (
                <MadinahIcon className="size-6" />
              ) : (
                <AziziaIcon className="size-6" />
              )}
            </div>
            <div className="space-y-2 flex-1 text-left">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-heading text-base font-bold text-foreground">
                  {hotel.name}
                </h4>
                {hotel.rating && (
                  <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase">
                    <Star className="size-2.5 fill-current" />
                    {hotel.rating}
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Location: {hotel.location}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Distance: {hotel.distance}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
