import { Roboto, Roboto_Condensed } from "next/font/google";

export const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: [ "300", "400", "500", "600", "700", "800"],
});

export const robotoCondensedFont = Roboto_Condensed({
  variable: "--font-roboto_condensed",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "700"],
});