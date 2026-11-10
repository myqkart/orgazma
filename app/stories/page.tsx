import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveBrowser } from "@/components/ArchiveBrowser";
import { PageBanner } from "@/components/PageBanner";
import { SceneTrail } from "@/components/SceneTrail";
import { getAllCards } from "@/lib/catalog";
import { ATMOS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.pages.stories.title,
  description: SITE.pages.stories.description,
  alternates: { canonical: "/stories" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/stories",
    siteName: SITE.name,
    title: SITE.pages.stories.title,
    description: SITE.pages.stories.description,
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: "The Orgazma archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.pages.stories.title,
    description: SITE.pages.stories.description,
    images: [SITE.ogImage.url],
  },
};

export default function StoriesPage() {
  const cards = getAllCards();

  return (
    <>
      <PageBanner
        eyebrow="The archive"
        title="Every door, if you want to choose with your hands."
        body="Filter by hunger, heat, length, and the kind of touch. Or search a name. The stories are not a list. They are rooms."
        image={ATMOS.collection}
      />
      <Suspense fallback={<p className="text-center font-reading text-muted py-16">Setting the room…</p>}>
        <ArchiveBrowser cards={cards} />
      </Suspense>
      <SceneTrail />
    </>
  );
}
