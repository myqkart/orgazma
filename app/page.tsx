import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { FeaturedStory } from "@/components/FeaturedStory";
import { CravingDoors } from "@/components/CravingDoors";
import { HeatShelves } from "@/components/HeatShelves";
import { NightPath } from "@/components/NightPath";
import { ThreadStrip } from "@/components/ThreadStrip";
import { ContinueReading } from "@/components/ContinueReading";
import { ImageRibbon } from "@/components/ImageRibbon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllCards, getCravingRooms, getNightPath, getThreadRooms, getTonight } from "@/lib/catalog";
import { cardsByHeat } from "@/lib/taxonomy";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.pages.home.title },
  description: SITE.pages.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.pages.home.title,
    description: SITE.pages.home.description,
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: SITE.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.pages.home.title,
    description: SITE.pages.home.description,
    images: [SITE.ogImage.url],
    creator: SITE.twitterHandle,
  },
};

export default function Page() {
  const cards = getAllCards();
  const tonight = getTonight();
  const rooms = getCravingRooms();
  const path = getNightPath();
  const heats = cardsByHeat(cards);
  const malini = getThreadRooms()[0];

  return (
    <>
      <Hero />
      <ContinueReading cards={cards} />
      <FeaturedStory story={tonight} />
      <CravingDoors rooms={rooms} />
      <ImageRibbon />
      <NightPath steps={path} />
      <HeatShelves groups={heats} />
      {malini && <ThreadStrip room={malini} />}
      <section className="relative">
        <Container clean className="py-12 sm:py-16 md:py-20 text-center space-y-5 sm:space-y-6">
          <h2 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight max-w-2xl mx-auto text-balance px-1">
            Or ignore the path and open every door yourself.
          </h2>
          <p className="font-reading text-muted text-[15px] sm:text-lg max-w-lg mx-auto">
            The archive keeps the heat, the length, and the kind of touch. Your nightstand keeps the ones you could not finish.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button variant="primary" size="lg" href="/stories" className="w-full sm:w-auto">
              Open the archive
            </Button>
            <Button variant="glass" size="lg" href="/nightstand" className="w-full sm:w-auto">
              Check the nightstand
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
