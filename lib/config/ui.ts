export const CONTAINER_MAX_WIDTH = "max-w-7xl";
export const CONTAINER_PADDING = "px-4 sm:px-6 lg:px-8";

export const BRAND_NAME = "Dayar-E-Habib";

export const ROUTES = {
  HOME: "/",
  TOURS: "/tours",
  HAJJ: "/hajj",
  UMRAH: "/umrah",
  ZIYARAT: "/ziyarat",
  HOTELS: "/hotels",
  VISA: "/visa",
  ABOUT: "/about",
  GALLERY: "/gallery",
  CONTACT: "/contact",
} as const;

export const CTA_BOOK_NOW = {
  label: "Book Now",
  href: ROUTES.CONTACT,
};

export const NAV_LINKS = [
  { label: "Home", href: ROUTES.HOME },
  { 
    label: "Packages", 
    href: ROUTES.TOURS,
    children: [
      { label: "Hajj Packages", href: ROUTES.HAJJ },
      { label: "Umrah Packages", href: ROUTES.UMRAH },
      { label: "Ziyarat Tours", href: ROUTES.ZIYARAT },
    ]
  },
  { label: "Hotels", href: ROUTES.HOTELS },
  { label: "Visa Processing", href: ROUTES.VISA },
  { label: "About Us", href: ROUTES.ABOUT },
  { label: "Gallery", href: ROUTES.GALLERY },
  { label: "Contact", href: ROUTES.CONTACT },
];

export const SITE_SETTINGS = {
  announcementEnabled: true,
  announcementText: "Bookings for Hajj 2025 are now open. Limited seats available.",
  announcementLink: ROUTES.HAJJ,
  announcementStorageKey: "deh-announcement-dismissed-2025",
  siteName: BRAND_NAME,
  siteDescription: "Premium Hajj and Umrah packages with dedicated scholar guidance.",
};
