// app/_utilities/fonts.js (example)
import { Bebas_Neue, Figtree, Inter, Poppins, Roboto } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial Black", "sans-serif"],
});

export const figtree = Figtree({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  fallback: [
    "-apple-system", 
    "BlinkMacSystemFont", 
    "Segoe UI", 
    "Roboto", 
    "Oxygen", 
    "Ubuntu", 
    "Cantarell", 
    "Fira Sans", 
    "Droid Sans", 
    "Helvetica Neue", 
    "sans-serif"
  ],
  preload: true,
  adjustFontFallback: true,
});

export const inter = Inter({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
