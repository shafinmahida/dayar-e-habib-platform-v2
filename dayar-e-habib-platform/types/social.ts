export type SocialPlatform = "facebook" | "instagram" | "youtube" | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  active: boolean;
  displayOrder: number;
}
