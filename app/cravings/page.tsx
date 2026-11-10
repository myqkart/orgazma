import type { Metadata } from "next";
import { CravingDoors } from "@/components/CravingDoors";
import { PageBanner } from "@/components/PageBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCravingRooms } from "@/lib/catalog";
import { ATMOS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.pages.cravings.title,
  description: SITE.pages.cravings.description,
  alternates: { canonical: "/cravings" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/cravings",
    siteName: SITE.name,
    title: SITE.pages.cravings.title,
    description: SITE.pages.cravings.description,
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: "Orgazma cravings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.pages.cravings.title,
    description: SITE.pages.cravings.description,
    images: [SITE.ogImage.url],
  },
};

export default function CravingsPage() {
  const rooms = getCravingRooms();

  return (
    <>
      <PageBanner
        eyebrow="Cravings"
        title="Name the hunger before you open a door."
        body="Dreams. Silence. Strangers. Being watched. Her hands. Pick the room. The stories inside already agree with you."
        image={ATMOS.heroSoft}
      />
      <CravingDoors
        rooms={rooms}
        eyebrow="The rooms"
        title="Five hungers. None of them is a category page."
        body="Each room has its own promise. Some hold one story on purpose. Scarcity can be the seduction."
      />
      <Container clean className="pb-16 text-center space-y-4">
        <p className="font-reading text-muted">
          Want it narrower? Heat, length, and touch live in the archive.
        </p>
        <Button variant="glass" href="/stories">
          Be more precise
        </Button>
      </Container>
    </>
  );
}
