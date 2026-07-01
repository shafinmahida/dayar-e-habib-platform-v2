export const ROUTES = {
  home: "/",
  about: "/about",
  hajj: "/hajj",
  umrah: "/umrah",
  tours: "/tours",
  visa: "/visa",
  hotels: "/hotels",
  gallery: "/gallery",
  contact: "/contact",
} as const;

export type NavLink = {
  label: string;
  href: (typeof ROUTES)[keyof typeof ROUTES];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Hajj", href: ROUTES.hajj },
  { label: "Umrah", href: ROUTES.umrah },
  { label: "Tours", href: ROUTES.tours },
  { label: "Visa", href: ROUTES.visa },
  { label: "Hotels", href: ROUTES.hotels },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "Contact", href: ROUTES.contact },
];

export const CTA_BOOK_NOW = {
  label: "Book Now",
  href: ROUTES.contact,
} as const;
