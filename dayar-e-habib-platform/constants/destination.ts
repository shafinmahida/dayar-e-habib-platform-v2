import type { Destination } from "@/types/destination";

export const DESTINATIONS_DATA: Destination[] = [
  {
    slug: "makkah",
    name: "Makkah Al-Mukarramah",
    country: "Saudi Arabia",
    description: "The holiest city in Islam, birthplace of the Prophet Muhammad (PBUH), and home to the Masjid al-Haram and the Kaaba.",
    imageUrl: "/makkah-hero.png",
    active: true,
    displayOrder: 1,
    seoTitle: "Makkah Tours & Travel Guide | Dayar-E-Habib",
    seoDescription: "Explore our scholar-guided premium Hajj and Umrah packages to Makkah Al-Mukarramah. Experience dedicated support.",
  },
  {
    slug: "madinah",
    name: "Madinah Al-Munawwarah",
    country: "Saudi Arabia",
    description: "The city of the Prophet (PBUH), home to the Al-Masjid an-Nabawi (the Prophet's Mosque) and the Rawdah Sharifah.",
    imageUrl: null,
    active: true,
    displayOrder: 2,
    seoTitle: "Madinah Spiritual Journey Guide | Dayar-E-Habib",
    seoDescription: "Book your Umrah and Hajj packages with extended stays in Madinah Al-Munawwarah. Complete scholar guidance.",
  },
  {
    slug: "baghdad",
    name: "Baghdad Ziyarat",
    country: "Iraq",
    description: "Historical tours to the shrines of Sheikh Abdul Qadir Jilani (Ghaus-e-Azam) and Imam Abu Hanifa.",
    imageUrl: null,
    active: true,
    displayOrder: 3,
    seoTitle: "Iraq Baghdad Ziyarat Packages | Dayar-E-Habib",
    seoDescription: "Historical Ziyarat tours to Baghdad and major shrines in Iraq. Guided tour guides and flight ticketing assistance.",
  },
];
