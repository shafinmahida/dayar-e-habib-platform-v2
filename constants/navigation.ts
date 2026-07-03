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
  { label: "Hajj Packages", href: ROUTES.hajj },
  { label: "Umrah Packages", href: ROUTES.umrah },
  { label: "Ziyarat Packages", href: ROUTES.tours },
  { label: "Gallery", href: ROUTES.gallery },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export const CTA_BOOK_NOW = {
  label: "Contact Us",
  href: ROUTES.contact,
} as const;
