import React from "react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  hasFeatured?: boolean;
}

export function Hero({ hasFeatured = true }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Layered atmospheric lighting */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#702442]/20 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[#C66B91]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full candlelight-glow-pulse pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8 pt-20 pb-28 relative z-10">
        {/* Modern luxury badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] animate-in fade-in duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91] animate-pulse" />
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#C66B91] font-semibold">
            Private Fiction For Women
          </span>
        </div>

        {/* Headline with subtle editorial accent */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F8EDF2] leading-[1.12] drop-shadow-sm max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700">
          Read what you&apos;d never say{" "}
          <span className="italic font-normal bg-gradient-to-r from-[#F8EDF2] to-[#C66B91] bg-clip-text text-transparent">
            out loud.
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-reading text-lg sm:text-2xl text-[#BFA5B1] max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Slow burns, hungry mornings and the kind of heat that follows you into the day.
        </p>

        {/* Modern CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 pt-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
          <Button
            variant="primary"
            size="lg"
            href={hasFeatured ? "#pick" : "#collection"}
            className="w-full sm:w-auto shadow-[0_15px_35px_rgba(112,36,66,0.4)]"
          >
            <span>Start with tonight&apos;s pick</span>
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Button>
          <Button
            variant="glass"
            size="lg"
            href="#collection"
            className="w-full sm:w-auto"
          >
            Browse every story
          </Button>
        </div>
      </div>

      {/* Modern Minimalist Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#BFA5B1]/70 hover:text-[#C66B91] transition-colors duration-200 z-10">
        <a
          href={hasFeatured ? "#pick" : "#collection"}
          className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C66B91] rounded-sm py-1"
          aria-label="Scroll lower into stories"
        >
          <span className="font-reading italic text-xs tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            Go on. Lower.
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 group-hover:border-[#C66B91]/50 transition-colors">
            <div className="w-1 h-2 rounded-full bg-[#C66B91] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
