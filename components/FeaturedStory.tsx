import React from "react";
import { Container } from "@/components/ui/Container";
import { FeaturedCard } from "@/components/FeaturedCard";
import type { StoryCardData } from "@/lib/taxonomy";

export function FeaturedStory({ story }: { story?: StoryCardData }) {
  if (!story) return null;

  return (
    <section className="relative">
      <Container clean className="py-12 sm:py-16 md:py-24">
        <FeaturedCard story={story} />
      </Container>
    </section>
  );
}
