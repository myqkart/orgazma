import React from "react";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/ImageFallback";
import {
  FlourishOrnament,
  RoseOrnament,
  SparkleOrnament,
} from "@/components/decor/Ornaments";
import { getTonight } from "@/lib/catalog";
import { ATMOS, SITE } from "@/lib/site";

export function Hero() {
  const tonight = getTonight();

  return (
    <section className="relative min-h-[100svh] min-h-[100dvh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage
          src={ATMOS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] sm:object-[center_35%] saturate-[1.05] brightness-[0.62] sm:brightness-[0.64] animate-hero-zoom"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/25 sm:via-background/50 sm:to-background/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent sm:from-background/75 sm:via-transparent sm:to-background/35"
          aria-hidden="true"
        />
      </div>

      <RoseOrnament className="hidden sm:block absolute top-[28%] right-[10%] w-20 h-20 text-primary/30 animate-float-soft z-10 pointer-events-none" />
      <SparkleOrnament className="hidden sm:block absolute top-[36%] left-[14%] w-4 h-4 text-primary/60 animate-sparkle z-10 pointer-events-none" />
      <SparkleOrnament className="absolute bottom-[34%] right-[8%] sm:bottom-[30%] sm:right-[22%] w-3 h-3 text-accent/70 animate-sparkle-delayed z-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-4 sm:px-6 md:px-8 pb-[max(4rem,env(safe-area-inset-bottom))] sm:pb-20 pt-28 sm:pt-32">
        <FlourishOrnament className="w-28 sm:w-36 h-7 sm:h-8 text-primary/55 mb-3 sm:mb-4 animate-fade-rise" />
        <p className="font-display text-[2.75rem] leading-[0.92] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-tight text-foreground animate-fade-rise break-words">
          {SITE.name}
        </p>

        <h1 className="mt-4 sm:mt-6 max-w-2xl font-display text-[1.35rem] sm:text-3xl md:text-4xl font-medium text-foreground/95 leading-snug animate-fade-rise-delay text-balance">
          Come in. Leave the light off.
        </h1>

        <p className="mt-3 sm:mt-4 max-w-xl font-reading text-[15px] sm:text-lg text-muted leading-relaxed animate-fade-rise-delay">
          Explicit stories for a locked room, sorted by hunger, heat, and how long you want to stay. Not a feed. A night.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-rise-delay-2 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            href={tonight ? `/stories/${tonight.slug}` : "/stories"}
            className="w-full sm:w-auto"
          >
            Open tonight&apos;s story
          </Button>
          <Button variant="glass" size="lg" href="/cravings" className="w-full sm:w-auto">
            Name what you want
          </Button>
        </div>
      </div>
    </section>
  );
}
