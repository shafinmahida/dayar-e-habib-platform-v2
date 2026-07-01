export interface Representative {
  slug: string; // readable slug
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  videoUrl: string | null; // media support
  phone: string | null;
  email: string | null;
  departmentSlug: string | null; // reference slug instead of ID
  isScholar: boolean;
  active: boolean;
  featured: boolean;
  displayOrder: number;
}
