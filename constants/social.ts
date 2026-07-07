import type { SocialLink } from "@/types/social";

export const SOCIALS_DATA: SocialLink[] = [
  {
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/share/1LxKDZ8k9a/?mibextid=wwXIfr",
    active: true,
    displayOrder: 1,
  },
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/dayar_e_habib_tours_travel?igsh=a2NzbXp2bnN3Zzk5&utm_source=qr",
    active: true,
    displayOrder: 2,
  },
  {
    platform: "youtube",
    label: "YouTube",
    url: "#",
    active: false,
    displayOrder: 3,
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/917045707070",
    active: true,
    displayOrder: 4,
  },
];
