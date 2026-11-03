import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedStory } from "@/components/FeaturedStory";
import { StoriesGrid } from "@/components/StoriesGrid";
import { Footer } from "@/components/Footer";
import { getAllStories, getFeatured } from "@/lib/stories";

export default function Page() {
  const stories = getAllStories();
  const featured = getFeatured();
  const hasFeatured = Boolean(featured);

  return (
    <div className="min-h-screen bg-[#0C1420] text-[#E6EEF0] flex flex-col justify-between selection:bg-[#4C87A5] selection:text-[#0C1420]">
      <Navigation hasFeatured={hasFeatured} />
      <main className="flex-1">
        <Hero hasFeatured={hasFeatured} />
        {featured && <FeaturedStory story={featured} />}
        <StoriesGrid stories={stories} />
      </main>
      <Footer />
    </div>
  );
}
