import type { Package } from "@/types/package";

export const PACKAGES_DATA: Package[] = [
  {
    slug: "premium-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Premium Hajj Package",
    duration: "21 Days",
    highlights: [
      "Selected hotels close to the holy sanctuaries",
      "Full board buffet meals with specialized chefs",
      "Dedicated group leader support throughout the rituals",
      "Air-conditioned private coaches for all transfers"
    ],
    availability: "Limited",
    priceMin: null,
    priceCurrency: null,
    imageUrl: "/makkah-hero.png",
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 1,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "Premium Hajj Tour Package | Dayar-E-Habib",
    seoDescription: "Book our premium Hajj tour package with scholar guidance and private transfers. Established Moh-accredited service since 1986.",
    itinerary: [
      { dayNumber: 1, title: "Departure & Arrival in Jeddah", description: "Board your flight to Jeddah. Upon arrival, complete airport procedures and transfer to your hotel in Makkah via private coach." },
      { dayNumber: 2, title: "Umrah Performance", description: "Perform Umrah under the guidance of our experienced group scholars." },
      { dayNumber: 3, title: "Rest & Focus in Makkah", description: "Spend time in devotion at the Holy Kaaba. Weekly scholar discussions." },
      { dayNumber: 4, title: "Local Ziyarat in Makkah", description: "Visit Mina, Arafat, Muzdalifah, Jabal al-Noor, and Jabal Thawr with professional guides." },
      { dayNumber: 8, title: "Preparation for Hajj Days", description: "Briefing sessions with religious leaders regarding the detailed process of Hajj rituals." },
      { dayNumber: 9, title: "Mina Camp Departure", description: "Move to Mina camps to begin the Hajj days. Accommodations include air-conditioned tents and full board catering." },
      { dayNumber: 10, title: "Day of Arafat", description: "Depart for Arafat after sunrise. Listen to the Hajj sermon and engage in dua until sunset before heading to Muzdalifah." },
      { dayNumber: 11, title: "Jamarat & Tawaf al-Ifadah", description: "Perform stoning at Jamarat, complete animal sacrifice, and perform Tawaf al-Ifadah at the Masjid Al-Haram." },
      { dayNumber: 14, title: "Transfer to Madinah", description: "Conclude Hajj rituals, check out from Makkah, and transfer to Madinah. Check into hotel near Al-Masjid an-Nabawi." },
      { dayNumber: 15, title: "Ziyarat in Madinah", description: "Visit Masjid Quba, Mount Uhud, and Masjid al-Qiblatayn with scholars." },
      { dayNumber: 21, title: "Return Journey", description: "Final transfers from Madinah airport to Jeddah for return flight." }
    ],
    inclusions: [
      "Hajj Visa & Health Insurance clearance",
      "Round-trip airfare ticket options with premium carriers",
      "All ground transfers in modern, air-conditioned buses",
      "Accommodations at pre-selected hotels (close to the Haram bounds)",
      "Dedicated air-conditioned camps in Mina (KSA Ministry certified)",
      "Daily buffet meals (breakfast, lunch, and dinner)",
      "Scholar seminars and daily guide coordination",
      "Complimentary Zamzam water and Hajj gift kits"
    ],
    exclusions: [
      "Personal expenses, laundry, and extra room services",
      "Excess baggage charges above airline allowances",
      "Optional private tour excursions during rest days",
      "Any additional travel permits outside Saudi Arabia"
    ],
    hotels: [
      { name: "Premium Makkah Grand Hotel", location: "Makkah", rating: "5 Star", distance: "250m from Haram" },
      { name: "Diyar Madinah Royal", location: "Madinah", rating: "5 Star", distance: "150m from Haram boundaries" }
    ],
    flights: [
      { airline: "Saudi Arabian Airlines", route: "Mumbai (BOM) - Jeddah (JED) / Madinah (MED) - Mumbai (BOM)", class: "Economy / Business Options Available", details: "Direct flights with flexible check-in support" }
    ],
    faqs: [
      { question: "What is the average group size for the Hajj package?", answer: "We maintain a maximum ratio of 25 pilgrims per guide to ensure dedicated support and personal care." },
      { question: "Are medical advisors present in the group?", answer: "Yes, our team includes licensed medical representatives to support health needs throughout the Hajj days." }
    ]
  },
  {
    slug: "deluxe-umrah",
    categorySlug: "umrah",
    destinationSlugs: ["makkah", "madinah"],
    title: "Deluxe Umrah Program",
    duration: "15 Days",
    highlights: [
      "Accommodations directly in front of the Haram",
      "Comprehensive visa processing and health clearance assistance",
      "Educational seminars and daily guidance sessions",
      "Flexible flight booking options with premium carriers"
    ],
    availability: "Open",
    priceMin: null,
    priceCurrency: null,
    imageUrl: null,
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 2,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "Deluxe 15 Days Umrah Program | Dayar-E-Habib",
    seoDescription: "15 Days group or customized Deluxe Umrah tour package with hotel accommodations in front of the Haram.",
    itinerary: [
      { dayNumber: 1, title: "Arrival in Makkah", description: "Transfer from Jeddah Airport to Makkah hotel. Check-in and rest." },
      { dayNumber: 2, title: "Umrah Rituals", description: "Perform Umrah under professional scholar guidance." },
      { dayNumber: 3, title: "Makkah Ziyarat", description: "Guided tour to holy sites (Jabal Noor, Mina, Arafat)." },
      { dayNumber: 8, title: "Madinah Transition", description: "Check out from Makkah and travel to Madinah Al-Munawwarah via high-speed train or luxury coach." },
      { dayNumber: 9, title: "Salutations at Rawdah", description: "Guided visit to the Rawdah Sharifah inside the Prophet's Mosque." },
      { dayNumber: 10, title: "Madinah Historical Tours", description: "Visit Masjid Quba and historic battlefields of Uhud." },
      { dayNumber: 15, title: "Departure", description: "Transfer to Madinah airport for return flight to Mumbai." }
    ],
    inclusions: [
      "Electronic Umrah Visa processing",
      "BOM-JED / MED-BOM air ticket options",
      "7 Nights accommodation in Makkah",
      "7 Nights accommodation in Madinah",
      "Buffet breakfast and dinner",
      "Scholar guidance throughout the journey",
      "Ziyarat tours in both holy cities"
    ],
    exclusions: [
      "Lunch meals (unless requested)",
      "Wheelchair assistance fees (charged locally)",
      "Any extra personal visa clearances"
    ],
    hotels: [
      { name: "Al-Haram Front Hotel", location: "Makkah", rating: "5 Star", distance: "Walking distance to outer courtyard" },
      { name: "Elaf Madinah Oasis", location: "Madinah", rating: "4 Star", distance: "200m from Haram gates" }
    ],
    flights: [
      { airline: "Air India / Gulf Air", route: "Mumbai (BOM) - Jeddah (JED) / Madinah (MED) - Mumbai (BOM)", class: "Economy", details: "Standard check-in allowances" }
    ],
    faqs: [
      { question: "Is laundry service included?", answer: "Yes, our Deluxe Umrah packages include complimentary bi-weekly laundry service." }
    ]
  },
  {
    slug: "classic-ziyarat",
    categorySlug: "ziyarat",
    destinationSlugs: ["baghdad"],
    title: "Classic Iraq & Baghdad Ziyarat",
    duration: "12 Days",
    highlights: [
      "Guided historical tours led by experienced scholars",
      "Centrally located, comfortable hotel selections",
      "All boundary visa permissions managed internally",
      "Group travel coordination with complete ground security"
    ],
    availability: "Open",
    priceMin: null,
    priceCurrency: null,
    imageUrl: null,
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 3,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "Iraq & Baghdad Ziyarat Tour Package | Dayar-E-Habib",
    seoDescription: "Join our next scholar-guided Ziyarat group to Baghdad and holy shrines. Includes visa clearances, hotels and flight ticket support.",
    itinerary: [
      { dayNumber: 1, title: "Arrive in Baghdad", description: "Airport pickup and check-in to Baghdad hotel." },
      { dayNumber: 2, title: "Salutations to Sheikh Abdul Qadir Jilani", description: "Visit to the shrine of Ghaus-e-Azam, with educational lecture." },
      { dayNumber: 4, title: "Najaf & Kufa Shrines", description: "Depart for Najaf. Visit Hazrat Ali (A.S.) shrine and historic Kufa mosques." },
      { dayNumber: 7, title: "Karbala Holy Places", description: "Travel to Karbala Al-Mualla. Spend days visiting the shrines of Imam Hussain (A.S.) and Hazrat Abbas (A.S.)." },
      { dayNumber: 12, title: "Baghdad Return & Flight", description: "Transfer back to Baghdad Airport for return flight." }
    ],
    inclusions: [
      "Iraq Visa approval processing",
      "Round-trip flight booking support",
      "Ground security and private bus transfers",
      "Hotel stays in Baghdad, Najaf, and Karbala",
      "All daily meals (Breakfast, Lunch, Dinner)",
      "Guide services led by historical scholars"
    ],
    exclusions: [
      "Individual charity donations",
      "Emergency medical bills not covered by travel health policies"
    ],
    hotels: [
      { name: "Grand Baghdad Court", location: "Baghdad", rating: "4 Star", distance: "Close to holy shrines" },
      { name: "Karbala Heritage Inn", location: "Karbala", rating: "4 Star", distance: "Walking distance to Haram boundaries" }
    ],
    flights: [
      { airline: "FlyDubai / Emirates", route: "Mumbai (BOM) - Baghdad (BGW) - Mumbai (BOM)", class: "Economy", details: "Connecting flights via Dubai" }
    ],
    faqs: [
      { question: "Is it safe to travel for Ziyarat?", answer: "Yes, our groups travel with private security coordinates and adhere strictly to vetted safe travel lanes." }
    ]
  }
];
export const CATEGORY_PACKAGES: Record<string, Package[]> = {
  hajj: [PACKAGES_DATA[0]],
  umrah: [PACKAGES_DATA[1]],
  ziyarat: [PACKAGES_DATA[2]],
};
