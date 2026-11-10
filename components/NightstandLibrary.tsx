"use client";

import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Button } from "@/components/ui/Button";
import { useDrawer, useHydrated } from "@/lib/nightstand";
import type { StoryCardData } from "@/lib/taxonomy";

function Shelf({
  title,
  body,
  stories,
}: {
  title: string;
  body: string;
  stories: StoryCardData[];
}) {
  if (stories.length === 0) return null;
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl text-foreground">{title}</h2>
        <p className="font-reading text-sm text-muted">{body}</p>
      </div>
      <ul className="space-y-3">
        {stories.map((story) => (
          <li key={story.slug}>
            <Link
              href={`/stories/${story.slug}`}
              className="flex items-center gap-4 rounded-[20px] border border-white/[0.08] bg-card/50 p-3 sm:p-4 hover:border-primary/35 transition-colors touch-manipulation"
            >
              <span className="relative h-20 w-16 rounded-xl overflow-hidden shrink-0">
                <SafeImage src={story.imageUrl} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xl text-foreground">{story.title}</span>
                <span className="block font-reading text-sm text-muted line-clamp-2">{story.hook}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NightstandLibrary({ cards }: { cards: StoryCardData[] }) {
  const hydrated = useHydrated();
  const drawer = useDrawer();

  if (!hydrated) {
    return (
      <p className="font-reading text-muted text-center py-16">Opening the drawer…</p>
    );
  }

  const bySlug = new Map(cards.map((card) => [card.slug, card]));
  const pick = (slugs: string[]) =>
    slugs
      .map((slug) => bySlug.get(slug))
      .filter((card): card is StoryCardData => Boolean(card));

  const readingSlugs = new Set(drawer.inProgress.map((mark) => mark.slug));
  const inProgress = pick(drawer.inProgress.map((mark) => mark.slug));
  const kept = pick(
    drawer.saved.filter((slug) => !readingSlugs.has(slug) && !drawer.finished.includes(slug))
  );
  const finished = pick(drawer.finished.filter((slug) => !readingSlugs.has(slug)));
  const empty = inProgress.length + kept.length + finished.length === 0;

  if (empty) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-5 py-8">
        <p className="font-display italic text-2xl sm:text-3xl text-foreground text-balance">
          The drawer is empty. The night has not touched you yet.
        </p>
        <p className="font-reading text-muted">
          Start a story and leave it unfinished, or keep one for later. It will wait on this device, privately.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button href="/cravings">Choose a hunger</Button>
          <Button variant="glass" href="/stories">
            Open the archive
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Shelf
        title="Still inside"
        body="You left these mid-breath. They remember where you stopped."
        stories={inProgress}
      />
      <Shelf
        title="Kept for later"
        body="Saved, not started. A promise you made to your own night."
        stories={kept}
      />
      <Shelf
        title="Already finished"
        body="The afterglow shelf. Reread them when the quiet gets loud."
        stories={finished}
      />
    </div>
  );
}
