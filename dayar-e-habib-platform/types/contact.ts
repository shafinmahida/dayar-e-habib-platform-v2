export interface OfficeLocation {
  slug: string; // readable office slug
  name: string;
  address: string;
  phone: string;
  email: string;
  mapLink: string | null;
  workingHours: string;
  active: boolean;
  displayOrder: number;
}

export interface ContactInfo {
  primaryPhone: string;
  primaryEmail: string;
  offices: OfficeLocation[];
}
