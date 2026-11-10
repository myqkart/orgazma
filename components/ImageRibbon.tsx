import React from "react";
import { SafeImage } from "@/components/ui/ImageFallback";
import { ATMOS } from "@/lib/site";

export function ImageRibbon() {
  const frames = [...ATMOS.strip, ...ATMOS.strip];

  return (
    <div className="relative py-8 sm:py-10 overflow-hidden" aria-hidden="true">
      <div className="flex gap-2.5 sm:gap-4 w-max animate-ribbon">
        {frames.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`relative h-40 sm:h-64 md:h-80 w-[46vw] sm:w-[32vw] md:w-[280px] max-w-[280px] sm:max-w-none overflow-hidden rounded-[18px] sm:rounded-[28px] border border-white/[0.1] shrink-0 ${
              i % 2 === 0 ? "translate-y-2 sm:translate-y-3" : "-translate-y-2 sm:-translate-y-3"
            }`}
          >
            <SafeImage
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 46vw, 280px"
              className="object-cover object-center saturate-[1.05] brightness-[0.92]"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-10 sm:w-28 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-28 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}
