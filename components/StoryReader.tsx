"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FeaturedStory } from "@/components/FeaturedStory";
import { StoriesGrid } from "@/components/StoriesGrid";
import { ReadingModal } from "@/components/ReadingModal";
import type { StoryWithSlug } from "@/types/story";

interface StoryReaderProps {
  stories: StoryWithSlug[];
  featured?: StoryWithSlug;
}

export function StoryReader({ stories, featured }: StoryReaderProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Parse active slug from URL hash if present
  const getSlugFromHash = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    const match = hash.match(/^#story=([a-z0-9-]+)$/i);
    return match ? match[1] : null;
  }, []);

  // Listen to hash changes (back / forward browser navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const slug = getSlugFromHash();
      if (slug) {
        const found = stories.some((s) => s.slug === slug);
        if (found) {
          setActiveSlug(slug);
        } else {
          setActiveSlug(null);
        }
      } else {
        setActiveSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [stories, getSlugFromHash]);

  const handleOpenStory = useCallback((slug: string) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}${window.location.search}#story=${slug}`;
      window.history.pushState({ storySlug: slug }, "", newUrl);
    }
  }, []);

  const handleCloseStory = useCallback(() => {
    setActiveSlug(null);
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}${window.location.search}`;
      window.history.pushState({}, "", newUrl);
    }
  }, []);

  const handleSelectAnotherStory = useCallback(() => {
    handleCloseStory();
    setTimeout(() => {
      const el = document.getElementById("collection");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [handleCloseStory]);

  const activeStory = useMemo(() => {
    if (!activeSlug) return null;
    return stories.find((s) => s.slug === activeSlug) || null;
  }, [stories, activeSlug]);

  return (
    <>
      {featured && (
        <FeaturedStory story={featured} onOpen={handleOpenStory} />
      )}
      <StoriesGrid stories={stories} onOpen={handleOpenStory} />
      <ReadingModal
        story={activeStory}
        onClose={handleCloseStory}
        onSelectAnotherStory={handleSelectAnotherStory}
      />
    </>
  );
}

