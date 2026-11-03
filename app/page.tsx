import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { StoryCard } from "@/components/StoryCard";
import { FeaturedCard } from "@/components/FeaturedCard";
import { LoadingState, EmptyState, ErrorState } from "@/components/SystemStates";
import { SafeImage } from "@/components/ui/ImageFallback";
import { getAllStories, getFeatured } from "@/lib/stories";

export default function Page() {
  const stories = getAllStories();
  const featured = getFeatured() || stories[0];

  return (
    <main className="min-h-screen py-12 bg-[#0C1420]">
      <Container clean className="space-y-16">
        <header className="border-b border-[rgba(141,194,208,0.14)] pb-8">
          <h1 className="font-display text-4xl text-[#8DC2D0] mb-2">Phase 3 Component Preview</h1>
          <p className="font-sans text-sm text-[#A0B0C0] uppercase tracking-[0.12em]">
            Design System &amp; Shared Components
          </p>
        </header>

        {/* Buttons & Pills */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[#E6EEF0]">Buttons &amp; Pills</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Pill>8 min</Pill>
            <Pill>8 min of your own time</Pill>
          </div>
        </section>

        {/* Featured Card */}
        {featured && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-[#E6EEF0]">Featured Story Variant</h2>
            <FeaturedCard story={featured} />
          </section>
        )}

        {/* Story Grid */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[#E6EEF0]">Standard Story Cards (Grid Preview)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {stories.slice(0, 3).map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* Image Fallback Check */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl text-[#E6EEF0]">Image Fallback Component</h2>
          <div className="w-64 h-80 rounded-[20px] overflow-hidden">
            <SafeImage src="https://images.invalid-domain-test.xyz/broken.jpg" alt="Broken test image" />
          </div>
        </section>

        {/* System States */}
        <section className="space-y-6 border-t border-[rgba(141,194,208,0.14)] pt-8">
          <h2 className="font-display text-2xl text-[#E6EEF0]">System States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[20px] bg-[#172235] border border-[rgba(141,194,208,0.14)] p-4">
              <LoadingState />
            </div>
            <div className="rounded-[20px] bg-[#172235] border border-[rgba(141,194,208,0.14)] p-4">
              <EmptyState />
            </div>
            <div className="rounded-[20px] bg-[#172235] border border-[rgba(141,194,208,0.14)] p-4">
              <ErrorState />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
