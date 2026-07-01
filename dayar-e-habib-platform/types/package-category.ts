export interface PackageCategory {
  slug: string; // readable slug like "hajj-premium", "umrah-luxury"
  name: string;
  description: string;
  active: boolean;
  displayOrder: number;

  // SEO fields
  seoTitle: string | null;
  seoDescription: string | null;
}
