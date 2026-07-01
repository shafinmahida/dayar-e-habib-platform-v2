export interface Department {
  slug: string; // readable slug like "hajj", "umrah", "visa"
  name: string;
  description: string;
  email: string | null;
  phone: string | null;
  active: boolean;
  displayOrder: number;
}
