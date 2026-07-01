import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "About Us | Dayar-E-Habib Tours & Travels",
  description: "Learn more about our heritage, values, and commitment to providing premium Hajj, Umrah, and curated travel tours.",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Us"
      description="Learn more about our heritage, values, and commitment to providing premium Hajj, Umrah, and curated travel tours."
    />
  );
}
