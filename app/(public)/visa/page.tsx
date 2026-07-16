import type { Metadata } from "next";

import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Visa Assistance",
  description: "Get reliable, prompt visa processing support for Hajj, Umrah, and tourist visas worldwide from our travel agents.",
};

export default function VisaPage() {
  return (
    <ComingSoon
      title="Visa Assistance"
      description="Get reliable, prompt visa processing support for Hajj, Umrah, and tourist visas worldwide from our travel agents."
    />
  );
}
