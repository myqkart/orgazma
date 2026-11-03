"use client";

import React, { useState, useEffect } from "react";

interface NavigationProps {
  hasFeatured?: boolean;
}

export function Navigation({ hasFeatured = true }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[#0E080D]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Wordmark with modern subtle crest */}
        <a
          href="#"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C66B91] rounded-lg"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#702442] to-[#C66B91] flex items-center justify-center p-[1px] shadow-[0_0_15px_rgba(198,107,145,0.4)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#0E080D] flex items-center justify-center">
              <span className="text-[10px] font-display font-bold text-[#C66B91]">V</span>
            </div>
          </div>
          <span className="font-display text-2xl sm:text-[26px] font-medium tracking-tight text-[#F8EDF2] group-hover:text-[#C66B91] transition-colors duration-200">
            Velvet Hours
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-2 lg:gap-3 bg-[#1C101A]/60 backdrop-blur-md p-1.5 px-3 rounded-full border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          aria-label="Main Navigation"
        >
          {hasFeatured && (
            <a
              href="#pick"
              className="px-4 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-medium tracking-wide text-[#F8EDF2]/80 hover:text-[#F8EDF2] hover:bg-white/[0.06] transition-all duration-200"
            >
              Tonight&apos;s Pick
            </a>
          )}
          <a
            href="#collection"
            className="px-4 py-1.5 rounded-full font-sans text-xs sm:text-[13px] font-medium tracking-wide text-[#F8EDF2]/80 hover:text-[#F8EDF2] hover:bg-white/[0.06] transition-all duration-200"
          >
            The Collection
          </a>
          <div className="pl-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#702442]/30 border border-[#C66B91]/30 text-[#C66B91] text-[10px] font-sans font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91] animate-pulse" />
              18+
            </span>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#702442]/30 border border-[#C66B91]/30 text-[#C66B91] text-[10px] font-sans font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
            18+
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F8EDF2] hover:text-[#C66B91] hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-[#C66B91] transition-all cursor-pointer"
          >
            {mobileMenuOpen ? (
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
            ) : (
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-[#1C101A]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl animate-in fade-in slide-in-from-top-3 duration-300">
          <nav className="flex flex-col gap-2 text-center" aria-label="Mobile Navigation">
            {hasFeatured && (
              <a
                href="#pick"
                onClick={closeMenu}
                className="font-sans text-sm font-medium text-[#F8EDF2] hover:text-[#C66B91] py-2.5 rounded-xl hover:bg-white/[0.05] transition-all"
              >
                Tonight&apos;s Pick
              </a>
            )}
            <a
              href="#collection"
              onClick={closeMenu}
              className="font-sans text-sm font-medium text-[#F8EDF2] hover:text-[#C66B91] py-2.5 rounded-xl hover:bg-white/[0.05] transition-all"
            >
              The Collection
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
