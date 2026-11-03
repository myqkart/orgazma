import React from "react";
import { SafeImage } from "@/components/ui/ImageFallback";
import { ATMOS } from "@/lib/site";

export function ImageRibbon() {
  const frames = [...ATMOS.strip, ...ATMOS.strip];

  return (
    <div className="relative py-3 sm:py-4 overflow-hidden" aria-hidden="true">
      <div className="flex gap-2.5 sm:gap-4 w-max animate-ribbon">
        {frames.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`relative h-28 sm:h-48 md:h-56 w-[38vw] sm:w-[28vw] md:w-[220px] max-w-[200px] sm:max-w-none overflow-hidden rounded-[18px] sm:rounded-[28px] border border-white/[0.08] shrink-0 ${
              i % 2 === 0 ? "translate-y-1.5 sm:translate-y-2" : "-translate-y-1.5 sm:-translate-y-2"
            }`}
          >
            <SafeImage
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 38vw, 220px"
              className="object-cover object-center saturate-[0.85] brightness-[0.7]"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-10 sm:w-28 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-28 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
