import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Media Gallery | Dayar-E-Habib Tours & Travels",
  description: "Browse photographs and video recordings from our group journeys, pilgrim testimonials, and landmark visits.",
};

export default function GalleryPage() {
  return (
    <ComingSoon
      title="Media Gallery"
      description="Browse photographs and video recordings from our group journeys, pilgrim testimonials, and landmark visits."
    />
  );
}
