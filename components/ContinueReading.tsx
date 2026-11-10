"use client";

import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { useDrawer, useHydrated } from "@/lib/nightstand";
import type { StoryCardData } from "@/lib/taxonomy";

export function ContinueReading({ cards }: { cards: StoryCardData[] }) {
  const hydrated = useHydrated();
  const drawer = useDrawer();
  if (!hydrated) return null;

  const open = drawer.inProgress
    .map((mark) => cards.find((card) => card.slug === mark.slug))
    .filter((card): card is StoryCardData => Boolean(card))
    .slice(0, 2);

  if (open.length === 0) return null;

  return (
    <section className="relative" aria-label="Continue reading">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-8 sm:pt-10">
        <div className="rounded-[24px] border border-primary/30 bg-surface/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
            You left a story open
          </p>
          <ul className="space-y-3">
            {open.map((card) => (
              <li key={card.slug}>
                <Link
                  href={`/stories/${card.slug}`}
                  className="flex items-center gap-4 group touch-manipulation"
                >
                  <span className="relative h-16 w-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <SafeImage src={card.imageUrl} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl text-foreground truncate group-hover:text-primary transition-colors">
                      {card.title}
                    </span>
                    <span className="block font-reading text-sm text-muted truncate">{card.hook}</span>
                  </span>
                  <span className="shrink-0 font-sans text-xs uppercase tracking-[0.14em] text-accent">
                    Return →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
