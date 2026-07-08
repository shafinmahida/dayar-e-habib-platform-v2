import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as path from 'path';

// Import all constants
import { COMPANY_DATA } from '../constants/company';
import { CONTACT_DATA } from '../constants/contact';
import { FAQ_LIST } from '../constants/faq';
import { PACKAGES_DATA, CATEGORY_PACKAGES } from '../constants/packages';
import { SOCIALS_DATA } from '../constants/social';
import { TIMELINE_STEPS } from '../constants/timeline';
import { SERVICES_DATA as HOME_SERVICES } from '../constants/services';
import { TRUST_PROPS } from '../constants/home';
import { FOOTER_COMPANY, FOOTER_QUICK_LINKS, FOOTER_SERVICES } from '../constants/footer';
import { ROUTES } from '../constants/navigation';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting data seed from constants...");

  // 1. Seed Company Profile
  console.log("Seeding Company Profile...");
  await supabase.from('company_profile').upsert({
    name: COMPANY_DATA.name,
    legal_name: COMPANY_DATA.legalName,
    established_year: COMPANY_DATA.establishedYear,
    license_number: COMPANY_DATA.licenseNumber,
    registrations: COMPANY_DATA.registrations,
    description: COMPANY_DATA.description,
    slogan: COMPANY_DATA.slogan,
    active: COMPANY_DATA.active
  });

  // 2. Seed Contact Information
  console.log("Seeding Contact Offices and Specialists...");
  for (const office of CONTACT_DATA.offices) {
    await supabase.from('contact_offices').upsert({
      slug: office.slug,
      name: office.name,
      address: office.address,
      phone: office.phone,
      email: office.email,
      map_link: office.mapLink,
      working_hours: office.workingHours,
      active: office.active,
      display_order: office.displayOrder
    }, { onConflict: 'slug' });
  }

  for (const [dept, info] of Object.entries(CONTACT_DATA.specialists)) {
    await supabase.from('contact_specialists').upsert({
      department: dept,
      name: (info as any).name || null,
      role: info.role,
      phone: info.phone
    }, { onConflict: 'department' });
  }

  // 3. Seed FAQs
  console.log("Seeding FAQs...");
  for (let i = 0; i < FAQ_LIST.length; i++) {
    const faq = FAQ_LIST[i];
    await supabase.from('faqs').upsert({
      question: faq.question,
      answer: faq.answer,
      active: true,
      display_order: i
    }, { onConflict: 'question' }); // We don't have a unique constraint on question, so we'll just insert unless we query first
  }
  // Better to just delete all FAQs and insert
  await supabase.from('faqs').delete().neq('question', '123456');
  for (let i = 0; i < FAQ_LIST.length; i++) {
    await supabase.from('faqs').insert({
      question: FAQ_LIST[i].question,
      answer: FAQ_LIST[i].answer,
      active: true,
      display_order: i
    });
  }

  // 4. Seed Social Links
  console.log("Seeding Social Links...");
  for (const social of SOCIALS_DATA) {
    await supabase.from('social_links').upsert({
      platform: social.platform,
      label: social.label,
      url: social.url,
      active: social.active,
      display_order: social.displayOrder
    }, { onConflict: 'platform' });
  }

  // 5. Seed Footer Sections
  console.log("Seeding Footer Sections...");
  await supabase.from('footer_sections').delete().neq('title', '123456');
  await supabase.from('footer_sections').insert([
    { title: FOOTER_COMPANY.title, links: FOOTER_COMPANY.links, display_order: 1 },
    { title: FOOTER_QUICK_LINKS.title, links: FOOTER_QUICK_LINKS.links, display_order: 2 },
    { title: FOOTER_SERVICES.title, links: FOOTER_SERVICES.links, display_order: 3 }
  ]);

  // 6. Seed Package Categories
  console.log("Seeding Package Categories...");
  const categories = [
    { slug: 'hajj', name: 'Hajj Packages', display_order: 1 },
    { slug: 'umrah', name: 'Umrah Packages', display_order: 2 },
    { slug: 'ziyarat', name: 'Ziyarat Tours', display_order: 3 },
  ];
  const catMap: Record<string, string> = {};
  for (const cat of categories) {
    const { data } = await supabase.from('package_categories')
      .upsert(cat, { onConflict: 'slug', ignoreDuplicates: false })
      .select('id').single();
    if (data) catMap[cat.slug] = data.id;
  }

  // 7. Seed Packages
  console.log("Seeding Packages...");
  for (const pkg of PACKAGES_DATA) {
    const category_id = catMap[pkg.categorySlug];
    if (!category_id) {
      console.warn(`Category not found for package ${pkg.slug}`);
      continue;
    }

    const { error } = await supabase.from('packages').upsert({
      slug: pkg.slug,
      category_id: category_id,
      title: pkg.title,
      duration: pkg.duration,
      highlights: pkg.highlights,
      availability: pkg.availability,
      price_min: pkg.priceMin,
      price_currency: pkg.priceCurrency,
      image_url: pkg.imageUrl,
      video_url: pkg.videoUrl,
      
      itinerary: pkg.itinerary || [],
      inclusions: pkg.inclusions || [],
      complimentary: pkg.complimentary || [],
      exclusions: pkg.exclusions || [],
      hotels: pkg.hotels || [],
      flights: pkg.flights || [],
      faqs: pkg.faqs || [],
      
      status: 'published',
      featured: pkg.featured,
      display_order: pkg.displayOrder,
      seo_title: pkg.seoTitle,
      seo_description: pkg.seoDescription
    }, { onConflict: 'slug' });

    if (error) console.error(`Error inserting package ${pkg.slug}:`, error.message);
  }

  // 8. Seed Page Sections (Homepage)
  console.log("Seeding Homepage Sections...");
  // First, ensure the homepage exists in pages table
  const { data: homePage } = await supabase.from('pages')
    .upsert({ slug: 'home', title: 'Homepage Index', status: 'published' }, { onConflict: 'slug' })
    .select('id').single();
    
  if (homePage) {
    // Clear old sections
    await supabase.from('page_sections').delete().eq('page_id', homePage.id);
    
    // Insert new sections
    await supabase.from('page_sections').insert([
      {
        page_id: homePage.id,
        section_type: 'hero',
        sort_order: 1,
        content: { title: "Dayar-E-Habib", subtitle: "Serving Pilgrims Since 1986", videoUrl: "/gallery/Breakfast.mov" },
        status: 'published'
      },
      {
        page_id: homePage.id,
        section_type: 'services',
        sort_order: 2,
        content: { services: HOME_SERVICES },
        status: 'published'
      },
      {
        page_id: homePage.id,
        section_type: 'timeline',
        sort_order: 3,
        content: { steps: TIMELINE_STEPS },
        status: 'published'
      },
      {
        page_id: homePage.id,
        section_type: 'trust',
        sort_order: 4,
        content: { props: TRUST_PROPS },
        status: 'published'
      }
    ]);
  }

  console.log("✓ Data seeding complete!");
}

seed().catch(console.error);
