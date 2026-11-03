"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { StoryCard } from "@/components/StoryCard";
import type { StoryWithSlug } from "@/types/story";

interface StoriesGridProps {
  stories: StoryWithSlug[];
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

export function StoriesGrid({
  stories,
  title = "Every filthy page",
  subtitle = "Pick a mood. Open your legs to the story.",
  showSearch = true,
}: StoriesGridProps) {
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
    <section className="relative">
      <Container clean className="py-12 sm:py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-white/[0.08]">
          <div className="space-y-2 sm:space-y-3 max-w-xl">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              The heat archive
            </p>
            <h2 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl text-foreground tracking-tight font-semibold text-balance">
              {title}
            </h2>
            <p className="font-reading text-muted text-[15px] sm:text-lg">
              {subtitle}
            </p>
          </div>

          {showSearch && (
            <div className="relative w-full md:w-80 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
                <svg
                  className="w-4 h-4 text-accent/80"
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
                type="search"
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hunt a craving…"
                aria-label="Search stories"
                className="w-full min-h-12 pl-11 pr-10 py-3 rounded-full bg-white/[0.04] border border-white/[0.1] text-base sm:text-sm text-foreground placeholder-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-muted hover:text-accent cursor-pointer touch-manipulation"
                >
                  <span className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-lg leading-none">
                    ×
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredStories.map((story, index) => (
              <StoryCard
                key={story.slug}
                story={story}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center max-w-lg mx-auto" role="status">
            <p className="font-display italic text-xl sm:text-2xl text-foreground mb-4">
              Nothing that filthy matches. Try another craving.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="min-h-11 px-4 text-xs uppercase tracking-[0.14em] font-sans font-medium text-accent hover:underline cursor-pointer touch-manipulation"
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
