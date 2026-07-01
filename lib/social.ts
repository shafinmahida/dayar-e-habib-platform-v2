import { Circle, Globe, Link2, Share2, type LucideIcon } from "lucide-react";
import type { SocialPlatform } from "@/types/social";

export const SOCIAL_ICON_MAP: Record<SocialPlatform, LucideIcon> = {
  facebook: Share2,
  instagram: Circle,
  youtube: Globe,
  whatsapp: Link2,
};
