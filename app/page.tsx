import { Hero } from "@/components/Hero";
import { FeaturedStory } from "@/components/FeaturedStory";
import { MoodStrip } from "@/components/MoodStrip";
import { StoriesGrid } from "@/components/StoriesGrid";
import { ImageRibbon } from "@/components/ImageRibbon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllStories, getFeatured } from "@/lib/stories";

export default function Page() {
  const stories = getAllStories();
  const featured = getFeatured();
  const preview = stories.slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedStory story={featured} />
      <MoodStrip />
      <StoriesGrid
        stories={preview}
        title="Start getting wet"
        subtitle="Three doors. One night. Pick who ruins you first."
        showSearch={false}
      />
      <ImageRibbon />
      <section className="relative">
        <Container clean className="py-12 sm:py-16 md:py-20 text-center space-y-5 sm:space-y-6">
          <h2 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight max-w-2xl mx-auto text-balance px-1">
            Still aching? There&apos;s a whole archive of heat waiting.
          </h2>
          <p className="font-reading text-muted text-[15px] sm:text-lg max-w-lg mx-auto">
            Every story is explicit. Every page wants you alone.
          </p>
          <Button variant="primary" size="lg" href="/stories" className="w-full max-w-xs sm:w-auto">
            Open the full heat
          </Button>
        </Container>
      </section>
    </>
  );
}
