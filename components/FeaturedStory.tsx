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
      <Container clean className="pt-8 pb-16 md:py-24">
        <div className="mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#C66B91] font-semibold">
            Chosen for the mood you&apos;re probably in.
          </p>
        </div>
        <FeaturedCard story={story} onOpen={onOpen} />
      </Container>
    </section>
  );
}
