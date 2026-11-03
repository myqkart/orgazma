import React from "react";
import Link from "next/link";
import { Pill } from "@/components/ui/Pill";
import { SafeImage } from "@/components/ui/ImageFallback";
import { SparkleOrnament } from "@/components/decor/Ornaments";
import type { StoryWithSlug } from "@/types/story";

interface StoryCardProps {
  story: StoryWithSlug;
  priority?: boolean;
}

export function StoryCard({ story, priority = false }: StoryCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden text-left rounded-[24px] sm:rounded-[32px] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 active:scale-[0.99] sm:hover:-translate-y-1.5 sm:hover:border-accent/35 sm:hover:shadow-[0_28px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(201,30,74,0.18)]">
      <Link
        href={`/stories/${story.slug}`}
        className="absolute inset-0 z-10 rounded-[24px] sm:rounded-[32px] touch-manipulation"
        aria-label={`Open ${story.title} — sink into it`}
      />

      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-surface">
        <SafeImage
          src={story.imageUrl}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover object-center saturate-[0.92] brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <SparkleOrnament className="absolute top-4 right-4 sm:top-5 sm:right-5 w-3.5 h-3.5 text-accent/70 opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle z-20 pointer-events-none" />

        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-20 pointer-events-none gap-2">
          {story.isFeatured ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md border border-primary/50 text-[#1a1408] text-[10px] font-sans font-semibold tracking-wider uppercase">
              Hottest tonight
            </span>
          ) : (
            <span />
          )}
          <Pill variant="glass">{story.readTimeMinutes} min</Pill>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 pointer-events-none">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
            {story.title}
          </h3>
          {story.subtitle && (
            <p className="mt-1 sm:mt-1.5 font-sans text-[11px] sm:text-[12px] font-medium tracking-wide text-accent/90 uppercase line-clamp-1">
              {story.subtitle}
            </p>
          )}
          <p className="mt-2 sm:mt-3 font-reading text-sm text-foreground/80 line-clamp-2 leading-relaxed">
            {story.previewText}
          </p>
          <p className="mt-3 sm:mt-4 font-sans text-xs font-semibold tracking-wide text-accent flex items-center gap-2">
            Sink into it
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
