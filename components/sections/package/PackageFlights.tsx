import { Plane } from "lucide-react";
import type { FlightInfo } from "@/types/package";

interface PackageFlightsProps {
  flights?: FlightInfo[];
}

export function PackageFlights({ flights }: PackageFlightsProps) {
  if (!flights || flights.length === 0) return null;

  return (
    <div className="space-y-6">
      {flights.map((flight, index) => (
        <div key={index} className="flex gap-5 rounded-md border border-border bg-card p-6 items-start">
          <div className="flex size-12 items-center justify-center rounded-md bg-secondary text-accent border border-border/40 shrink-0">
            <Plane className="size-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-heading text-base font-bold text-foreground">
                {flight.airline}
              </h4>
            </div>
            <div className="text-xs font-semibold tracking-wide text-accent uppercase">
              Route: {flight.route}
            </div>
            {flight.details && (
              <div className="mt-3 p-3 bg-accent/5 border-l-2 border-accent text-xs text-muted-foreground italic leading-relaxed text-left">
                <span className="font-semibold text-accent not-italic block mb-0.5">Important Information:</span>
                {flight.details}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
