import { Inter, Manrope, Playfair_Display, Caveat } from "next/font/google";

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const fontHandwritten = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "700"],
  display: "swap",
});
