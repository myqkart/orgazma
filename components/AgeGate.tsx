"use client";

import React, { useSyncExternalStore, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem("ageOk") === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

interface AgeGateProps {
  children: React.ReactNode;
}

export function AgeGate({ children }: AgeGateProps) {
  // useSyncExternalStore safely reads localStorage on client and avoids SSR mismatch
  const isVerifiedFromStorage = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const [hasAcceptedLocally, setHasAcceptedLocally] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const isAgeVerified = isVerifiedFromStorage || hasAcceptedLocally;

  const handleAccept = () => {
    try {
      localStorage.setItem("ageOk", "1");
    } catch {
      // Ignore storage errors
    }
    setHasAcceptedLocally(true);
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.google.com";
    }
  };

  // Prevent hydration flash: render neutral dark screen until mounted
  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-50 bg-[#0E080D] flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#C66B91]/40 animate-ping" />
      </div>
    );
  }

  // If age is not verified, show full-screen Age Gate
  if (!isAgeVerified) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0E080D]/95 backdrop-blur-2xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agegate-headline"
      >
        {/* Soft Accent ambient glow */}
        <div
          className="absolute w-[450px] h-[450px] rounded-full bg-[#702442]/25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full bg-[#C66B91]/15 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[500px] rounded-[32px] bg-[#1A1018]/90 backdrop-blur-2xl border border-white/[0.1] p-8 sm:p-11 shadow-[0_30px_90px_rgba(0,0,0,0.8)] text-center space-y-7 animate-in fade-in zoom-in-95 duration-400">
          {/* Modern Seal Icon */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#702442] to-[#C66B91] p-[1px] shadow-[0_0_25px_rgba(198,107,145,0.4)]">
              <div className="w-full h-full rounded-full bg-[#0E080D] flex items-center justify-center text-[#C66B91]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C66B91] font-semibold">
              Adults only
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
          </div>

          {/* Headline */}
          <h2
            id="agegate-headline"
            className="font-display text-3xl sm:text-4xl text-[#F8EDF2] font-medium leading-[1.2]"
          >
            Close the door behind you.
          </h2>

          {/* Subtext */}
          <p className="font-reading text-[#F8EDF2]/85 text-base sm:text-[17px] leading-relaxed">
            What&apos;s inside is written for grown women who know what they want. You must be 18 or older to enter.
          </p>

          {/* Modern Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleAccept}
              className="w-full sm:w-auto shadow-[0_12px_28px_rgba(112,36,66,0.4)]"
            >
              I&apos;m 18+. Let me in.
            </Button>
            <Button
              variant="glass"
              size="md"
              onClick={handleDecline}
              className="w-full sm:w-auto"
            >
              Not tonight
            </Button>
          </div>

          {/* Fine print */}
          <p className="font-sans text-xs text-[#BFA5B1]/60 leading-relaxed pt-2 border-t border-white/[0.08]">
            By entering you confirm you&apos;re an adult and that you&apos;re choosing to read adult fiction.
          </p>
        </div>
      </div>
    );
  }

  // Once age verified, render children
  return <>{children}</>;
}
