import type { Service } from "@/types/service";

export const SERVICES_DATA: Service[] = [
  {
    slug: "hajj",
    title: "Hajj Services",
    description: "Complete logistical and administrative support for the lifetime pilgrimage. Our packages are designed to provide absolute focus on your acts of worship.",
    details: [
      "Accommodations close to the Haram boundaries",
      "Mina and Arafat campsite coordination",
      "Experienced travel guidance"
    ],
    iconName: "Compass",
    active: true,
    featured: true,
    displayOrder: 1,
    seoTitle: "Hajj Tour Services | Dayar-E-Habib",
    seoDescription: "Complete Hajj tour services including accommodations, campsite coordination, and experienced travel guidance since 1986.",
  },
  {
    slug: "umrah",
    title: "Umrah Programs",
    description: "Tailored individual and group itineraries available year-round. We coordinate flight plans, premium lodging, and local transfers to ensure a peaceful journey.",
    details: [
      "Customized durations and family suites",
      "Assistance upon arrival at Jeddah/Madinah airports",
      "Multilingual local helpers"
    ],
    iconName: "Moon",
    active: true,
    featured: true,
    displayOrder: 2,
    seoTitle: "Year-Round Umrah Programs | Dayar-E-Habib",
    seoDescription: "Tailored individual and group Umrah itineraries with premium lodging, airport assistance, and multilingual support.",
  },
  {
    slug: "ziyarat",
    title: "Ziyarat Tours",
    description: "Historical and spiritual journeys to sacred sites across Iraq, Iran, and Syria. Our guided itineraries focus on historical contexts and educational value.",
    details: [
      "Experienced group tour coordinators",
      "Secure and reliable local transportation",
      "Full itinerary management"
    ],
    iconName: "Map",
    active: true,
    featured: true,
    displayOrder: 3,
    seoTitle: "Ziyarat Tours to Iraq & Historical Sites | Dayar-E-Habib",
    seoDescription: "Scholar-guided Ziyarat tours to sacred sites across Iraq, Iran, and Syria with full itinerary management.",
  },
  {
    slug: "flights",
    title: "Flight Bookings",
    description: "Direct and multi-city airline ticket reservations with top carriers. We secure flexible booking terms and group rates for our travel clients.",
    details: [
      "Partnerships with premium global airlines",
      "Baggage policy and class upgrade support",
      "Quick adjustments and cancellation management"
    ],
    iconName: "Plane",
    active: true,
    featured: false,
    displayOrder: 4,
    seoTitle: null,
    seoDescription: null,
  },
  {
    slug: "hotels",
    title: "Hotel Reservations",
    description: "Selected proximity lodging in Makkah, Madinah, and global travel destinations. We pre-screen hotels to verify quality, cleanliness, and accessibility.",
    details: [
      "Hotels within walking distance of Haram gates",
      "Flexible check-in and breakfast arrangements",
      "Pre-verified amenities and family rooms"
    ],
    iconName: "Building",
    active: true,
    featured: false,
    displayOrder: 5,
    seoTitle: null,
    seoDescription: null,
  },
  {
    slug: "visa",
    title: "Visa Services",
    description: "Efficient and compliant visa processing for pilgrims and travelers. Our team handles applications, document verification, and submission checks.",
    details: [
      "Direct electronic visa processing channels",
      "Detailed checklist guidelines for applicants",
      "Prompt updates on government regulations"
    ],
    iconName: "FileCheck",
    active: true,
    featured: false,
    displayOrder: 6,
    seoTitle: null,
    seoDescription: null,
  }
];
