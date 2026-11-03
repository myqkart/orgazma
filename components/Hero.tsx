import React from "react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  hasFeatured?: boolean;
}

export function Hero({ hasFeatured = true }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Candlelight glow pulse */}
      <div
        className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full candlelight-glow-pulse pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8 pt-16 pb-24">
        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-normal text-[#F8EDF2] leading-[1.18] drop-shadow-sm max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700">
          Read what you&apos;d never say out loud.
        </h1>

        {/* Tagline */}
        <p className="font-reading text-lg sm:text-xl text-[#BFA5B1] max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Slow burns, hungry mornings and the kind of heat that follows you into the day.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
          <Button
            variant="primary"
            href={hasFeatured ? "#pick" : "#collection"}
            className="w-full sm:w-auto"
          >
            Start with tonight&apos;s pick
          </Button>
          <Button
            variant="ghost"
            href="#collection"
            className="w-full sm:w-auto"
          >
            Browse every story
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#BFA5B1]/70 hover:text-[#C66B91] transition-colors duration-200">
        <a
          href={hasFeatured ? "#pick" : "#collection"}
          className="group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C66B91] rounded-sm py-1"
          aria-label="Scroll lower into stories"
        >
          <span className="font-reading italic text-sm tracking-wide">
            Go on. Lower.
          </span>
          <svg
            className="w-4 h-4 text-[#C66B91] animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
