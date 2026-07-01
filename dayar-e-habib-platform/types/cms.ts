export interface PackageItem {
  id: string;
  title: string;
  destination: string;
  duration: string;
  highlights: string[];
  availability: string;
  featuredImage: string;
  ctaText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface TimelineStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  packageType: string;
  content: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TrustPropItem {
  id: string;
  title: string;
  description: string;
}
