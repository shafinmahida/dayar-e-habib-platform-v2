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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch page sections
  const { data: homePage } = await supabase.from('pages').select('id').eq('slug', 'home').single();
  let sections: any[] = [];
  if (homePage) {
    const { data } = await supabase.from('page_sections').select('*').eq('page_id', homePage.id).order('sort_order');
    if (data) sections = data;
  }

  // Extract section contents based on type
  const trustProps = sections.find(s => s.section_type === 'trust')?.content?.props || [];
  const timelineSteps = sections.find(s => s.section_type === 'timeline')?.content?.steps || [];

  // Fetch active featured packages
  const { data: featuredPackages } = await supabase
    .from('packages')
    .select(`
      *,
      package_categories(name)
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('display_order', { ascending: true });

  // Fetch Testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

  // Fetch FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });

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