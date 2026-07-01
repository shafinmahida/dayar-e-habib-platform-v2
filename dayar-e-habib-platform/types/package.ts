export interface ItineraryItem {
  dayNumber: number;
  title: string;
  description: string;
}

export interface HotelInfo {
  name: string;
  location: string;
  rating: string;
  distance: string;
}

export interface FlightInfo {
  airline: string;
  route: string;
  class: string;
  details: string;
}

export interface PackageFaq {
  question: string;
  answer: string;
}

export interface Package {
  slug: string; // readable slug
  categorySlug: string; // reference category by readable slug
  destinationSlugs: string[]; // reference destinations by readable slugs
  title: string;
  duration: string;
  highlights: string[];
  availability: "Open" | "Limited" | "Closed" | "Sold Out";
  priceMin: number | null; // Nullable value for prices instead of placeholder string
  priceCurrency: string | null;
  
  // Media support fields
  imageUrl: string | null;
  videoUrl: string | null;
  galleryUrls: string[];

  // Administrative fields
  active: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;

  // SEO fields
  seoTitle: string | null;
  seoDescription: string | null;

  // Dynamic Package Detail fields (added for Sprint 5)
  itinerary?: ItineraryItem[];
  inclusions?: string[];
  exclusions?: string[];
  hotels?: HotelInfo[];
  flights?: FlightInfo[];
  faqs?: PackageFaq[];
}
