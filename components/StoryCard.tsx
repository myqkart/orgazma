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
      className="group relative flex flex-col rounded-[24px] bg-gradient-to-b from-[#1C101A] to-[#291626]/80 border border-white/[0.07] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.45)] transition-all duration-400 ease-out hover:-translate-y-2 hover:border-[#C66B91]/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_30px_rgba(198,107,145,0.2)] text-left cursor-pointer focus-within:ring-2 focus-within:ring-[#C66B91] focus-within:ring-offset-2 focus-within:ring-offset-[#0E080D]"
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
          className="object-cover object-center saturate-[0.88] brightness-[0.92] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {/* Soft deep gradient mask */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1C101A] via-[#1C101A]/30 to-black/20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating frosted badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          {story.isFeatured ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#702442]/80 backdrop-blur-md border border-[#C66B91]/40 text-[#F8EDF2] text-[10px] font-sans font-semibold tracking-wider uppercase">
              <span className="w-1 h-1 rounded-full bg-[#C66B91] animate-pulse" />
              Tonight&apos;s pick
            </span>
          ) : (
            <span />
          )}
          <Pill variant="glass">{story.readTimeMinutes} min</Pill>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between space-y-5">
        <div className="space-y-2.5">
          <h3 className="font-display text-xl sm:text-[23px] font-medium text-[#F8EDF2] leading-snug group-hover:text-[#C66B91] transition-colors duration-200">
            {story.title}
          </h3>
          {story.subtitle && (
            <p className="font-sans text-xs sm:text-[13px] font-medium tracking-wide text-[#BFA5B1]/90 uppercase">
              {story.subtitle}
            </p>
          )}
          <p className="font-reading text-sm sm:text-[15px] text-[#F8EDF2]/80 line-clamp-3 leading-relaxed pt-1">
            {story.previewText}
          </p>
        </div>

        {/* Modern interactive link footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[#C66B91] font-sans text-xs sm:text-[13px] font-medium tracking-wide">
          <span className="group-hover:text-[#F8EDF2] transition-colors">Keep reading</span>
          <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#C66B91] group-hover:bg-[#702442] group-hover:text-[#F8EDF2] group-hover:border-[#C66B91]/40 group-hover:scale-110 transition-all duration-300">
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
