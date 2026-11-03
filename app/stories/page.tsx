import type { Metadata } from "next";
import { StoriesGrid } from "@/components/StoriesGrid";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Container } from "@/components/ui/Container";
import { getAllStories } from "@/lib/stories";
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
        alt: "The Heat archive",
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
  const stories = getAllStories();

  return (
    <>
      <section className="relative pt-[5.5rem] sm:pt-24 px-3 sm:px-5 md:px-8">
        <div className="relative min-h-[38svh] sm:min-h-[44svh] flex items-end overflow-hidden rounded-[22px] sm:rounded-[40px] border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0">
            <SafeImage
              src={ATMOS.collection}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center saturate-[0.88] brightness-[0.45]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
          </div>
          <Container clean className="relative z-10 pb-8 sm:pb-12 pt-20 sm:pt-24 space-y-3 sm:space-y-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-accent font-semibold">
              The heat archive
            </p>
            <h1 className="font-display text-[1.85rem] sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight max-w-3xl leading-[1.08] text-balance">
              Every filthy story. Sorted by how badly you need it.
            </h1>
            <p className="font-reading text-[15px] sm:text-lg text-muted max-w-xl">
              Hunt a mood. Open a door. Stay until your hands forget the phone.
            </p>
          </Container>
        </div>
      </section>

      <StoriesGrid stories={stories} />
    </>
  );
}
