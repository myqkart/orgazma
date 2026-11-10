"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { NightSky } from "@/components/NightSky";
import { FlourishOrnament } from "@/components/decor/Ornaments";
import { Logo } from "@/components/Logo";
import { StoryAfterglow } from "@/components/StoryAfterglow";
import { ENDING_LINES } from "@/lib/site";
import { markFinished, toggleDim, toggleSaved, useDim, useSaved } from "@/lib/nightstand";
import {
  cravingById,
  heatLabel,
  kinkLabel,
  lengthBand,
  lengthLabel,
  metaFor,
  type StoryCardData,
} from "@/lib/taxonomy";
import type { StoryWithSlug } from "@/types/story";

interface StoryViewProps {
  story: StoryWithSlug;
  related: StoryCardData[];
  follow: { card: StoryCardData; loop: boolean; threadTitle: string } | null;
}

function phaseFor(progress: number) {
  if (progress < 12) return "Arriving";
  if (progress < 42) return "Warming";
  if (progress < 78) return "Deep";
  if (progress < 95) return "Close";
  return "Afterglow";
}

function MetaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center min-h-9 px-3 rounded-full border border-white/15 bg-white/[0.04] font-sans text-[11px] uppercase tracking-[0.12em] text-foreground/80 hover:text-primary hover:border-primary/40 touch-manipulation"
    >
      {children}
    </Link>
  );
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

