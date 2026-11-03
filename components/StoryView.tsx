"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Button } from "@/components/ui/Button";
import { NightSky } from "@/components/NightSky";
import { FlourishOrnament } from "@/components/decor/Ornaments";
import { ENDING_LINES } from "@/lib/site";
import type { StoryWithSlug } from "@/types/story";

interface StoryViewProps {
  story: StoryWithSlug;
  nextSlug?: string;
}

function FontControls({
  fontSizeIndex,
  onChange,
  compact = false,
}: {
  fontSizeIndex: number;
  onChange: (delta: number) => void;
  compact?: boolean;
}) {
  const btn = compact ? "w-8 h-8" : "w-10 h-10";
  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 p-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      role="group"
      aria-label="Font size"
    >
      <button
        type="button"
        onClick={() => onChange(-1)}
        disabled={fontSizeIndex <= 0}
        aria-label="Smaller text"
        className={`${btn} flex items-center justify-center text-xs font-serif text-foreground hover:text-primary disabled:opacity-30 rounded-full cursor-pointer touch-manipulation`}
      >
        A−
      </button>
      <div className="w-px h-3.5 bg-white/15" />
      <button
        type="button"
        onClick={() => onChange(1)}
        disabled={fontSizeIndex >= 2}
        aria-label="Larger text"
        className={`${btn} flex items-center justify-center text-sm font-serif font-semibold text-foreground hover:text-primary disabled:opacity-30 rounded-full cursor-pointer touch-manipulation`}
      >
        A+
      </button>
    </div>
  );
}

