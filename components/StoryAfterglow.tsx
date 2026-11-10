import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StoryCard } from "@/components/StoryCard";
import { heatLabel, lengthLabel, type StoryCardData } from "@/lib/taxonomy";

export function StoryAfterglow({
  endingLine,
  follow,
  related,
  craving,
}: {
  endingLine: string;
  follow: { card: StoryCardData; loop: boolean; threadTitle: string } | null;
  related: StoryCardData[];
  craving?: { href: string; label: string } | null;
}) {
  return (
    <div className="pt-12 sm:pt-16 mt-12 sm:mt-14 border-t border-white/[0.07] space-y-10">
      <div className="text-center space-y-4">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
          Afterglow
        </p>
        <p className="font-reading italic text-xl sm:text-2xl text-primary max-w-md mx-auto leading-relaxed">
          {endingLine}
        </p>
      </div>

      {follow && (
        <div className="rounded-[24px] border border-primary/25 bg-primary/[0.06] p-5 sm:p-6 space-y-3">
          <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-primary font-semibold">
            {follow.loop ? "That was the last of her tonight" : `Stay inside ${follow.threadTitle}`}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-foreground">{follow.card.title}</h2>
          <p className="font-reading text-muted">{follow.card.hook}</p>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-foreground/70">
            {heatLabel(follow.card.heat)} · {lengthLabel(follow.card.length)} · {follow.card.readTimeMinutes} min
          </p>
          <Button href={`/stories/${follow.card.slug}`}>
            {follow.loop ? "Begin her again" : "Keep going with her"}
          </Button>
        </div>
      )}

      {related.length > 0 && (
        <div className="space-y-5">
          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl text-foreground">The same hunger</h2>
            <p className="font-reading text-sm text-muted">
              Close in heat, mood, or touch. Not the next title in a list.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
        {craving && (
          <Button variant="glass" href={craving.href}>
            Stay in {craving.label}
          </Button>
        )}
        <Button variant="ghost" href="/stories">
          Browse the archive
        </Button>
        <Button variant="ghost" href="/nightstand">
          Your nightstand
        </Button>
      </div>

      <p className="text-center font-sans text-xs text-muted">
        Or{" "}
        <Link href="/" className="text-primary hover:underline touch-manipulation">
          return to tonight
        </Link>
        .
      </p>
    </div>
  );
}
