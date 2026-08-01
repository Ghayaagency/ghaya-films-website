import { Fraunces, Inter } from "next/font/google";
import localFont from "next/font/local";

export const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const arabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Lalezar-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

// Brand typeface (trial build — see note in lib/fonts.ts / final build summary:
// this file is missing punctuation glyphs like & ' " : ( ) and is licensed for
// trial use only, so it's scoped to short all-caps labels that avoid those
// characters rather than used for body copy or headline prose).
export const brandon = localFont({
  variable: "--font-brandon",
  display: "swap",
  src: [
    {
      path: "../fonts/brandon-grotesque/BrandonGrotesque-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/brandon-grotesque/BrandonGrotesque-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/brandon-grotesque/BrandonGrotesque-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/brandon-grotesque/BrandonGrotesque-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/brandon-grotesque/BrandonGrotesque-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});
