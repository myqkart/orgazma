"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Button } from "@/components/ui/Button";
import {
  FlourishOrnament,
  HeartOrnament,
  RoseOrnament,
  SparkleOrnament,
  VineCorner,
} from "@/components/decor/Ornaments";
import { ATMOS, SITE } from "@/lib/site";

export function Footer({ year = 2026 }: { year?: number }) {
  const pathname = usePathname();
  const isReading = pathname?.startsWith("/stories/") && pathname !== "/stories";
  if (isReading) return null;

  return (
    <footer className="relative z-10 mt-6 sm:mt-8 overflow-hidden text-muted pb-[env(safe-area-inset-bottom)]">
      <div className="relative mx-3 sm:mx-5 md:mx-8 mb-3 sm:mb-6 rounded-[24px] sm:rounded-[40px] overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="absolute inset-0">
          <SafeImage
            src={ATMOS.footer}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center saturate-[0.85] brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/45" />
          <div className="absolute inset-0 bg-[rgba(230,179,90,0.06)]" />
          <div className="starfield opacity-40" />
        </div>

        <VineCorner className="hidden sm:block absolute top-4 left-4 w-28 h-28 text-primary/25 animate-float-soft" />
        <VineCorner flip className="hidden sm:block absolute top-4 right-4 w-28 h-28 text-primary/25 animate-float-soft-delayed" />
        <RoseOrnament className="hidden md:block absolute bottom-10 right-[12%] w-16 h-16 text-primary/20 animate-float-soft" />
        <SparkleOrnament className="absolute top-10 right-8 sm:top-16 sm:left-1/3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/55 animate-sparkle" />
        <SparkleOrnament className="hidden sm:block absolute bottom-24 left-[20%] w-3 h-3 text-accent/50 animate-sparkle-delayed" />

        <Container clean className="relative z-10 py-12 sm:py-16 md:py-20 flex flex-col items-center gap-5 sm:gap-7 text-center">
          <div className="flex items-center gap-2 sm:gap-3 text-primary/70">
            <HeartOrnament className="w-4 h-4 sm:w-5 sm:h-5 animate-sparkle" />
            <FlourishOrnament className="w-24 sm:w-36 h-6 sm:h-7" />
            <HeartOrnament className="w-4 h-4 sm:w-5 sm:h-5 animate-sparkle-delayed" />
          </div>

          <div className="space-y-2 sm:space-y-3 px-1">
            <p className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
              {SITE.name}
            </p>
            <p className="font-reading text-[15px] sm:text-lg text-foreground/90 max-w-md mx-auto leading-relaxed">
              Come back when the night gets lonely. We keep the sheets warm.
            </p>
          </div>

          <Button variant="primary" size="lg" href="/cravings" className="w-full max-w-xs sm:w-auto">
            Choose another hunger
          </Button>

          <nav className="flex flex-wrap items-center justify-center gap-2 font-sans text-sm w-full px-1">
            {[
              { href: "/", label: "Tonight" },
              { href: "/cravings", label: "Cravings" },
              { href: "/stories", label: "Archive" },
              { href: "/nightstand", label: "Nightstand" },
              { href: "/about", label: "After Dark" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-10 inline-flex items-center px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-foreground/85 hover:text-accent hover:border-accent/40 transition-all touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="inline-flex items-start sm:items-center gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-black/30 border border-white/[0.08] text-xs font-sans text-muted max-w-lg backdrop-blur-md text-left sm:text-center leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 sm:mt-0 shrink-0" />
            {SITE.ageNote}
          </p>

          <div className="pt-1 text-xs font-sans text-muted/80">
            &copy; {year} {SITE.name} · Made for locked doors
          </div>
        </Container>
      </div>
    </footer>
  );
}
