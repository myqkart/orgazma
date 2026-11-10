import type { Metadata } from "next";
import { DiveRoom } from "@/components/DiveRoom";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.pages.dive.title,
  description: SITE.pages.dive.description,
  alternates: { canonical: "/dive" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/dive",
    siteName: SITE.name,
    title: SITE.pages.dive.title,
    description: SITE.pages.dive.description,
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: "Orgazma dive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.pages.dive.title,
    description: SITE.pages.dive.description,
    images: [SITE.ogImage.url],
  },
};

export default function DivePage() {
  return <DiveRoom />;
}
