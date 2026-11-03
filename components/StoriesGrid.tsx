"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { StoryCard } from "@/components/StoryCard";
import type { StoryWithSlug } from "@/types/story";

interface StoriesGridProps {
  stories: StoryWithSlug[];
  onOpen?: (slug: string) => void;
}

export function StoriesGrid({ stories, onOpen }: StoriesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return stories;

    return stories.filter((story) => {
      const matchTitle = story.title.toLowerCase().includes(query);
      const matchSubtitle = (story.subtitle || "").toLowerCase().includes(query);
      const matchPreview = (story.previewText || "").toLowerCase().includes(query);
      return matchTitle || matchSubtitle || matchPreview;
    });
  }, [stories, searchQuery]);

  return (
    <section id="collection" className="scroll-mt-24 relative">
      <Container clean className="py-16 md:py-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[rgba(141,194,208,0.14)]">
          <div className="space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl text-[#E6EEF0] tracking-tight">
              The Collection
            </h2>
            <p className="font-display italic text-[#A0B0C0] text-base sm:text-lg">
              Pick the mood you&apos;re in. Every story is a door.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A0B0C0]">
              <svg
                className="w-4 h-4 text-[#8DC2D0]/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a mood, a name, a morning…"
              aria-label="Search stories by mood, name, or morning"
              className="w-full pl-10 pr-9 py-2.5 rounded-[14px] bg-[#172235] border border-[rgba(141,194,208,0.18)] text-sm text-[#E6EEF0] placeholder-[#A0B0C0]/60 focus:border-[#8DC2D0] focus:ring-1 focus:ring-[#8DC2D0] focus:outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#A0B0C0] hover:text-[#8DC2D0] cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Story Grid or No Results */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStories.map((story, index) => (
              <div
                key={story.slug}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                style={{ animationDelay: `${Math.min(index * 60, 360)}ms` }}
              >
                <StoryCard
                  story={story}
                  onOpen={onOpen}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-[20px] bg-[#172235]/50 border border-[rgba(141,194,208,0.12)] max-w-lg mx-auto"
            role="status"
          >
            <p className="font-display italic text-xl text-[#E6EEF0] mb-4">
              Nothing like that yet. Try another mood.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs uppercase tracking-[0.12em] font-sans text-[#8DC2D0] hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
