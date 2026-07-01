export interface Service {
  slug: string; // readable slug like "hajj", "umrah", "visa"
  title: string;
  description: string;
  details: string[];
  iconName: string; // lucide icon identifier
  
  // Administrative fields
  active: boolean;
  featured: boolean;
  displayOrder: number;

  // SEO fields
  seoTitle: string | null;
  seoDescription: string | null;
}
