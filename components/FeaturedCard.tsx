import React from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SafeImage } from "@/components/ui/ImageFallback";
import { FlourishOrnament, RoseOrnament } from "@/components/decor/Ornaments";
import { heatLabel, lengthLabel, type StoryCardData } from "@/lib/taxonomy";

interface FeaturedCardProps {
  story: StoryCardData;
}

export function FeaturedCard({ story }: FeaturedCardProps) {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-6 relative">
        <RoseOrnament className="hidden sm:block absolute -top-6 -left-4 w-16 h-16 text-accent/30 animate-float-soft z-20" />
        <div className="relative aspect-[4/5] max-h-[70vh] sm:max-h-none mx-auto w-full overflow-hidden rounded-[24px] sm:rounded-[40px] bg-surface border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
          <SafeImage
            src={story.imageUrl}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-center saturate-[0.9] brightness-[0.9] transition-transform duration-700 hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/20"
            aria-hidden="true"
          />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <Pill variant="glass">
              <span className="sm:hidden">{story.readTimeMinutes} min</span>
              <span className="hidden sm:inline">{lengthLabel(story.length)} · {story.readTimeMinutes} min</span>
            </Pill>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
        <div className="space-y-2">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Tonight&apos;s door, left open
          </p>
          <FlourishOrnament className="w-24 sm:w-28 h-5 sm:h-6 text-accent/50" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl font-semibold text-foreground leading-[1.12] text-balance">
            {story.title}
          </h2>
          {story.subtitle && (
            <p className="font-sans text-[11px] sm:text-sm font-medium uppercase tracking-[0.12em] text-accent">
              {story.subtitle}
            </p>
          )}
        </div>

        <p className="font-display italic text-xl sm:text-2xl text-foreground/95 leading-snug text-balance">
          {story.hook}
        </p>
        <p className="font-reading text-foreground/80 text-[15px] sm:text-lg leading-relaxed">
          {story.desire}
        </p>
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-accent">
          {heatLabel(story.heat)} · {lengthLabel(story.length)} · {story.readTimeMinutes} min
        </p>

        <div className="pt-1 sm:pt-2 space-y-3">
          <Button
            variant="primary"
            size="lg"
            href={`/stories/${story.slug}`}
            className="w-full sm:w-auto"
          >
            Come inside
          </Button>
          <p className="font-reading italic text-sm text-muted">
            {story.authorNote}
          </p>
        </div>
      </div>
    </div>
  );
}
