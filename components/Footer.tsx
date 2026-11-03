import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer({ year = 2026 }: { year?: number }) {
  return (
    <footer className="bg-[#172235] border-t border-[rgba(141,194,208,0.14)] text-center text-[#A0B0C0] relative z-10">
      <Container clean className="py-14 sm:py-20 flex flex-col items-center space-y-6">
        {/* Wordmark */}
        <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#E6EEF0]">
          Velvet Hours
        </span>

        {/* Tagline */}
        <p className="font-display italic text-base sm:text-lg text-[#E6EEF0]/90 max-w-md">
          Written for grown women who like their fiction unhurried.
        </p>

        {/* Adult content disclaimer note */}
        <p className="font-sans text-xs sm:text-sm text-[#A0B0C0]/70 max-w-lg leading-relaxed">
          Adult content. All characters are 18 or older. Not for minors.
        </p>

        {/* Copyright & Back to top */}
        <div className="pt-6 border-t border-[rgba(141,194,208,0.1)] w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <span>&copy; {year} Velvet Hours</span>
          <a
            href="#"
            className="text-[#8DC2D0] hover:underline focus-visible:outline-2 focus-visible:outline-[#8DC2D0] cursor-pointer"
          >
            Back to top &uarr;
          </a>
        </div>
      </Container>
    </footer>
  );
}
