import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Premium Hotel Bookings",
  description: "Book premium hotel rooms close to Haram in Makkah, Madinah, and various top-rated locations worldwide at the best rates.",
};

export default function HotelsPage() {
  return (
    <ComingSoon
      title="Hotel Bookings"
      description="Book premium hotel rooms close to Haram in Makkah, Madinah, and various top-rated locations worldwide at the best rates."
    />
  );
}
