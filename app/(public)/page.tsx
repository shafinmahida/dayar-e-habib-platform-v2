import {
  Hero,
  Trust,
  FeaturedPackages,
  JourneyTimeline,
  Enlightenment,
  Testimonials,
  Faq,
  Cta,
} from "@/components/sections/home";

import { createClient } from "@/lib/supabase/server";

// ISR: revalidate every 60 seconds instead of force-dynamic on every request
export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch page sections (dependent query — needs homePage.id first)
  const { data: homePage } = await supabase.from('pages').select('id').eq('slug', 'home').single();

  // Run ALL independent queries in parallel for ~3x speedup
  const [sectionsResult, packagesResult, testimonialsResult, faqsResult] = await Promise.all([
    // Sections (depends on homePage, but we handle null safely)
    homePage
      ? supabase.from('page_sections').select('*').eq('page_id', homePage.id).order('sort_order')
      : Promise.resolve({ data: [] }),

    // Featured packages
    supabase
      .from('packages')
      .select('*, package_categories(name)')
      .eq('status', 'published')
      .eq('featured', true)
      .order('display_order', { ascending: true }),

    // Testimonials
    supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true }),

    // FAQs
    supabase
      .from('faqs')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true }),
  ]);

  const sections = sectionsResult.data || [];
  const featuredPackages = packagesResult.data;
  const testimonials = testimonialsResult.data;
  const faqs = faqsResult.data;

  // Extract section contents
  const trustProps = sections.find((s: any) => s.section_type === 'trust')?.content?.props || [];
  const timelineSteps = sections.find((s: any) => s.section_type === 'timeline')?.content?.steps || [];

  return (
    <>
      <Hero />
      {trustProps.length > 0 && <Trust items={trustProps} />}
      {featuredPackages && featuredPackages.length > 0 && <FeaturedPackages packages={featuredPackages} />}
      {timelineSteps.length > 0 && <JourneyTimeline steps={timelineSteps} />}
      <Enlightenment />
      {testimonials && testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      {faqs && faqs.length > 0 && <Faq items={faqs} />}
      <Cta />
    </>
  );
}