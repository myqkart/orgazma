"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { FeaturedCard } from "@/components/FeaturedCard";
import type { StoryWithSlug } from "@/types/story";

interface FeaturedStoryProps {
  story?: StoryWithSlug;
  onOpen?: (slug: string) => void;
}

export function FeaturedStory({ story, onOpen }: FeaturedStoryProps) {
  if (!story) return null;

  return (
    <section id="pick" className="scroll-mt-24 relative">
      <Container clean className="pt-8 pb-16 md:py-20">
        <div className="mb-6 space-y-1">
          <p className="font-display italic text-[#A0B0C0] text-sm sm:text-base">
            Chosen for the mood you&apos;re probably in.
          </p>
        </div>
        <FeaturedCard story={story} onOpen={onOpen} />
      </Container>
    </section>
  );
}
