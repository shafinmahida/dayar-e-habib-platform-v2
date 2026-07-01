import { SITE_SETTINGS } from "@/constants/settings";
import { COMPANY_DATA } from "@/constants/company";

export const SITE_NAME = SITE_SETTINGS.siteName;

export const SITE_DESCRIPTION = SITE_SETTINGS.siteDescription;

export const BRAND_NAME = COMPANY_DATA.name.split(" Tours")[0]; // "Dayar-E-Habib"

export const FOOTER_TAGLINE = COMPANY_DATA.description;
