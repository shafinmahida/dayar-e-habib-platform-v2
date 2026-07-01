import type { PackageCategory } from "@/types/package-category";

export const PACKAGE_CATEGORIES_DATA: PackageCategory[] = [
  {
    slug: "hajj",
    name: "Hajj Tours",
    description: "Fully organized annual Hajj tours with dedicated camps, religious guides, and scholar lectures.",
    active: true,
    displayOrder: 1,
    seoTitle: "Scholar-Guided Premium Hajj Tours | Dayar-E-Habib",
    seoDescription: "Book premium and luxury Hajj tour programs. Serving pilgrims since 1986 with legal registrations and trusted guides.",
  },
  {
    slug: "umrah",
    name: "Umrah Packages",
    description: "Umrah tour packages with premium hotel accommodations close to Haram, visa processing, and transport.",
    active: true,
    displayOrder: 2,
    seoTitle: "Premium & Economy Umrah Packages | Dayar-E-Habib",
    seoDescription: "Browse custom and group Umrah packages. Includes hotel arrangements near Masjid Al-Haram and Masjid An-Nabawi.",
  },
  {
    slug: "ziyarat",
    name: "Ziyarat Tours",
    description: "Spiritual ziyarat tours to sacred shrines in Iraq (Baghdad, Najaf, Karbala) and other holy locations.",
    active: true,
    displayOrder: 3,
    seoTitle: "Iraq & Jordan Ziyarat Tour Packages | Dayar-E-Habib",
    seoDescription: "Guided ziyarat tour itineraries covering Islamic historical landmarks and shrines. Professional local support.",
  },
];
