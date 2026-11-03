"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import type { StoryWithSlug } from "@/types/story";

const ENDING_LINES = [
  "You can breathe now. Or not.",
  "Take a minute. You earned it.",
  "Stay with the feeling a little longer.",
  "That one lingers, doesn't it?",
  "Close your eyes. Replay your favorite part.",
];

interface ReadingModalProps {
  story: StoryWithSlug | null;
  onClose: () => void;
  onSelectAnotherStory?: () => void;
}

export function ReadingModal({
  story,
  onClose,
  onSelectAnotherStory,
}: ReadingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Lazy initializer reads font size preference cleanly without cascading effect setState
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(() => {
    if (typeof window === "undefined") return 1;
    try {
      const saved = localStorage.getItem("fontSize");
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if ([0, 1, 2].includes(parsed)) return parsed;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 1;
  });

  // Check saved scroll position for resume toast
  const savedPosition = useMemo(() => {
    if (typeof window === "undefined" || !story) return null;
    try {
      const pos = localStorage.getItem(`pos:${story.slug}`);
      if (pos) {
        const parsed = parseFloat(pos);
        if (parsed > 120) return parsed;
      }
    } catch {
      // Ignore
    }
    return null;
  }, [story]);

  const [showResumeToast, setShowResumeToast] = useState(() => savedPosition !== null);

  // Deterministic ending line derived from story slug
  const endingLine = useMemo(() => {
    if (!story) return ENDING_LINES[0];
    let hash = 0;
    for (let i = 0; i < story.slug.length; i++) {
      hash = (hash << 5) - hash + story.slug.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % ENDING_LINES.length;
    return ENDING_LINES[idx];
  }, [story]);

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

  // Handle focus trapping and Escape key
  useEffect(() => {
    if (!story) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    };
  }, [story, onClose]);

  // Track scroll progress and save reading position
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || !story) return;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = (el.scrollTop / total) * 100;
    setScrollProgress(Math.min(100, Math.max(0, current)));

    // Save reading position per slug
    try {
      if (el.scrollTop > 80 && current < 95) {
        localStorage.setItem(`pos:${story.slug}`, String(Math.round(el.scrollTop)));
      } else if (current >= 95) {
        // finished story, clear saved position
        localStorage.removeItem(`pos:${story.slug}`);
      }
    } catch {
      // Ignore storage errors
    }
  };

  const handleResumeContinue = () => {
    if (savedPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: savedPosition,
        behavior: "smooth",
      });
    }
    setShowResumeToast(false);
  };

  const handleResumeFromStart = () => {
    if (story) {
      try {
        localStorage.removeItem(`pos:${story.slug}`);
      } catch {
        // Ignore
      }
    }
    setShowResumeToast(false);
  };

  const fontSizeClasses = useMemo(() => {
    switch (fontSizeIndex) {
      case 0:
        return "text-[16px] leading-[1.8]";
      case 2:
        return "text-[21px] leading-[1.9]";
      case 1:
      default:
        return "text-[18px] leading-[1.85]";
    }
  }, [fontSizeIndex]);

  if (!story) return null;

  return (
    <div
      key={story.slug}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reading-story-title"
        tabIndex={-1}
        className="relative flex flex-col w-full h-full md:h-[92vh] md:max-w-[760px] bg-[#140D13] text-[#F8EDF2] md:rounded-[32px] border border-white/[0.1] shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden focus:outline-none animate-in zoom-in-95 duration-250"
      >
        {/* Modern Sticky Top Bar */}
        <header className="sticky top-0 z-30 flex-none bg-[#140D13]/90 backdrop-blur-xl border-b border-white/[0.08]">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 gap-4">
            {/* Close Circle Button */}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close story reader"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F8EDF2] hover:text-[#C66B91] hover:bg-white/[0.1] hover:scale-105 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C66B91]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Truncated Title in Bar */}
            <span className="font-display text-base sm:text-lg text-[#F8EDF2] truncate font-medium max-w-[220px] sm:max-w-[380px]">
              {story.title}
            </span>

            {/* Modern Font Size Capsule */}
            <div
              className="flex items-center gap-1 bg-white/[0.04] rounded-full p-1 border border-white/[0.08]"
              role="group"
              aria-label="Font size controls"
            >
              <button
                type="button"
                onClick={() => changeFontSize(-1)}
                disabled={fontSizeIndex <= 0}
                title="Smaller"
                aria-label="Smaller text size"
                className="w-7 h-7 flex items-center justify-center text-xs font-serif font-medium text-[#F8EDF2] hover:text-[#C66B91] disabled:opacity-30 disabled:hover:text-[#F8EDF2] rounded-full transition-colors cursor-pointer"
              >
                A−
              </button>
              <div className="w-[1px] h-3.5 bg-white/10" />
              <button
                type="button"
                onClick={() => changeFontSize(1)}
                disabled={fontSizeIndex >= 2}
                title="Larger"
                aria-label="Larger text size"
                className="w-7 h-7 flex items-center justify-center text-sm font-serif font-semibold text-[#F8EDF2] hover:text-[#C66B91] disabled:opacity-30 disabled:hover:text-[#F8EDF2] rounded-full transition-colors cursor-pointer"
              >
                A+
              </button>
            </div>
          </div>

          {/* Glowing Gradient Reading Progress Bar */}
          <div className="w-full h-[2px] bg-white/[0.05] overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-gradient-to-r from-[#702442] via-[#C66B91] to-[#F8EDF2] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(198,107,145,0.5)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

        {/* Floating Resume Reading Toast */}
        {showResumeToast && (
          <div
            className="absolute top-16 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-2xl bg-[#1C101A]/95 backdrop-blur-2xl border border-[#C66B91]/40 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-300"
            role="status"
          >
            <span className="font-sans text-xs sm:text-sm text-[#F8EDF2]">
              Pick up where you left off?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResumeContinue}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#702442] to-[#862F52] hover:from-[#7C2B4B] hover:to-[#96375E] text-[#F8EDF2] text-xs font-medium transition-all shadow-md cursor-pointer"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleResumeFromStart}
                className="px-3 py-1.5 rounded-full text-xs text-[#BFA5B1] hover:text-[#F8EDF2] transition-colors cursor-pointer"
              >
                From the start
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Reading Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-16 py-10 space-y-10 scroll-smooth"
        >
          {/* Header Banner */}
          <div className="space-y-7">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-[22px] overflow-hidden bg-[#1C101A] border border-white/[0.08] shadow-lg">
              <SafeImage
                src={story.imageUrl}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-cover object-center saturate-[0.88] brightness-[0.9]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#140D13] via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-3 border-b border-white/[0.08] pb-8">
              <div className="flex items-center justify-between pb-2">
                <Pill variant="glass">{story.readTimeMinutes} min read</Pill>
              </div>
              <h1
                id="reading-story-title"
                className="font-display text-3xl sm:text-4xl md:text-[42px] text-[#F8EDF2] font-medium leading-[1.2]"
              >
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.15em] text-[#C66B91] font-medium">
                  {story.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Body Paragraphs Column (max 62ch) with First-Paragraph Drop Cap */}
          <div className="max-w-[62ch] mx-auto space-y-7">
            {story.content.map((paragraph, index) => {
              if (paragraph.trim() === "***") {
                return (
                  <div
                    key={`break-${index}`}
                    className="flex justify-center items-center gap-3 py-8 my-2 text-[#C66B91]"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]/50" />
                    <span className="w-2 h-2 rounded-full bg-[#C66B91] shadow-[0_0_10px_rgba(198,107,145,0.6)]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]/50" />
                  </div>
                );
              }

              const isFirst = index === 0;

              return (
                <p
                  key={`p-${index}`}
                  className={`font-reading text-[#F8EDF2]/90 ${fontSizeClasses} ${
                    isFirst
                      ? "first-letter:float-left first-letter:text-5xl first-letter:pr-3.5 first-letter:font-display first-letter:font-medium first-letter:text-[#C66B91] first-letter:leading-none"
                      : ""
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Modern Ending Card */}
          <div className="pt-14 pb-10 text-center border-t border-white/[0.08] space-y-7 mt-12 rounded-[24px] bg-white/[0.02] p-8 border border-white/[0.05]">
            <p className="font-reading italic text-2xl text-[#C66B91] max-w-md mx-auto leading-relaxed">
              {endingLine}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => {
                  onClose();
                  if (onSelectAnotherStory) {
                    onSelectAnotherStory();
                  } else if (typeof window !== "undefined") {
                    const el = document.getElementById("collection");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Another story
              </Button>
              <Button
                variant="glass"
                onClick={() => {
                  onClose();
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                Back to the top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
