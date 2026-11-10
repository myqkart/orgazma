import React from "react";
import Link from "next/link";
import { StoryCard } from "@/components/StoryCard";
import type { StoryCardData } from "@/lib/taxonomy";

export function HeatShelves({
  groups,
}: {
  groups: { heat: string; label: string; hint: string; cards: StoryCardData[] }[];
}) {
  return (
    <section className="relative">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 space-y-12 sm:space-y-16">
        <div className="max-w-2xl space-y-2 sm:space-y-3">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            How hard
          </p>
          <h2 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl text-foreground tracking-tight font-semibold text-balance">
            Tell the night how far to go.
          </h2>
          <p className="font-reading text-muted text-[15px] sm:text-lg">
            Simmer if you want the long touch. Ache if you want the hunger to last. Ruin if you want it rough from the early pages.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.heat} className="space-y-4">
            <div className="flex items-end justify-between gap-4 border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground">{group.label}</h3>
                <p className="font-reading text-sm text-muted mt-1">{group.hint}</p>
              </div>
              <Link
                href={`/stories?heat=${group.heat}`}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.14em] text-accent hover:text-primary min-h-11 inline-flex items-center touch-manipulation"
              >
                This heat →
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {group.cards.map((card) => (
                <div key={card.slug} className="snap-start shrink-0 w-[78%] sm:w-[280px]">
                  <StoryCard story={card} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
