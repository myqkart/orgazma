"use client";

import React, { useState, useEffect } from "react";
import { Pill } from "@/components/ui/Pill";

interface NavigationProps {
  hasFeatured?: boolean;
}

export function Navigation({ hasFeatured = true }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#172235]/90 backdrop-blur-md border-b border-[rgba(141,194,208,0.14)] py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC2D0] rounded-sm"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#E6EEF0] group-hover:text-[#8DC2D0] transition-colors duration-200">
            Velvet Hours
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          {hasFeatured && (
            <a
              href="#pick"
              className="font-sans text-sm font-medium tracking-[0.06em] text-[#E6EEF0]/80 hover:text-[#8DC2D0] transition-colors duration-200"
            >
              Tonight&apos;s Pick
            </a>
          )}
          <a
            href="#collection"
            className="font-sans text-sm font-medium tracking-[0.06em] text-[#E6EEF0]/80 hover:text-[#8DC2D0] transition-colors duration-200"
          >
            The Collection
          </a>
          <Pill className="text-[11px] py-0.5 px-2.5 border-[#8DC2D0]/30">18+</Pill>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Pill className="text-[10px] py-0.5 px-2 border-[#8DC2D0]/30">18+</Pill>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#E6EEF0] hover:text-[#8DC2D0] focus-visible:outline-2 focus-visible:outline-[#8DC2D0] rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
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
        <div className="md:hidden bg-[#172235]/95 backdrop-blur-xl border-b border-[rgba(141,194,208,0.14)] px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-5 text-center" aria-label="Mobile Navigation">
            {hasFeatured && (
              <a
                href="#pick"
                onClick={closeMenu}
                className="font-sans text-base text-[#E6EEF0] hover:text-[#8DC2D0] py-2 transition-colors duration-200"
              >
                Tonight&apos;s Pick
              </a>
            )}
            <a
              href="#collection"
              onClick={closeMenu}
              className="font-sans text-base text-[#E6EEF0] hover:text-[#8DC2D0] py-2 transition-colors duration-200"
            >
              The Collection
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
