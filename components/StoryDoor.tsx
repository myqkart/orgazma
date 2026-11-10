import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { heatLabel, lengthLabel, type StoryCardData } from "@/lib/taxonomy";

export function StoryDoor({
  story,
  kicker,
  flip = false,
}: {
  story: StoryCardData;
  kicker?: string;
  flip?: boolean;
}) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
      <Link
        href={`/stories/${story.slug}`}
        className={`relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[24px] sm:rounded-[36px] border border-white/[0.08] bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:col-span-6 focus-visible:outline-none ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <SafeImage
          src={story.imageUrl}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-center saturate-[0.9] brightness-[0.82] transition-transform duration-700 hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/15" />
      </Link>

      <div className={`lg:col-span-6 space-y-4 ${flip ? "lg:order-1" : ""}`}>
        {kicker && (
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
            {kicker}
          </p>
        )}
        <div className="space-y-2">
          <h3 className="font-display text-[1.7rem] sm:text-4xl font-semibold text-foreground leading-[1.12] text-balance">
            <Link href={`/stories/${story.slug}`} className="hover:text-primary transition-colors">
              {story.title}
            </Link>
          </h3>
          {story.subtitle && (
            <p className="font-sans text-[11px] sm:text-sm uppercase tracking-[0.12em] text-accent">
              {story.subtitle}
            </p>
          )}
        </div>
        <p className="font-display italic text-xl sm:text-2xl text-foreground/90 leading-snug text-balance">
          {story.hook}
        </p>
        {story.desire && (
          <p className="font-reading text-[15px] sm:text-lg text-muted leading-relaxed">
            {story.desire}
          </p>
        )}
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-foreground/70">
          {heatLabel(story.heat)} · {lengthLabel(story.length)} · {story.readTimeMinutes} min
        </p>
        <Link
          href={`/stories/${story.slug}`}
          className="inline-flex min-h-11 items-center font-sans text-sm font-semibold text-accent hover:text-primary touch-manipulation"
        >
          Step inside →
        </Link>
      </div>
    </article>
  );
}
