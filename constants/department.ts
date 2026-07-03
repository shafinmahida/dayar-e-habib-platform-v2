import type { Department } from "@/types/department";

export const DEPARTMENTS_DATA: Department[] = [
  {
    slug: "hajj",
    name: "Hajj Department",
    description: "Specialized team managing all long-term accommodations, air logistics, tent allocations, and scholar schedules in Mina and Arafat.",
    email: "hajj@dayarehabib.com",
    phone: "+91 98193 99555", // Javeed Bumedia
    active: true,
    displayOrder: 1,
  },
  {
    slug: "umrah",
    name: "Umrah Department",
    description: "Customized and group travel support services for Umrah pilgrims throughout the year.",
    email: "umrah@dayarehabib.com",
    phone: "+91 98927 34480", // Abbas Bumedia
    active: true,
    displayOrder: 2,
  },
  {
    slug: "ziyarat",
    name: "Ziyarat & Tours Department",
    description: "Historical Ziyarat groups covering Baghdad, Karbala, Najaf, and Al-Aqsa.",
    email: "tours@dayarehabib.com",
    phone: "+91 98193 99555", // Javeed Bumedia
    active: true,
    displayOrder: 3,
  },
  {
    slug: "logistics",
    name: "Logistics & Flight Bookings",
    description: "Dedicated visa processing, flight bookings, and hotel booking support.",
    email: "dhtinfo@gmail.com",
    phone: "+91 98207 86726", // Khalil Bumedia
    active: true,
    displayOrder: 4,
  },
];
