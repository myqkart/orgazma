"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { SafeImage } from "@/components/ui/ImageFallback";
import type { StoryWithSlug } from "@/types/story";

interface FeaturedCardProps {
  story: StoryWithSlug;
  onOpen?: (slug: string) => void;
}

export function FeaturedCard({ story, onOpen }: FeaturedCardProps) {
  const handleOpen = () => {
    if (onOpen) onOpen(story.slug);
  };

  return (
    <div className="relative group rounded-[20px] bg-[#22334A] border border-[rgba(141,194,208,0.16)] p-6 sm:p-8 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Background candle glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8DC2D0]/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Atmospheric Image with subtle glow */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[16px] overflow-hidden bg-[#172235] shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-[rgba(141,194,208,0.14)]">
            <SafeImage
              src={story.imageUrl}
              alt={story.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover object-center saturate-[0.88] brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#22334A] via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right: Story details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#8DC2D0]/60 inline-block" />
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-[#8DC2D0] font-semibold">
                Tonight&apos;s pick
              </span>
            </div>
            <Pill>{story.readTimeMinutes} min of your own time</Pill>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#E6EEF0] leading-[1.15]">
              {story.title}
            </h2>
            {story.subtitle && (
              <p className="font-display italic text-[#A0B0C0] text-lg sm:text-xl">
                {story.subtitle}
              </p>
            )}
          </div>

          <p className="font-reading text-[#E6EEF0]/90 text-base sm:text-lg leading-relaxed">
            {story.previewText}
          </p>

          <div className="pt-2 space-y-3">
            <div>
              <Button
                variant="primary"
                onClick={handleOpen}
                aria-haspopup="dialog"
                className="w-full sm:w-auto"
              >
                Read it now
              </Button>
            </div>
            <p className="font-display italic text-sm text-[#A0B0C0] pl-1">
              Best read alone, door closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
