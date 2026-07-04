export interface SpecialistInfo {
  name: string;
  phone: string;
  role: string;
}

export const CONTACT_DATA = {
  primaryPhone: "+91 7045 707070",
  primaryEmail: "dhtinfo@gmail.com",
  offices: [
    {
      slug: "mumbai-hq",
      name: "Head Office — Mumbai",
      address: "265 S.V.P. Road, Karim Mansion, Shop 1, Opp. Khoja Kabarastan, Mumbai - 400009, India",
      phone: "+91 7045 707070",
      email: "dhtinfo@gmail.com",
      mapLink: null,
      workingHours: "10:00 AM - 9:00 PM (Mon - Sat)",
      active: true,
      displayOrder: 1,
    },
  ],
  specialists: {
    brand: {
      name: "Dayar-E-Habib",
      phone: "+91 7045 707070",
      role: "General & WhatsApp Coordinator",
    },
    hajj: {
      phone: "+91 98193 99555",
      role: "Hajj & Ziyarat Inquiry",
    },
    flights: {
      phone: "+91 62301 42301",
      role: "Flight Booking & Visa Dept",
    },
    umrah: {
      phone: "+91 98927 34480",
      role: "Umrah & Visa Inquiry",
    },
  },
};
