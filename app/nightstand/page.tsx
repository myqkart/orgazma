import type { Metadata } from "next";
import { NightstandLibrary } from "@/components/NightstandLibrary";
import { SceneTrail } from "@/components/SceneTrail";
import { PageBanner } from "@/components/PageBanner";
import { Container } from "@/components/ui/Container";
import { getAllCards } from "@/lib/catalog";
import { ATMOS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.pages.nightstand.title,
  description: SITE.pages.nightstand.description,
  robots: { index: false, follow: true },
  alternates: { canonical: "/nightstand" },
};

export default function NightstandPage() {
  const cards = getAllCards();

  return (
    <>
      <PageBanner
        eyebrow="Nightstand"
        title="What you started is still warm."
        body="Unfinished stories, the ones you kept, and the ones that already finished you. This drawer lives on this device. No account. No one else looking."
        image={ATMOS.readingGlow}
      />
      <Container clean className="py-12 sm:py-16 md:py-20">
        <NightstandLibrary cards={cards} />
      </Container>
      <SceneTrail />
    </>
  );
}
