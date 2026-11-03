import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/ImageFallback";
import { ATMOS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.pages.about.title,
  description: SITE.pages.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/about",
    siteName: SITE.name,
    title: SITE.pages.about.title,
    description: SITE.pages.about.description,
    images: [
      {
        url: SITE.ogImage.url,
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: "Orgazma after dark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.pages.about.title,
    description: SITE.pages.about.description,
    images: [SITE.ogImage.url],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-[5.5rem] sm:pt-24 px-3 sm:px-5 md:px-8">
        <div className="relative min-h-[40svh] sm:min-h-[48svh] flex items-end overflow-hidden rounded-[22px] sm:rounded-[40px] border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0">
            <SafeImage
              src={ATMOS.about}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center saturate-[0.9] brightness-[0.48]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
          </div>
          <Container clean className="relative z-10 pb-10 sm:pb-14 pt-20 sm:pt-24 space-y-3 sm:space-y-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-accent font-semibold">
              After dark
            </p>
            <h1 className="font-display text-[1.85rem] sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight max-w-3xl leading-[1.08] text-balance">
              A private room for people who read with their whole body.
            </h1>
          </Container>
        </div>
      </section>

      <Container clean className="py-12 sm:py-16 md:py-24 max-w-3xl space-y-8 sm:space-y-10">
        <div className="space-y-4 sm:space-y-5 font-reading text-[15px] sm:text-lg text-foreground/90 leading-relaxed">
          <p>
            {SITE.name} is erotic fiction for adults who are done pretending they only want soft fade-to-black.
            These pages are explicit. Hungry. Built for late hours, locked doors, and the kind of loneliness that needs a story between its legs.
          </p>
          <p>
            No ads screaming at you. No shallow swipe-feed. Just atmosphere, beautiful images, and stories that know exactly what you came for.
          </p>
          <p>
            Read alone. Read slow. Read until the room feels warmer than it should.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 pt-2 sm:pt-4">
          {[
            {
              title: "Night-first",
              body: "Dark UI, warm ember light, and imagery that feels like skin after midnight.",
            },
            {
              title: "Made to read",
              body: "Comfortable type, font controls, progress, and resume — so you never lose the wet part.",
            },
            {
              title: "Adults only",
              body: SITE.ageNote,
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-accent/30 pt-4 sm:pt-5 space-y-2">
              <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">
                {item.title}
              </h2>
              <p className="font-reading text-sm text-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 sm:pt-6">
          <Button variant="primary" size="lg" href="/stories" className="w-full sm:w-auto">
            Take me to the heat
          </Button>
        </div>
      </Container>
    </>
  );
}
