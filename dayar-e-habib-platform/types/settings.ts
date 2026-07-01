export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementStorageKey: string;
  seoKeywords: string[];
  activeTheme: "light" | "dark" | "system";
  
  // Administrative control flags
  maintenanceMode: boolean;
  enableBookings: boolean;
}
