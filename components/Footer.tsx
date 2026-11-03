import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer({ year = 2026 }: { year?: number }) {
  return (
    <footer className="bg-[#1C101A] border-t border-[rgba(198,107,145,0.14)] text-center text-[#BFA5B1] relative z-10">
      <Container clean className="py-14 sm:py-20 flex flex-col items-center space-y-6">
        {/* Wordmark */}
        <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#F8EDF2]">
          Velvet Hours
        </span>

        {/* Tagline */}
        <p className="font-display italic text-base sm:text-lg text-[#F8EDF2]/90 max-w-md">
          Written for grown women who like their fiction unhurried.
        </p>

        {/* Adult content disclaimer note */}
        <p className="font-sans text-xs sm:text-sm text-[#BFA5B1]/70 max-w-lg leading-relaxed">
          Adult content. All characters are 18 or older. Not for minors.
        </p>

        {/* Copyright & Back to top */}
        <div className="pt-6 border-t border-[rgba(198,107,145,0.1)] w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <span>&copy; {year} Velvet Hours</span>
          <a
            href="#"
            className="text-[#C66B91] hover:underline focus-visible:outline-2 focus-visible:outline-[#C66B91] cursor-pointer"
          >
            Back to top &uarr;
          </a>
        </div>
      </Container>
    </footer>
  );
}
