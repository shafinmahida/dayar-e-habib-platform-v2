import { ROUTES } from "@/constants/navigation";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_COMPANY: FooterSection = {
  title: "Company",
  links: [
    { label: "About Us", href: ROUTES.about },
    { label: "Gallery", href: ROUTES.gallery },
    { label: "Contact", href: ROUTES.contact },
  ],
};

export const FOOTER_QUICK_LINKS: FooterSection = {
  title: "Quick Links",
  links: [
    { label: "Home", href: ROUTES.home },
    { label: "Tours", href: ROUTES.tours },
    { label: "Hotels", href: ROUTES.hotels },
    { label: "Visa", href: ROUTES.visa },
  ],
};

export const FOOTER_SERVICES: FooterSection = {
  title: "Services",
  links: [
    { label: "Hajj Packages", href: ROUTES.hajj },
    { label: "Umrah Packages", href: ROUTES.umrah },
    { label: "Tour Packages", href: ROUTES.tours },
    { label: "Visa Assistance", href: ROUTES.visa },
  ],
};
