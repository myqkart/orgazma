import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/ImageFallback";
import { FlourishOrnament, SparkleOrnament } from "@/components/decor/Ornaments";
import { ATMOS } from "@/lib/site";

export function MoodStrip() {
  return (
    <section className="relative">
      <Container clean className="py-12 sm:py-16 md:py-20">
        <div className="mb-7 sm:mb-10 max-w-xl space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              How wet are you tonight?
            </p>
            <SparkleOrnament className="w-3.5 h-3.5 text-accent/60 animate-sparkle" />
          </div>
          <h2 className="font-display text-[1.75rem] sm:text-4xl font-semibold text-foreground tracking-tight text-balance">
            Choose the sin that fits.
          </h2>
          <FlourishOrnament className="w-28 sm:w-32 h-6 sm:h-7 text-accent/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {ATMOS.moods.map((mood) => (
            <Link
              key={mood.label}
              href={mood.href}
              className="group relative block aspect-[5/4] sm:aspect-[4/5] overflow-hidden rounded-[22px] sm:rounded-[32px] border border-white/[0.08] focus-visible:outline-none shadow-[0_14px_36px_rgba(0,0,0,0.35)] transition-transform duration-500 active:scale-[0.99] sm:hover:-translate-y-1 touch-manipulation"
            >
              <SafeImage
                src={mood.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover object-center saturate-[1.05] brightness-[0.82] transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {mood.label}
                </h3>
                <p className="font-reading text-sm text-foreground/80 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {mood.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
