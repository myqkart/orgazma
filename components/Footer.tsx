import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer({ year = 2026 }: { year?: number }) {
  return (
    <footer className="bg-[#120B11] border-t border-white/[0.08] text-center text-[#BFA5B1] relative z-10 overflow-hidden">
      {/* Background soft ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#702442]/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <Container clean className="py-16 sm:py-24 flex flex-col items-center space-y-8 relative z-10">
        {/* Brand Crest & Wordmark */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#702442] to-[#C66B91] p-[1px] shadow-[0_0_20px_rgba(198,107,145,0.35)]">
            <div className="w-full h-full rounded-full bg-[#0E080D] flex items-center justify-center">
              <span className="text-[11px] font-display font-bold text-[#C66B91]">V</span>
            </div>
          </div>
          <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#F8EDF2]">
            Velvet Hours
          </span>
        </div>

        {/* Tagline */}
        <p className="font-reading text-base sm:text-lg text-[#F8EDF2]/90 max-w-md leading-relaxed">
          Written for grown women who like their fiction unhurried.
        </p>

        {/* Adult content disclaimer pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-sans text-[#BFA5B1]/80 max-w-lg leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
          <span>Adult content. All characters are 18 or older. Not for minors.</span>
        </div>

        {/* Copyright & Back to top */}
        <div className="pt-8 border-t border-white/[0.08] w-full max-w-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#BFA5B1]/70">
          <span>&copy; {year} Velvet Hours</span>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#C66B91] hover:text-[#F8EDF2] hover:bg-white/[0.08] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C66B91]"
          >
            <span>Back to top</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">&uarr;</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