export function StoryView({ story, related, follow }: StoryViewProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const saved = useSaved(story.slug);
  const dim = useDim();
  const meta = metaFor(story.slug);
  const phase = phaseFor(scrollProgress);
  const primaryCraving = meta?.moods[0] ? cravingById(meta.moods[0]) : undefined;

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
    const title = `${story.title}: explicit erotic story`;
    const description =
      story.previewText?.slice(0, 155).trim() ||
      `${story.title}: explicit erotic fiction on Orgazma. 18+ only.`;

    document.title = title;

    const ensureMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes("property=")) {
          el.setAttribute("property", selector.split('"')[1]);
        } else {
          el.setAttribute("name", selector.split('"')[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    ensureMeta('meta[name="description"]', "content", description);
    ensureMeta('meta[property="og:title"]', "content", title);
    ensureMeta('meta[property="og:description"]', "content", description);
    ensureMeta('meta[property="og:image"]', "content", story.imageUrl);
    ensureMeta('meta[name="twitter:title"]', "content", title);
    ensureMeta('meta[name="twitter:description"]', "content", description);
    ensureMeta('meta[name="twitter:image"]', "content", story.imageUrl);

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/stories/${story.slug}`;
  }, [story.title, story.previewText, story.imageUrl, story.slug]);

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
          markFinished(story.slug);
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
    <div className={`relative reading-chamber min-h-[70svh] pb-[max(2.5rem,env(safe-area-inset-bottom))] ${dim ? "reading-dim" : ""}`}>
      <NightSky dense fireflies className="fixed inset-0 z-0" />

      {/* Compact sticky bar, shown after leaving the cinematic cover */}
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
                ← Archive
              </Link>
              <span className="min-w-0 flex-1 px-2 text-center">
                <span className="block font-display text-sm text-foreground truncate font-medium">
                  {story.title}
                </span>
                <span className="block font-sans text-[10px] uppercase tracking-[0.16em] text-primary">
                  {phase}
                </span>
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleSaved(story.slug)}
                  aria-pressed={saved}
                  aria-label={saved ? "Remove from nightstand" : "Keep on your nightstand"}
                  className={`h-8 px-2.5 rounded-full text-[10px] uppercase tracking-[0.12em] font-sans border cursor-pointer touch-manipulation ${
                    saved
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "text-foreground/80 border-white/15"
                  }`}
                >
                  {saved ? "Kept" : "Keep"}
                </button>
                <FontControls
                  fontSizeIndex={fontSizeIndex}
                  onChange={changeFontSize}
                  compact
                />
              </div>
            </div>
            <div
              className="h-[2px] bg-white/[0.04]"
              role="progressbar"
              aria-valuenow={Math.round(scrollProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Reading, ${phase}`}
            >
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
            You were in the middle of this.
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
              Take me back
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
        <div className="relative z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6 md:px-10 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link
            href="/stories"
            className="justify-self-start inline-flex items-center gap-2 min-h-11 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/15 font-sans text-[11px] uppercase tracking-[0.14em] text-foreground hover:text-primary hover:border-primary/40 transition-all touch-manipulation shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            ← Archive
          </Link>
          <Link
            href="/"
            aria-label="Orgazma"
            className="justify-self-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Logo className="h-9 w-9 sm:h-10 sm:w-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]" />
          </Link>
          <div className="justify-self-end flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleDim()}
              aria-pressed={dim}
              className="min-h-11 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/15 font-sans text-[11px] uppercase tracking-[0.14em] text-foreground hover:text-primary cursor-pointer touch-manipulation"
            >
              <span className="sm:hidden">{dim ? "Bright" : "Dim"}</span>
              <span className="hidden sm:inline">{dim ? "Lights up" : "Dim the room"}</span>
            </button>
            <FontControls fontSizeIndex={fontSizeIndex} onChange={changeFontSize} />
          </div>
        </div>

        {/* Title block on the cover */}
        <div className="relative z-20 mt-auto px-5 sm:px-8 md:px-12 lg:px-16 pb-10 sm:pb-14 max-w-[1080px] mx-auto w-full space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-primary/30 text-primary text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(230,179,90,0.9)]" />
            {meta ? `${heatLabel(meta.heat)} · ` : ""}
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
        <div className="reading-sheet relative rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-surface/55 backdrop-blur-xl px-5 sm:px-12 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-primary/45" aria-hidden="true" />

          {meta && (
            <div className="max-w-[64ch] mx-auto mt-4 sm:mt-6 space-y-5 pb-8 mb-8 border-b border-white/[0.07]">
              <p className="font-display italic text-2xl sm:text-3xl text-foreground leading-snug text-balance">
                {meta.hook}
              </p>
              <p className="font-reading text-[15px] sm:text-lg text-foreground/80 leading-relaxed">
                {meta.desire}
              </p>
              <div className="flex flex-wrap gap-2">
                <MetaLink href={`/stories?heat=${meta.heat}`}>{heatLabel(meta.heat)}</MetaLink>
                <MetaLink href={`/stories?length=${lengthBand(story.readTimeMinutes)}`}>
                  {lengthLabel(lengthBand(story.readTimeMinutes))}
                </MetaLink>
                {meta.moods.map((id) => {
                  const craving = cravingById(id);
                  if (!craving) return null;
                  return (
                    <MetaLink key={id} href={`/cravings/${id}`}>
                      {craving.label}
                    </MetaLink>
                  );
                })}
                {meta.kinks.slice(0, 3).map((id) => (
                  <MetaLink key={id} href={`/stories?kink=${id}`}>
                    {kinkLabel(id)}
                  </MetaLink>
                ))}
              </div>
              <aside className="border-l border-primary/40 pl-4 space-y-1">
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-primary">
                  Before you begin
                </p>
                <p className="font-reading italic text-muted leading-relaxed">{meta.authorNote}</p>
              </aside>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#read"
                  className="inline-flex items-center justify-center min-h-11 px-5 rounded-full bg-primary text-[#1a1408] font-sans text-sm font-semibold touch-manipulation"
                >
                  Begin the story
                </a>
                <button
                  type="button"
                  onClick={() => toggleSaved(story.slug)}
                  aria-pressed={saved}
                  className="inline-flex items-center justify-center min-h-11 px-5 rounded-full border border-white/15 font-sans text-sm text-foreground hover:border-primary/40 hover:text-primary cursor-pointer touch-manipulation"
                >
                  {saved ? "On your nightstand" : "Keep for later"}
                </button>
              </div>
            </div>
          )}

          <div id="read" className="reading-prose max-w-[64ch] mx-auto space-y-6 sm:space-y-7 mt-4 sm:mt-6 scroll-mt-24">
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

          <StoryAfterglow
            endingLine={endingLine}
            follow={follow}
            related={related}
            craving={
              primaryCraving
                ? { href: `/cravings/${primaryCraving.id}`, label: primaryCraving.label }
                : null
            }
          />
        </div>
      </article>
    </div>
  );
}
