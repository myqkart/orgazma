"use client";

import React from "react";
import { Pill } from "@/components/ui/Pill";
import { SafeImage } from "@/components/ui/ImageFallback";
import type { StoryWithSlug } from "@/types/story";

interface StoryCardProps {
  story: StoryWithSlug;
  onOpen?: (slug: string) => void;
  priority?: boolean;
}

export function StoryCard({ story, onOpen, priority = false }: StoryCardProps) {
  const handleClick = () => {
    if (onOpen) {
      onOpen(story.slug);
    }
  };

  return (
    <article
      className="group relative flex flex-col rounded-[20px] bg-[#291626] border border-[rgba(198,107,145,0.14)] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(198,107,145,0.25)] text-left cursor-pointer focus-within:ring-2 focus-within:ring-[#C66B91] focus-within:ring-offset-2 focus-within:ring-offset-[#0E080D]"
      onClick={handleClick}
      title="Open it slowly."
    >
      <button
        type="button"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`Read story: ${story.title}. Open it slowly.`}
        className="absolute inset-0 w-full h-full z-10 opacity-0 cursor-pointer"
      >
        Read story: {story.title}
      </button>

      {/* 3:4 Aspect Ratio Image Header */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1C101A]">
        <SafeImage
          src={story.imageUrl}
          alt={story.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="object-cover object-center saturate-[0.88] brightness-[0.92] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {/* Deep wine gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#291626] via-[#291626]/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Read time pill & featured tag top */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          {story.isFeatured ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1C101A]/90 border border-[#C66B91]/40 text-[#C66B91] text-[11px] font-sans font-medium tracking-wide">
              Tonight&apos;s pick
            </span>
          ) : (
            <span />
          )}
          <Pill>{story.readTimeMinutes} min</Pill>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div className="space-y-2.5">
          <h3 className="font-display text-xl sm:text-[23px] font-medium text-[#F8EDF2] leading-snug group-hover:text-[#C66B91] transition-colors duration-200">
            {story.title}
          </h3>
          {story.subtitle && (
            <p className="font-sans text-xs sm:text-[13px] font-medium tracking-wide text-[#BFA5B1]/90">
              {story.subtitle}
            </p>
          )}
          <p className="font-reading text-sm sm:text-[15px] text-[#F8EDF2]/80 line-clamp-3 leading-relaxed pt-1">
            {story.previewText}
          </p>
        </div>

        {/* Link / CTA footer */}
        <div className="pt-6 flex items-center text-[#C66B91] font-sans text-sm font-medium tracking-wide">
          <span>Keep reading</span>
          <span
            className="ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}
