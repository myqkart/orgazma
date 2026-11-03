import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Literata, Syne } from "next/font/google";
import { AgeGate } from "@/components/AgeGate";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#04060f",
};

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const reading = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-reading",
  display: "swap",
});

const sans = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Explicit erotic fiction`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
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
      className={`${display.variable} ${reading.variable} ${sans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased relative selection:bg-primary selection:text-foreground">
        <div className="grain-overlay" aria-hidden="true" />
        <AgeGate>
          <Suspense fallback={null}>
            <AmbientBackground />
          </Suspense>
          <div className="relative z-10 min-h-screen flex flex-col">
            <Suspense fallback={<div className="h-16" />}>
              <Navigation />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </AgeGate>
      </body>
    </html>
  );
}
