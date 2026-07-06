import type { Package } from "@/types/package";

export const PACKAGES_DATA: Package[] = [
  {
    slug: "premium-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Grand Stay (34+Days)",
    duration: "Tentative",
    highlights: [
      "Tentative Hijri Timeline (4th Dhul Hijjah - 11th Muharram)",
      "Devotional Days near Haram in Makkah Hotel",
      "Devotional Days in Madinah Al-Munawwarah",
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
    seoTitle: "Grand Stay | Dayar-E-Habib",
    seoDescription: "Book our Grand Stay Hajj full tour package with tentative Hijri timeline. Scholar guidance and standard Makkah/Madinah hotels included.",
    itinerary: [
      { dayNumber: 1, title: "4th Dhul Hijjah | Azizya", description: "Arrive in Jeddah, transfer to Makkah, and check-in to Azizya apartment." },
      { dayNumber: 2, title: "5th Dhul Hijjah | Azizya", description: "Perform Umrah under professional scholar guidance and rest." },
      { dayNumber: 3, title: "6th Dhul Hijjah | Azizya", description: "Preparatory Hajj briefing and theological lectures." },
      { dayNumber: 4, title: "7th Dhul Hijjah | Azizya", description: "Final Hajj briefing and preparation for Ihram." },
      { dayNumber: 5, title: "8th Dhul Hijjah | Mina", description: "Hajj begins: Wear Ihram and transfer to Mina camps." },
      { dayNumber: 6, title: "9th Dhul Hijjah | Arafat & Muzdalifah", description: "Stay at Arafat (*Wuquf*) and spend the night under the open sky at Muzdalifah." },
      { dayNumber: 7, title: "10th Dhul Hijjah | Jamarat & Tawaf", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 8, title: "11th Dhul Hijjah | Mina", description: "Stay in Mina for prayers and perform afternoon stoning." },
      { dayNumber: 9, title: "12th Dhul Hijjah | Mina & Azizya", description: "Stoning at Jamarat and complete Mina rituals. Return to Azizya apartment." },
      { dayNumber: 10, title: "13th Dhul Hijjah | Azizya", description: "Post-Hajj rest and devotional recovery at Azizya apartment." },
      { dayNumber: 11, title: "14th Dhul Hijjah | Azizya", description: "Engage in worship and rest." },
      { dayNumber: 12, title: "15th Dhul Hijjah | Azizya", description: "Engage in worship and rest." },
      { dayNumber: 13, title: "16th Dhul Hijjah | Azizya", description: "Check out from Azizya and prepare to move to Haram hotel." },
      { dayNumber: 14, title: "17th to 30th Dhul Hijjah | Haram Hotel", description: "Enjoy glorious days of continuous prayer and devotion in hotel close to Haram boundaries." },
      { dayNumber: 28, title: "1st Muharram | Makkah/Madinah Transition", description: "Check out from Makkah, travel to Madinah Munawwarah, and check in at the hotel in Madinah Munawwarah." },
      { dayNumber: 29, title: "2nd to 10th Muharram | Madinah Munawwarah", description: "Spend spiritual days in Madinah at Prophet's Mosque including local historical Ziyarats." },
      { dayNumber: 38, title: "11th Muharram | Madinah Departure", description: "Final check out, transfer to airport for return flight." }
    ],
    inclusions: [
      "Accommodation in Star Hotels at Both Holy Places",
      "Buffet Breakfast, Lunch and Dinner",
      "Return Air Fare (By Convenient Airlines)",
      "Air Conditioned Road Transportation in Saudi Arabia",
      "Moulim Fees"
    ],
    complimentary: [
      "5 Liters Zam Zam",
      "Laundry Service",
      "Travel Kit"
    ],
    exclusions: [
      "Cost of Qurbani",
      "Transportation Cost of Tawaf-e-Ziarah",
      "Excess baggage charges above standard limits"
    ],
    hotels: [
      { name: "Makkah Mukarma", location: "Standard Hotel", rating: "", distance: "Near the courtyard of the Haram Sharif" },
      { name: "Madinah Munawwarah", location: "Standard Hotel", rating: "", distance: "Near the courtyard of the Haram Sharif" },
      { name: "Azizia / Kakia", location: "Apartment", rating: "", distance: "Shifting Accommodation at 4 to 8 km" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "All travel originates and terminates in Mumbai", class: "", details: "Any Excess Baggage beyond the Standard Airline Allowance, or Requests to Change Travel Dates and Routes, Will Incur Additional Charges." }
    ],
    faqs: [
      { question: "What are the required documents for booking Hajj?", answer: "To book your Hajj package, you must provide an international passport valid for at least 6 months from the travel date, along with mandatory copies of your Aadhaar Card and PAN Card. Additionally, please submit Passport Size Photographs with a high-definition white background (available in both physical prints and digital soft copies)." },
      { question: "What is the standard room occupancy?", answer: "Standard accommodation features 4 to 5 pilgrims per room. Double or triple sharing rooms can be arranged upon request at adjusted brochure rates." },
      { question: "What is the Hajj package cancellation policy?", answer: "Once booking confirmation is submitted, Hajj package payments are fully non-refundable under all cancellation circumstances." }
    ]
  },
  {
    slug: "short-hajj",
    categorySlug: "hajj",
    destinationSlugs: ["makkah", "madinah"],
    title: "Express Stay (18+Days)",
    duration: "Tentative",
    highlights: [
      "Tentative Hijri Timeline (25th Dhul Qidah - 15th Dhul Hijjah)",
      "Devotional Days in Madinah Al-Munawwarah first",
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
    seoTitle: "Express Stay | Dayar-E-Habib",
    seoDescription: "Book our Express Stay Hajj short stay package with tentative Hijri dates. Scholar-led Hajj rituals, Azizya and Madina hotels included.",
    itinerary: [
      { dayNumber: 1, title: "25th Dhul Qidah | Madinah", description: "Arrive at Madinah Airport, private coach transfer, and check-in to Madinah hotel." },
      { dayNumber: 2, title: "26th Dhul Qidah to 3rd Dhul Hijjah | Madinah Munawwarah", description: "Spend spiritual days in Madinah at Prophet's Mosque including local historical Ziyarats." },
      { dayNumber: 9, title: "4th Dhul Hijjah | Madinah/Makkah Transition", description: "Travel to Makkah, wear Ihram at Miqat, perform Umrah, and check-in to Azizya hotel." },
      { dayNumber: 10, title: "5th Dhul Hijjah | Azizya", description: "Perform Umrah under professional scholar guidance and rest." },
      { dayNumber: 11, title: "6th Dhul Hijjah | Azizya", description: "Preparatory Hajj briefing and theological lectures." },
      { dayNumber: 12, title: "7th Dhul Hijjah | Azizya", description: "Final Hajj briefing and preparation for Ihram." },
      { dayNumber: 13, title: "8th Dhul Hijjah | Mina", description: "Hajj begins: Wear Ihram and transfer to Mina camps." },
      { dayNumber: 14, title: "9th Dhul Hijjah | Arafat & Muzdalifah", description: "Stay at Arafat (*Wuquf*) and spend the night under the open sky at Muzdalifah." },
      { dayNumber: 15, title: "10th Dhul Hijjah | Jamarat & Tawaf", description: "Stoning at Jamarat, Qurbani, Halq (shaving head), and perform Tawaf-e-Ziyarah." },
      { dayNumber: 16, title: "11th Dhul Hijjah | Mina", description: "Stay in Mina for prayers and perform afternoon stoning." },
      { dayNumber: 17, title: "12th Dhul Hijjah | Mina & Azizya", description: "Stoning at Jamarat and complete Mina rituals. Return to Azizya apartment." },
      { dayNumber: 18, title: "13th Dhul Hijjah | Azizya", description: "Post-Hajj rest and devotional recovery at Azizya apartment." },
      { dayNumber: 19, title: "14th Dhul Hijjah | Azizya", description: "Engage in worship and rest." },
      { dayNumber: 20, title: "15th Dhul Hijjah | Azizya", description: "Engage in worship and rest." }
    ],
    inclusions: [
      "Accommodation in Star Hotels at Both Holy Places",
      "Buffet Breakfast, Lunch and Dinner",
      "Return Air Fare (By Convenient Airlines)",
      "Air Conditioned Road Transportation in Saudi Arabia",
      "Moulim Fees"
    ],
    complimentary: [
      "5 Liters Zam Zam",
      "Laundry Service",
      "Travel Kit"
    ],
    exclusions: [
      "Cost of Qurbani",
      "Transportation Cost of Tawaf-e-Ziarah",
      "Excess baggage charges above standard limits"
    ],
    hotels: [
      { name: "Madinah Munawwarah", location: "Standard Hotel", rating: "", distance: "Near the courtyard of the Haram Sharif" },
      { name: "Azizia / Kakia", location: "Apartment", rating: "", distance: "Shifting Accommodation at 4 to 8 km" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "All travel originates and terminates in Mumbai", class: "", details: "Any Excess Baggage beyond the Standard Airline Allowance, or Requests to Change Travel Dates and Routes, Will Incur Additional Charges." }
    ],
    faqs: [
      { question: "What are the required documents for booking Hajj?", answer: "To book your Hajj package, you must provide an international passport valid for at least 6 months from the travel date, along with mandatory copies of your Aadhaar Card and PAN Card. Additionally, please submit Passport Size Photographs with a high-definition white background (available in both physical prints and digital soft copies)." },
      { question: "What is the standard room occupancy?", answer: "Standard accommodation features 4 to 5 pilgrims per room. Double or triple sharing rooms can be arranged upon request at adjusted brochure rates." },
      { question: "What is the Hajj package cancellation policy?", answer: "Once booking confirmation is submitted, Hajj package payments are fully non-refundable under all cancellation circumstances." }
    ]
  },
  {
    slug: "deluxe-umrah",
    categorySlug: "umrah",
    destinationSlugs: ["makkah", "madinah"],
    title: "Umrah (14+Days)",
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
    seoTitle: "Umrah | Dayar-E-Habib",
    seoDescription: "15 Days group or customized Umrah package with hotel accommodations in front of the Haram.",
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
      "Umrah Visa",
      "Accommodation in Star Hotels at Both Holy Places",
      "Buffet Breakfast, Lunch and Dinner",
      "Return Air Fare (By Convenient Airlines)",
      "Air Conditioned Road Transportation in Saudi Arabia",
      "7 Nights accommodation in Makkah",
      "7 Nights accommodation in Madinah",
      "Scholar guidance throughout the journey",
      "Ziyarat tours in both holy cities"
    ],
    complimentary: [
      "5 Liters Zam Zam",
      "Laundry Service",
      "Travel Kit"
    ],
    exclusions: [],
    hotels: [
      { name: "Makkah Mukarma", location: "Standard Hotel", rating: "", distance: "Near the courtyard of the Haram Sharif" },
      { name: "Madinah Munawwarah", location: "Standard Hotel", rating: "", distance: "Near the courtyard of the Haram Sharif" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "All travel originates and terminates in Mumbai", class: "", details: "Any Excess Baggage beyond the Standard Airline Allowance, or Requests to Change Travel Dates and Routes, Will Incur Additional Charges." }
    ],
    faqs: [
      { question: "What are the required documents for booking Umrah?", answer: "To book your Umrah package, you must provide an international passport valid for at least 6 months from the travel date, along with mandatory copies of your Aadhaar Card and PAN Card. Additionally, please submit Passport Size Photographs with a high-definition white background (available in both physical prints and digital soft copies)." },
      { question: "Is laundry service included?", answer: "Yes, our Umrah packages include complimentary laundry service." }
    ]
  },
  {
    slug: "classic-ziyarat",
    categorySlug: "ziyarat",
    destinationSlugs: ["baghdad"],
    title: "Holy Heritage (10+Days)",
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
    seoTitle: "Holy Heritage | Dayar-E-Habib",
    seoDescription: "Join our 11-day Ziyarat group to celebrate 11vi Sharif in Baghdad. Includes 6 nights in Baghdad, 2 nights in Najaf, 2 nights in Karbala, and direct flights.",
    itinerary: [
      { dayNumber: 1, title: "Najaf Stay", description: "Arrive at Najaf Airport. Check-in to your hotel. Perform ziyarat at the sacred Dome of Maula Ali (A.S.), Masjid Kufa, and Wadi-us-Salaam." },
      { dayNumber: 3, title: "Baghdad - 11vi Sharif", description: "Transfer to Baghdad. Check-in to Atlas Baghdad Hotel in Sadun (6-night stay). Perform devotions and celebrate 11vi Sharif at the sacred Dome of Ghaus-e-Azam Sheikh Abdul Qadir Jilani." },
      { dayNumber: 9, title: "Karbala Al-Mualla", description: "Transfer to Karbala. Visit the holy shrines of Imam Hussain (A.S.) and Hazrat Abbas (A.S.) with local scholar guidance." },
      { dayNumber: 11, title: "Return Flight to Mumbai", description: "Transfer to Baghdad Airport. Board your direct flight by Iraqi Airways back to Mumbai." }
    ],
    inclusions: [
      "Return Air Fare (By Convenient Airlines)",
      "Iraq Electronic Visa processing approval",
      "Mandatory Travel Insurance cover",
      "Hotel stays (6 Nights Baghdad Sadun, 2 Nights Najaf, 2 Nights Karbala)",
      "Full board Indian buffet meals (Breakfast, Lunch & Dinner)",
      "Local group transfers in modern AC buses",
      "Experienced guide & scholar theological coordination"
    ],
    complimentary: [
      "Travel Kit"
    ],
    exclusions: [
      "Personal expenses, laundry, and local tips",
      "Excess baggage charges above standard limits"
    ],
    hotels: [
      { name: "Baghdad", location: "Standard Hotel", rating: "", distance: "6 Nights stay" },
      { name: "Najaf", location: "Standard Hotel", rating: "", distance: "2 Nights stay" },
      { name: "Karbala", location: "Standard Hotel", rating: "", distance: "2 Nights stay" }
    ],
    flights: [
      { airline: "Convenient Airlines", route: "All travel originates and terminates in Mumbai", class: "", details: "Any Excess Baggage beyond the Standard Airline Allowance, or Requests to Change Travel Dates and Routes, Will Incur Additional Charges." }
    ]
  }
];

export const CATEGORY_PACKAGES: Record<string, Package[]> = {
  hajj: [PACKAGES_DATA[0], PACKAGES_DATA[1]],
  umrah: [PACKAGES_DATA[2]],
  ziyarat: [PACKAGES_DATA[3]],
};
