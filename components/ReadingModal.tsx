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

  // Lazy initializer reads preference cleanly without cascading effect setState
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

  // Track scroll progress inside modal
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    if (total <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = (el.scrollTop / total) * 100;
    setScrollProgress(Math.min(100, Math.max(0, current)));
  };

  const fontSizeClasses = useMemo(() => {
    switch (fontSizeIndex) {
      case 0:
        return "text-[17px] leading-[1.85]";
      case 2:
        return "text-[22px] leading-[1.95]";
      case 1:
      default:
        return "text-[19px] leading-[1.9]";
    }
  }, [fontSizeIndex]);

  if (!story) return null;

  return (
    <div
      key={story.slug}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-8 bg-[#0C1420]/88 backdrop-blur-[12px] animate-in fade-in duration-300"
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
        className="relative flex flex-col w-full h-full md:h-[90vh] md:max-w-[720px] bg-[#172235] text-[#E6EEF0] md:rounded-[24px] border border-[rgba(141,194,208,0.16)] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden focus:outline-none animate-in zoom-in-95 duration-200"
      >
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-30 flex-none bg-[#172235]/95 backdrop-blur-md border-b border-[rgba(141,194,208,0.14)]">
          <div className="flex items-center justify-between px-5 py-3.5 gap-4">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              title="Close"
              aria-label="Close story reader"
              className="p-2 -ml-1 text-[#E6EEF0] hover:text-[#8DC2D0] hover:bg-[#8DC2D0]/10 rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#8DC2D0]"
            >
              <svg
                className="w-5 h-5"
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
            <span className="font-display text-base sm:text-lg text-[#E6EEF0] truncate font-medium max-w-[240px] sm:max-w-[360px]">
              {story.title}
            </span>

            {/* Font Size Controls */}
            <div
              className="flex items-center gap-1 bg-[#22334A]/80 rounded-full p-1 border border-[rgba(141,194,208,0.12)]"
              role="group"
              aria-label="Font size controls"
            >
              <button
                type="button"
                onClick={() => changeFontSize(-1)}
                disabled={fontSizeIndex <= 0}
                title="Smaller"
                aria-label="Smaller text size"
                className="w-7 h-7 flex items-center justify-center text-xs font-serif font-medium text-[#E6EEF0] hover:text-[#8DC2D0] disabled:opacity-30 disabled:hover:text-[#E6EEF0] rounded-full transition-colors cursor-pointer"
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => changeFontSize(1)}
                disabled={fontSizeIndex >= 2}
                title="Larger"
                aria-label="Larger text size"
                className="w-7 h-7 flex items-center justify-center text-sm font-serif font-semibold text-[#E6EEF0] hover:text-[#8DC2D0] disabled:opacity-30 disabled:hover:text-[#E6EEF0] rounded-full transition-colors cursor-pointer"
              >
                A+
              </button>
            </div>
          </div>

          {/* Thin Reading Progress Line */}
          <div className="w-full h-[2px] bg-[#22334A] overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-[#4C87A5] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

        {/* Scrollable Reading Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-10 md:px-12 py-8 space-y-8 scroll-smooth"
        >
          {/* Header Banner */}
          <div className="space-y-6">
            <div className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden bg-[#22334A] border border-[rgba(141,194,208,0.14)]">
              <SafeImage
                src={story.imageUrl}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover object-center saturate-[0.88] brightness-[0.9]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#172235] via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-2 border-b border-[rgba(141,194,208,0.14)] pb-6">
              <div className="flex items-center justify-between pb-2">
                <Pill>{story.readTimeMinutes} min read</Pill>
              </div>
              <h1
                id="reading-story-title"
                className="font-display text-3xl sm:text-4xl md:text-[40px] text-[#E6EEF0] font-medium leading-tight"
              >
                {story.title}
              </h1>
              {story.subtitle && (
                <p className="font-display italic text-[#A0B0C0] text-lg sm:text-xl">
                  {story.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Body Paragraphs Column (max 62ch) */}
          <div className="max-w-[62ch] mx-auto space-y-6">
            {story.content.map((paragraph, index) => {
              if (paragraph.trim() === "***") {
                return (
                  <div
                    key={`break-${index}`}
                    className="flex justify-center items-center gap-2.5 py-6 my-2 text-[#8DC2D0]"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC2D0]/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC2D0]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC2D0]/60" />
                  </div>
                );
              }

              return (
                <p
                  key={`p-${index}`}
                  className={`font-reading text-[#E6EEF0] ${fontSizeClasses}`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Ending Block */}
          <div className="pt-16 pb-12 text-center border-t border-[rgba(141,194,208,0.14)] space-y-8 mt-12">
            <p className="font-display italic text-2xl text-[#8DC2D0] max-w-md mx-auto leading-relaxed">
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
                variant="ghost"
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
