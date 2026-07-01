export interface Destination {
  slug: string; // readable slug like "makkah", "madinah", "baghdad"
  name: string;
  country: string;
  description: string;
  imageUrl: string | null;
  active: boolean;
  displayOrder: number;
  
  // SEO fields
  seoTitle: string | null;
  seoDescription: string | null;
}
