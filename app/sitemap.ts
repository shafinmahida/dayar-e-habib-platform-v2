import type { MetadataRoute } from 'next';
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dayarehabib.com';

  // Core static pages
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/hajj',
    '/umrah',
    '/ziyarat',
    '/visa',
    '/hotels',
    '/tours',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const supabase = await createClient();
    const { data: packages } = await supabase
      .from('packages')
      .select('slug, updated_at')
      .eq('status', 'published');

    if (packages && packages.length > 0) {
      const packageRoutes = packages.map((pkg) => ({
        url: `${baseUrl}/tours/${pkg.slug}`,
        lastModified: pkg.updated_at ? new Date(pkg.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
      return [...staticRoutes, ...packageRoutes];
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap routes:', error);
  }

  return staticRoutes;
}
