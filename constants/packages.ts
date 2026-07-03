import type { Package } from "@/types/package";

export const PACKAGES_DATA: Package[] = [
  {
    slug: "premium-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Premium Hajj Full Package (38 Days)",
    duration: "38 Days",
    highlights: [
      "Hajj 2027 Confirmed Schedule (May 10 - June 16)",
      "14 Devotional Days near Haram in Makkah Hotel",
      "9 Devotional Days in Madinah Al-Munawwarah",
      "Dedicated Azizya, Mina, & Arafat Logistics",
      "Full board buffet meals with specialized chefs"
    ],
    availability: "Limited",
    priceMin: null,
    priceCurrency: null,
    imageUrl: "/kaaba-sunset.png",
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 1,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "Premium Hajj 38 Days Full Tour Package | Dayar-E-Habib",
    seoDescription: "Book our premium 38-day Hajj full tour package with confirmed dates. Scholar guidance and premium Azizya/Haram hotels included.",
    itinerary: [
      { dayNumber: 1, title: "May-10 | Azizya Day-1", description: "Arrive in Jeddah, transfer to Makkah, and check-in to Azizya hotel." },
      { dayNumber: 2, title: "May-11 | Azizya Day-2", description: "Perform Umrah under professional scholar guidance and rest." },
      { dayNumber: 3, title: "May-12 | Azizya Day-3", description: "Preparatory Hajj briefing and theological lectures." },
      { dayNumber: 4, title: "May-13 | Azizya Day-4", description: "Final Hajj briefing and preparation for Ihram." },
      { dayNumber: 5, title: "May-14 | Dhul Hijjah-8 | Hajj Day-5", description: "Hajj begins: Wear Ihram and transfer to Mina camps." },
      { dayNumber: 6, title: "May-15 | Dhul Hijjah-9 | Hajj Day-6", description: "Stand at Mount Arafat (Wuquf) and spend night under sky in Muzdalifah." },
      { dayNumber: 7, title: "May-16 | Dhul Hijjah-10 | Hajj Day-7", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 8, title: "May-17 | Dhul Hijjah-11 | Hajj Day-8", description: "Stay in Mina for prayers and perform afternoon stoning." },
      { dayNumber: 9, title: "May-18 | Dhul Hijjah-12 | Hajj Day-9", description: "Stoning at Jamarat and complete Mina rituals. Return to Azizya hotel." },
      { dayNumber: 10, title: "May-19 | Azizya Day-10", description: "Post-Hajj rest and devotional recovery at Azizya hotel." },
      { dayNumber: 11, title: "May-20 | Azizya Day-11", description: "Azizya lectures and community reflections." },
      { dayNumber: 12, title: "May-21 | Azizya Day-12", description: "Spiritual lectures on post-Hajj life." },
      { dayNumber: 13, title: "May-22 | Azizya Day-13", description: "Check out from Azizya and prepare to move to Haram hotel." },
      { dayNumber: 14, title: "May-23 to Jun-5 | Haram Days 14-27", description: "Enjoy 14 glorious days of continuous prayer and devotion in hotel close to Haram boundaries." },
      { dayNumber: 28, title: "Jun-6 | Makkah/Madinah Transition", description: "Check out from Makkah, travel to Madinah, check-in to Al-Masjid an-Nabawi hotel." },
      { dayNumber: 29, title: "Jun-7 to Jun-15 | Madina Days 29-37", description: "Spend 9 spiritual days in Madinah at Prophet's Mosque including local historical Ziyarats." },
      { dayNumber: 38, title: "Jun-16 | Madina Departure", description: "Final check out, transfer to airport for return flight." }
    ],
    inclusions: [
      "Hajj Visa & Health Insurance clearance",
      "Round-trip airfare ticket options with premium carriers",
      "All ground transfers in modern, air-conditioned buses",
      "Accommodations at pre-selected hotels (close to the Haram bounds)",
      "Dedicated air-conditioned camps in Mina (KSA Ministry certified)",
      "Daily buffet meals (breakfast, lunch, and dinner)",
      "Scholar seminars and daily guide coordination",
      "Zamzam water and Hajj gift kits"
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
    slug: "short-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Hajj Short Package (20 Days)",
    duration: "20 Days",
    highlights: [
      "Hajj 2027 Confirmed Schedule (May 2 - May 21)",
      "8 Devotional Days in Madinah Al-Munawwarah first",
      "Transition straight to Makkah and Azizya before Hajj",
      "Complete Azizya and Mina/Arafat Hajj rituals",
      "Perfect for professionals with limited vacation time"
    ],
    availability: "Limited",
    priceMin: null,
    priceCurrency: null,
    imageUrl: "/hajj-mina.png",
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 2,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "Hajj 20 Days Short Tour Package | Dayar-E-Habib",
    seoDescription: "Book our 20-day Hajj short tour package with confirmed dates. Scholar-led Hajj rituals, Azizya and Madina hotels included.",
    itinerary: [
      { dayNumber: 1, title: "May-2 | Madina Day-1", description: "Arrive at Madinah Airport, private coach transfer, and check-in to Madinah hotel." },
      { dayNumber: 2, title: "May-3 | Madina Day-2", description: "Salutations at Prophet's Mosque and devotional rest." },
      { dayNumber: 3, title: "May-4 | Madina Day-3", description: "Local historical Ziyarat tours in Madinah Al-Munawwarah." },
      { dayNumber: 4, title: "May-5 | Madina Day-4", description: "Prophet's Mosque prayers and spiritual lectures." },
      { dayNumber: 5, title: "May-6 | Madina Day-5", description: "Devotional reflection and reading." },
      { dayNumber: 6, title: "May-7 | Madina Day-6", description: "Continuous worship and group meetings." },
      { dayNumber: 7, title: "May-8 | Madina Day-7", description: "Ziyarat at Mount Uhud and Masjid Quba." },
      { dayNumber: 8, title: "May-9 | Madina Day-8", description: "Final preparation for Ihram and travel to Makkah." },
      { dayNumber: 9, title: "May-10 | Madina/Makkah Transition", description: "Travel to Makkah, wear Ihram at Miqat, perform Umrah, and check-in to Azizya hotel." },
      { dayNumber: 10, title: "May-11 | Azizya Day-10", description: "Check-in Azizya and post-Umrah rest." },
      { dayNumber: 11, title: "May-12 | Azizya Day-11", description: "Theological lectures on Hajj rituals." },
      { dayNumber: 12, title: "May-13 | Azizya Day-12", description: "Hajj preparation briefing with religious scholars." },
      { dayNumber: 13, title: "May-14 | Dhul Hijjah-8 | Hajj Day-13", description: "Hajj begins: Wear Ihram and transfer to Mina air-conditioned camps." },
      { dayNumber: 14, title: "May-15 | Dhul Hijjah-9 | Hajj Day-14", description: "Stand at Mount Arafat (Wuquf) and spend night in Muzdalifah." },
      { dayNumber: 15, title: "May-16 | Dhul Hijjah-10 | Hajj Day-15", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 16, title: "May-17 | Dhul Hijjah-11 | Hajj Day-16", description: "Stay in Mina, perform afternoon stoning." },
      { dayNumber: 17, title: "May-18 | Dhul Hijjah-12 | Hajj Day-17", description: "Stoning at Jamarat, conclude Hajj days, transfer to Azizya hotel." },
      { dayNumber: 18, title: "May-19 | Azizya Day-18", description: "Rest and devotional worship in Azizya." },
      { dayNumber: 19, title: "May-20 | Azizya Day-19", description: "Farewell briefing and Tawaf preparation." },
      { dayNumber: 20, title: "May-21 | Azizya Day-20", description: "Farewell Tawaf at Haram, transfer to Jeddah Airport for return flight." }
    ],
    inclusions: [
      "Hajj Visa & Health Insurance clearance",
      "Round-trip airfare ticket options with premium carriers",
      "All ground transfers in modern, air-conditioned buses",
      "Accommodations at pre-selected hotels (close to the Haram bounds)",
      "Dedicated air-conditioned camps in Mina (KSA Ministry certified)",
      "Daily buffet meals (breakfast, lunch, and dinner)",
      "Scholar seminars and daily guide coordination",
      "Zamzam water and Hajj gift kits"
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
    title: "Classic Ziyarat Package",
    duration: "12 Days",
    highlights: [
      "Visit the sacred Dome of Maula Ali (A.S.) in Najaf",
      "Ziyarat at the holy Dome of Imam Hussain (A.S.) in Karbala",
      "Visit the historic Dome of Sheikh Abdul Qadir Jilani in Baghdad",
      "Guided historical tours led by experienced scholars"
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
    seoTitle: "Classic Ziyarat Tour Package | Dayar-E-Habib",
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