export function StoryView({ story, nextSlug }: StoryViewProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  const [fontSizeIndex, setFontSizeIndex] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    try {
      const saved = localStorage.getItem("fontSize");
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if ([0, 1, 2].includes(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return 1;
  });

  const savedPosition = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const pos = localStorage.getItem(`pos:${story.slug}`);
      if (pos) {
        const parsed = parseFloat(pos);
        if (parsed > 120) return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  }, [story.slug]);

  const [showResumeToast, setShowResumeToast] = useState(
    () => savedPosition !== null
  );

  const endingLine = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < story.slug.length; i++) {
      hash = (hash << 5) - hash + story.slug.charCodeAt(i);
      hash |= 0;
    }
    return ENDING_LINES[Math.abs(hash) % ENDING_LINES.length];
  }, [story.slug]);

  const changeFontSize = useCallback((delta: number) => {
    setFontSizeIndex((curr) => {
      const next = Math.max(0, Math.min(2, curr + delta));
      try {
        localStorage.setItem("fontSize", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.title = `${story.title} · Orgazma`;
  }, [story.title]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setScrollProgress(0);
      } else {
        const current = (window.scrollY / total) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }

      const heroBottom = heroRef.current?.offsetHeight ?? 280;
      setPastHero(window.scrollY > heroBottom - 80);

      try {
        const pct =
          total <= 0 ? 0 : (window.scrollY / total) * 100;
        if (window.scrollY > 80 && pct < 95) {
          localStorage.setItem(
            `pos:${story.slug}`,
            String(Math.round(window.scrollY))
          );
        } else if (pct >= 95) {
          localStorage.removeItem(`pos:${story.slug}`);
        }
      } catch {
        // ignore
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [story.slug]);

  const fontSizeClasses = useMemo(() => {
    switch (fontSizeIndex) {
      case 0:
        return "text-[16px] sm:text-[17px] leading-[1.85]";
      case 2:
        return "text-[20px] sm:text-[22px] leading-[1.95]";
      case 1:
      default:
        return "text-[17.5px] sm:text-[19px] leading-[1.9]";
    }
  }, [fontSizeIndex]);

  return (
    <div className="relative reading-chamber min-h-[70svh] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <NightSky dense fireflies className="fixed inset-0 z-0" />

      {/* Compact sticky bar — only after leaving the cinematic cover */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          pastHero
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="pt-[max(0.4rem,env(safe-area-inset-top))] px-3 sm:px-4">
          <div className="max-w-[1080px] mx-auto rounded-full bg-surface/85 backdrop-blur-2xl border border-white/[0.1] shadow-[0_14px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 min-h-11 py-1.5">
              <Link
                href="/stories"
                className="font-sans text-[11px] uppercase tracking-[0.12em] text-muted hover:text-primary transition-colors touch-manipulation py-2 shrink-0"
              >
                ← Heat
              </Link>
              <span className="font-display text-sm text-foreground truncate font-medium min-w-0 text-center flex-1 px-2">
                {story.title}
              </span>
              <FontControls
                fontSizeIndex={fontSizeIndex}
                onChange={changeFontSize}
                compact
              />
            </div>
            <div className="h-[2px] bg-white/[0.04]" aria-hidden="true">
              <div
                className="h-full reading-progress transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {showResumeToast && (
        <div
          className="fixed top-[calc(5rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-50 w-[min(92%,24rem)] rounded-2xl bg-surface/95 backdrop-blur-2xl border border-primary/35 p-3.5 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          role="status"
        >
          <span className="font-sans text-sm text-foreground text-center sm:text-left">
            Slip back into where you left off?
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (savedPosition) {
                  window.scrollTo({ top: savedPosition, behavior: "smooth" });
                }
                setShowResumeToast(false);
              }}
              className="min-h-10 px-4 rounded-full bg-primary text-[#1a1408] text-xs font-semibold cursor-pointer touch-manipulation"
            >
              Continue wet
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem(`pos:${story.slug}`);
                } catch {
                  // ignore
                }
                setShowResumeToast(false);
              }}
              className="min-h-10 px-3 rounded-full text-xs text-muted hover:text-foreground cursor-pointer touch-manipulation"
            >
              From the start
            </button>
          </div>
        </div>
      )}

      {/* Cinematic full-bleed cover */}
      <header
        ref={heroRef}
        className="relative z-10 min-h-[72svh] sm:min-h-[78svh] flex flex-col"
      >
        <div className="absolute inset-0">
          <SafeImage
            src={story.imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center saturate-[0.88] brightness-[0.62]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/30" />
          <div className="starfield opacity-40" />
        </div>

        {/* Floating controls over cover */}
        <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 md:px-10 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/15 font-sans text-[11px] uppercase tracking-[0.14em] text-foreground hover:text-primary hover:border-primary/40 transition-all touch-manipulation shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            ← Back to heat
          </Link>
          <FontControls fontSizeIndex={fontSizeIndex} onChange={changeFontSize} />
        </div>

        {/* Title block on the cover */}
        <div className="relative z-20 mt-auto px-5 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-14 max-w-[1080px] mx-auto w-full space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-primary/30 text-primary text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(230,179,90,0.9)]" />
            {story.readTimeMinutes} min · private reading
          </div>

          <h1 className="font-display text-[2.35rem] sm:text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] tracking-tight text-balance drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
            {story.title}
          </h1>

          {story.subtitle && (
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.18em] text-primary/95 font-medium">
              {story.subtitle}
            </p>
          )}

          <FlourishOrnament className="w-32 sm:w-40 h-7 text-primary/50" />
        </div>
      </header>

      {/* Breathing room between cover and story */}
      <div className="relative z-10 h-8 sm:h-12 md:h-16" aria-hidden="true" />

      {/* Prose chamber */}
      <article className="relative z-10 max-w-[1080px] mx-auto px-5 sm:px-8 lg:px-10 pb-8">
        <div className="relative rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-surface/55 backdrop-blur-xl px-5 sm:px-12 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-primary/45" aria-hidden="true" />

          <div className="reading-prose max-w-[78ch] mx-auto space-y-6 sm:space-y-7 mt-4 sm:mt-6">
            {story.content.map((paragraph, index) => {
              if (paragraph.trim() === "***") {
                return (
                  <div
                    key={`break-${index}`}
                    className="flex justify-center items-center gap-3 py-6 sm:py-8 text-primary"
                    aria-hidden="true"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 shadow-[0_0_8px_rgba(230,179,90,0.8)]" />
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_rgba(230,179,90,0.9)]" />
                    <span className="w-1 h-1 rounded-full bg-primary/50 shadow-[0_0_8px_rgba(230,179,90,0.8)]" />
                  </div>
                );
              }

              const isFirst = index === 0;

              return (
                <p
                  key={`p-${index}`}
                  className={`font-reading text-foreground/92 ${fontSizeClasses} ${
                    isFirst
                      ? "first-letter:float-left first-letter:text-4xl sm:first-letter:text-5xl first-letter:pr-3 first-letter:font-display first-letter:font-semibold first-letter:text-primary first-letter:leading-none"
                      : ""
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="pt-12 sm:pt-16 text-center space-y-6 border-t border-white/[0.07] mt-12 sm:mt-14">
            <FlourishOrnament className="mx-auto w-36 h-7 text-primary/40" />
            <p className="font-reading italic text-xl sm:text-2xl text-primary max-w-md mx-auto leading-relaxed">
              {endingLine}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              {nextSlug ? (
                <Button variant="primary" href={`/stories/${nextSlug}`} className="w-full sm:w-auto">
                  Another filthy one
                </Button>
              ) : (
                <Button variant="primary" href="/stories" className="w-full sm:w-auto">
                  Back to the heat
                </Button>
              )}
              <Button variant="glass" href="/stories" className="w-full sm:w-auto">
                Browse every craving
              </Button>
            </div>
            <p className="font-sans text-xs text-muted">
              Or{" "}
              <Link href="/" className="text-primary hover:underline touch-manipulation">
                return to tonight
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
