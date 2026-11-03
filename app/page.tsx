import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { StoryReader } from "@/components/StoryReader";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { getAllStories, getFeatured } from "@/lib/stories";

export default function Page() {
  const stories = getAllStories();
  const featured = getFeatured();
  const hasFeatured = Boolean(featured);

  return (
    <AgeGate>
      <div className="min-h-screen bg-[#0E080D] text-[#F8EDF2] flex flex-col justify-between selection:bg-[#702442] selection:text-[#F8EDF2]">
        <Navigation hasFeatured={hasFeatured} />
        <main className="flex-1">
          <Hero hasFeatured={hasFeatured} />
          <StoryReader stories={stories} featured={featured} />
        </main>
        <Footer />
      </div>
    </AgeGate>
  );
}
