export interface Company {
  id: string; // readable slug or UUID
  name: string;
  legalName: string;
  establishedYear: string;
  licenseNumber: string | null;
  registrations: string[];
  description: string;
  slogan: string;
  active: boolean;
}
