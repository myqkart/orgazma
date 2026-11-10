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
  colorScheme: "dark",
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

/**
 * Keep root metadata free of `alternates` / `openGraph` / `twitter`.
 * Those fields break Cache Components prerender for /stories/[slug].
 * Static pages export their own social tags; story pages hoist <title>/<meta> in-tree.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.pages.home.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.creator, url: SITE.url }],
  creator: SITE.creator,
  publisher: SITE.creator,
  keywords: [...SITE.keywords],
  category: "adult entertainment",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
  other: {
    rating: "adult",
    "RTA-5042-1996-1400-1577-RTA": "RTA-5042-1996-1400-1577-RTA",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: SITE.language,
  audience: {
    "@type": "PeopleAudience",
    requiredMinAge: 18,
  },
  publisher: {
    "@type": "Organization",
    name: SITE.creator,
    url: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.language}
      className={`${display.variable} ${reading.variable} ${sans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased relative selection:bg-primary selection:text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
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
