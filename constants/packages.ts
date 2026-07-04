import type { Package } from "@/types/package";

export const PACKAGES_DATA: Package[] = [
  {
    slug: "premium-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Premium Hajj Full Package",
    duration: "Tentative",
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
      { dayNumber: 6, title: "May-15 | Dhul Hijjah-9 | Hajj Day-6", description: "Stay at Arafat (*Wuquf*) and spend the night under the open sky at Muzdalifah." },
      { dayNumber: 7, title: "May-16 | Dhul Hijjah-10 | Hajj Day-7", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 8, title: "May-17 | Dhul Hijjah-11 | Hajj Day-8", description: "Stay in Mina for prayers and perform afternoon stoning." },
      { dayNumber: 9, title: "May-18 | Dhul Hijjah-12 | Hajj Day-9", description: "Stoning at Jamarat and complete Mina rituals. Return to Azizya hotel." },
      { dayNumber: 10, title: "May-19 | Azizya Day-10", description: "Post-Hajj rest and devotional recovery at Azizya hotel." },
      { dayNumber: 11, title: "May-20 | Azizya Day-11", description: "Engage in worship and rest." },
      { dayNumber: 12, title: "May-21 | Azizya Day-12", description: "Engage in worship and rest." },
      { dayNumber: 13, title: "May-22 | Azizya Day-13", description: "Check out from Azizya and prepare to move to Haram hotel." },
      { dayNumber: 14, title: "May-23 to Jun-5 | Haram Days 14-27", description: "Enjoy 14 glorious days of continuous prayer and devotion in hotel close to Haram boundaries." },
      { dayNumber: 28, title: "Jun-6 | Makkah/Madinah Transition", description: "Check out from Makkah, travel to Madinah Munawwarah, and check in at the hotel in Madinah Munawwarah." },
      { dayNumber: 29, title: "Jun-7 to Jun-15 | Madina Days 29-37", description: "Spend 9 spiritual days in Madinah at Prophet's Mosque including local historical Ziyarats." },
      { dayNumber: 38, title: "Jun-16 | Madina Departure", description: "Final check out, transfer to airport for return flight." }
    ],
    inclusions: [
      "Accommodation in Star Hotels at Both Holy Places",
      "Buffet Breakfast, Lunch and Dinner",
      "Return Air Fare (By Convenient Airlines)",
      "Air Conditioned Road Transportation in Saudi Arabia",
      "Moulim Fees",
      "Complimentary Laundry Service",
      "5 Liters ZAM ZAM Can",
      "Travel Kit"
    ],
    exclusions: [
      "Cost of Qurbani",
      "Transportation Cost of Tawaf-e-Ziarah",
      "Excess baggage charges above standard limits"
    ],
    hotels: [
      { name: "Accommodation in Star Hotels", location: "Makkah & Madinah", rating: "Standard Quality", distance: "Convenient distances to Holy Places" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "Mumbai (BOM) - Saudi Arabia (JED/MED) - Mumbai (BOM)", class: "Economy Class", details: "Inflight meals and baggage included" }
    ],
    faqs: [
      { question: "What are the required documents for booking Hajj?", answer: "You must provide an international passport valid for at least 6 months from the travel date, along with mandatory copies of your Aadhaar Card and PAN Card." },
      { question: "What is the standard room occupancy?", answer: "Standard accommodation features 4 to 5 pilgrims per room. Double or triple sharing rooms can be arranged upon request at adjusted brochure rates." },
      { question: "What is the Hajj package cancellation policy?", answer: "Once booking confirmation is submitted, Hajj package payments are fully non-refundable under all cancellation circumstances." }
    ]
  },
  {
    slug: "short-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Hajj Short Package",
    duration: "Tentative",
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
      { dayNumber: 14, title: "May-15 | Dhul Hijjah-9 | Hajj Day-14", description: "Stay at Arafat (*Wuquf*) and spend the night under the open sky at Muzdalifah." },
      { dayNumber: 15, title: "May-16 | Dhul Hijjah-10 | Hajj Day-15", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 16, title: "May-17 | Dhul Hijjah-11 | Hajj Day-16", description: "Stay in Mina, perform afternoon stoning." },
      { dayNumber: 17, title: "May-18 | Dhul Hijjah-12 | Hajj Day-17", description: "Stoning at Jamarat, conclude Hajj days, transfer to Azizya hotel." },
      { dayNumber: 18, title: "May-19 | Azizya Day-18", description: "Rest and devotional worship in Azizya." },
      { dayNumber: 19, title: "May-20 | Azizya Day-19", description: "Farewell briefing and Tawaf preparation." },
      { dayNumber: 20, title: "May-21 | Azizya Day-20", description: "Farewell Tawaf at Haram, transfer to Jeddah Airport for return flight." }
    ],
    inclusions: [
      "Accommodation in Star Hotels at Both Holy Places",
      "Buffet Breakfast, Lunch and Dinner",
      "Return Air Fare (By Convenient Airlines)",
      "Air Conditioned Road Transportation in Saudi Arabia",
      "Moulim Fees",
      "Complimentary Laundry Service",
      "5 Liters ZAM ZAM Can",
      "Travel Kit"
    ],
    exclusions: [
      "Cost of Qurbani",
      "Transportation Cost of Tawaf-e-Ziarah",
      "Excess baggage charges above standard limits"
    ],
    hotels: [
      { name: "Accommodation in Star Hotels", location: "Makkah & Madinah", rating: "Standard Quality", distance: "Convenient distances to Holy Places" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "Mumbai (BOM) - Saudi Arabia (JED/MED) - Mumbai (BOM)", class: "Economy Class", details: "Inflight meals and baggage included" }
    ],
    faqs: [
      { question: "What are the required documents for booking Hajj?", answer: "You must provide an international passport valid for at least 6 months from the travel date, along with mandatory copies of your Aadhaar Card and PAN Card." },
      { question: "What is the standard room occupancy?", answer: "Standard accommodation features 4 to 5 pilgrims per room. Double or triple sharing rooms can be arranged upon request at adjusted brochure rates." },
      { question: "What is the Hajj package cancellation policy?", answer: "Once booking confirmation is submitted, Hajj package payments are fully non-refundable under all cancellation circumstances." }
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
    title: "11vi Sharif in Baghdad - Classic Ziyarat",
    duration: "11 Days",
    highlights: [
      "Celebrate 11vi Sharif in Baghdad",
      "Najaf Al-Ashraf stay: 2 Nights",
      "Baghdad stay: 6 Nights (Sadun, Atlas Baghdad)",
      "Karbala stay: 2 Nights",
      "Confirmed departures: 17th, 18th & 19th September (Mumbai departure)"
    ],
    availability: "Open",
    priceMin: 135000,
    priceCurrency: "INR",
    imageUrl: "/ziyarat-dome.png",
    videoUrl: null,
    galleryUrls: [],
    active: true,
    featured: true,
    displayOrder: 3,
    createdAt: "2026-06-30T12:00:00Z",
    seoTitle: "11vi Sharif Baghdad & Holy Ziyarat Package | Dayar-E-Habib",
    seoDescription: "Join our 11-day confirmed Ziyarat group to celebrate 11vi Sharif in Baghdad. Includes 6 nights in Baghdad, 2 nights in Najaf, 2 nights in Karbala, and direct flights.",
    itinerary: [
      { dayNumber: 1, title: "Day 1-2 | Najaf Stay (2 Nights)", description: "Arrive at Najaf Airport. Check-in to your hotel. Perform ziyarat at the sacred Dome of Maula Ali (A.S.), Masjid Kufa, and Wadi-us-Salaam." },
      { dayNumber: 3, title: "Day 3-8 | Baghdad - 11vi Sharif (6 Nights)", description: "Transfer to Baghdad. Check-in to Atlas Baghdad Hotel in Sadun (6-night stay). Perform devotions and celebrate 11vi Sharif at the sacred Dome of Ghaus-e-Azam Sheikh Abdul Qadir Jilani." },
      { dayNumber: 9, title: "Day 9-10 | Karbala Al-Mualla (2 Nights)", description: "Transfer to Karbala. Visit the holy shrines of Imam Hussain (A.S.) and Hazrat Abbas (A.S.) with local scholar guidance." },
      { dayNumber: 11, title: "Day 11 | Return Flight to Mumbai", description: "Transfer to Baghdad Airport. Board your direct flight by Iraqi Airways back to Mumbai." }
    ],
    inclusions: [
      "Direct flight tickets by Iraqi Airways (Mumbai departure)",
      "Iraq Electronic Visa processing approval",
      "Mandatory Travel Insurance cover",
      "Hotel stays (6 Nights Baghdad Sadun, 2 Nights Najaf, 2 Nights Karbala)",
      "Full board Indian buffet meals (Breakfast, Lunch & Dinner)",
      "Local group transfers in modern AC buses",
      "Complimentary Travel Kit",
      "Experienced guide & scholar theological coordination"
    ],
    exclusions: [
      "Personal expenses, laundry, and local tips",
      "Any additional excess baggage charges above airline allowance"
    ],
    hotels: [
      { name: "Atlas Baghdad Hotel", location: "Sadun, Baghdad", rating: "Premium Stay", distance: "6 Nights stay" },
      { name: "Luxury Najaf Shrines Stay", location: "Najaf", rating: "4 Star", distance: "2 Nights stay" },
      { name: "Karbala Holy Shrines stay", location: "Karbala", rating: "4 Star", distance: "2 Nights stay" }
    ],
    flights: [
      { airline: "Iraqi Airways", route: "Mumbai (BOM) - Baghdad (BGW) - Mumbai (BOM) [Direct Flight]", class: "Economy Class", details: "Confirmed departures: 17th, 18th, and 19th September" }
    ],
    faqs: [
      { question: "What airlines are used for the Ziyarat package?", answer: "We use direct flights operated by Iraqi Airways from Mumbai to Baghdad." },
      { question: "Is visa processing included in the package cost?", answer: "Yes, the package cost of 1,35,000 INR includes the Iraq visa approval processing, travel insurance, and all board meals." }
    ]
  }
];
export const CATEGORY_PACKAGES: Record<string, Package[]> = {
  hajj: [PACKAGES_DATA[0]],
  umrah: [PACKAGES_DATA[1]],
  ziyarat: [PACKAGES_DATA[2]],
};
