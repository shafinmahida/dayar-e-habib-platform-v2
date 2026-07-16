import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";
import { DynamicContent } from "@/components/shared/DynamicContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our heritage, values, and commitment to providing premium Hajj, Umrah, and curated travel tours.",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title={<DynamicContent slug="about_title" fallback="About Us" />}
      description={<DynamicContent slug="about_description" fallback="Learn more about our heritage, values, and commitment to providing premium Hajj, Umrah, and curated travel tours." />}
    />
  );
}
