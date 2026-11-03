import type { Metadata } from "next";
import { Cormorant_Garamond, Literata, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velvet Hours — Adult Fiction for Women",
  description: "Slow-burn erotic stories for adult women. 18+ only.",
  other: {
    rating: "adult",
    "RTA-5042-1996-1400-1577-RTA": "RTA-5042-1996-1400-1577-RTA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${literata.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#0E080D] text-[#F8EDF2] font-[family-name:var(--font-inter)] antialiased relative selection:bg-[#702442] selection:text-[#F8EDF2]">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
