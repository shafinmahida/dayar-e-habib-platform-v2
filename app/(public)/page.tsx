import {
  Hero,
  Trust,
  FeaturedPackages,
  JourneyTimeline,
  Destinations,
  Gallery,
  Testimonials,
  Faq,
  Cta,
} from "@/components/sections/home";

import { TRUST_PROPS } from "@/constants/home";
import { PACKAGES_DATA } from "@/constants/packages";
import { TIMELINE_STEPS } from "@/constants/timeline";
import { TESTIMONIALS_LIST } from "@/constants/testimonials";
import { FAQ_LIST } from "@/constants/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust items={TRUST_PROPS} />
      <FeaturedPackages packages={PACKAGES_DATA} />
      <JourneyTimeline steps={TIMELINE_STEPS} />
      <Destinations />
      <Gallery />
      <Testimonials testimonials={TESTIMONIALS_LIST} />
      <Faq items={FAQ_LIST} />
      <Cta />
    </>
  );
}