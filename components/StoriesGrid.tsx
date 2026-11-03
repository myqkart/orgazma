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
      <Container clean className="py-20 md:py-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#C66B91] font-semibold">
                Curated Library
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F8EDF2] tracking-tight">
              The Collection
            </h2>
            <p className="font-reading text-[#BFA5B1] text-base sm:text-lg">
              Pick the mood you&apos;re in. Every story is a door.
            </p>
          </div>

          {/* Modern Search Capsule */}
          <div className="relative w-full md:w-84">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#BFA5B1]">
              <svg
                className="w-4 h-4 text-[#C66B91]/80"
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
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/[0.1] text-sm text-[#F8EDF2] placeholder-[#BFA5B1]/50 focus:border-[#C66B91] focus:ring-2 focus:ring-[#C66B91]/20 focus:outline-none transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#BFA5B1] hover:text-[#C66B91] cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center hover:bg-white/[0.15] transition-colors">
                  <svg
                    className="w-3 h-3"
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
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Story Grid or No Results */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-9">
            {filteredStories.map((story, index) => (
              <div
                key={story.slug}
                className="animate-in fade-in slide-in-from-bottom-5 duration-500 fill-mode-both"
                style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
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
            className="flex flex-col items-center justify-center py-24 px-6 text-center rounded-[28px] bg-white/[0.02] border border-white/[0.08] max-w-lg mx-auto shadow-2xl"
            role="status"
          >
            <div className="w-12 h-12 rounded-full bg-[#702442]/20 border border-[#C66B91]/30 flex items-center justify-center mb-5 text-[#C66B91]">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="font-display italic text-2xl text-[#F8EDF2] mb-4">
              Nothing like that yet. Try another mood.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs uppercase tracking-[0.14em] font-sans font-medium text-[#C66B91] hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
