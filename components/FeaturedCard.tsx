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
    <div className="relative group rounded-[28px] bg-gradient-to-br from-[#1C101A] to-[#291626] border border-white/[0.08] hover:border-[#C66B91]/35 p-6 sm:p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500">
      {/* Background radial highlight */}
      <div
        className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-[#C66B91]/10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#702442]/20 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Left: Atmospheric Image with cinematic vignette */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-[22px] overflow-hidden bg-[#1C101A] shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/[0.08]">
            <SafeImage
              src={story.imageUrl}
              alt={story.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-cover object-center saturate-[0.88] brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Cinematic Gradient Vignette */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1C101A] via-transparent to-black/20 pointer-events-none"
              aria-hidden="true"
            />
            {/* Floating read time badge */}
            <div className="absolute top-4 right-4 z-20">
              <Pill variant="glass">{story.readTimeMinutes} min of your own time</Pill>
            </div>
          </div>
        </div>

        {/* Right: Story details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#702442]/40 border border-[#C66B91]/30 text-[#C66B91] text-[11px] font-sans font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91] animate-pulse" />
              Tonight&apos;s pick
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#F8EDF2] leading-[1.18] group-hover:text-[#F8EDF2] transition-colors">
              {story.title}
            </h2>
            {story.subtitle && (
              <p className="font-sans text-xs sm:text-sm font-medium uppercase tracking-[0.12em] text-[#C66B91]">
                {story.subtitle}
              </p>
            )}
          </div>

          <p className="font-reading text-[#F8EDF2]/90 text-base sm:text-lg leading-relaxed line-clamp-4">
            {story.previewText}
          </p>

          <div className="pt-3 space-y-3">
            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleOpen}
                aria-haspopup="dialog"
                className="w-full sm:w-auto shadow-[0_15px_30px_rgba(112,36,66,0.35)]"
              >
                <span>Read it now</span>
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Button>
            </div>
            <p className="font-reading italic text-sm text-[#BFA5B1]/80 pl-1">
              Best read alone, door closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
