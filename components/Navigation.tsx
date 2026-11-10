"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SparkleOrnament } from "@/components/decor/Ornaments";
import { Logo } from "@/components/Logo";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Tonight" },
  { href: "/dive", label: "Dive" },
  { href: "/cravings", label: "Cravings" },
  { href: "/stories", label: "Archive" },
  { href: "/nightstand", label: "Nightstand" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const mobileMenuOpen = openPath !== null && openPath === pathname;
  const isReading = pathname?.startsWith("/stories/") && pathname !== "/stories";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  // Reading pages use StoryView's own chrome
  if (isReading) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-5 md:px-8 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-[max(1rem,env(safe-area-inset-top))] pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-[980px] transition-all duration-500 ease-out ${
          scrolled ? "sm:scale-[0.98]" : "scale-100"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-[22px] sm:rounded-full border transition-all duration-500 ${
            scrolled
              ? "bg-surface/90 backdrop-blur-2xl border-white/[0.1] shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
              : "bg-black/35 backdrop-blur-xl border-white/[0.12] shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          }`}
        >
          <div className="absolute inset-0 shimmer-border opacity-30 pointer-events-none" />
          <div className="relative flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-5 min-h-12 py-2.5 sm:py-3.5">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0 focus-visible:outline-none touch-manipulation"
            >
              <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center shrink-0">
                <span className="absolute inset-1 rounded-full bg-primary/45 blur-md group-hover:bg-primary/70 transition-colors" />
                <Logo className="relative h-8 w-8 sm:h-9 sm:w-9" />
              </span>
              <span className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                {SITE.name}
              </span>
              <SparkleOrnament className="hidden sm:block w-3 h-3 text-primary/70 animate-sparkle shrink-0" />
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main">
              {LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-full font-sans text-[13px] font-medium transition-all duration-200 touch-manipulation ${
                      active
                        ? "bg-primary/20 text-primary shadow-[inset_0_0_0_1px_rgba(230,179,90,0.35)]"
                        : "text-foreground/75 hover:text-foreground hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <span className="ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-sans font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                18+
              </span>
            </nav>

            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] font-sans font-semibold tracking-wider">
                18+
              </span>
              <button
                type="button"
                onClick={() => setOpenPath(mobileMenuOpen ? null : pathname ?? "/")}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
                className="touch-target w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-foreground hover:text-primary cursor-pointer touch-manipulation"
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm md:hidden"
              onClick={() => setOpenPath(null)}
            />
            <div className="relative z-50 md:hidden mt-2 p-2 rounded-[22px] bg-surface/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {LINKS.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-sans text-base font-medium py-3.5 px-4 rounded-2xl transition-all touch-manipulation text-center ${
                        active
                          ? "bg-primary/20 text-primary"
                          : "text-foreground hover:text-primary hover:bg-white/[0.05]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
