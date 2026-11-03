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
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0E080D] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agegate-headline"
      >
        {/* Soft Accent candlelight glow behind card */}
        <div
          className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#C66B91]/10 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-[480px] rounded-[24px] bg-[#1C101A] border border-[rgba(198,107,145,0.16)] p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] text-center space-y-6 animate-in fade-in zoom-in-95 duration-400">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-[#C66B91] font-medium">
              Adults only
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C66B91]" />
          </div>

          {/* Headline */}
          <h2
            id="agegate-headline"
            className="font-display text-3xl sm:text-4xl text-[#F8EDF2] font-medium leading-tight"
          >
            Close the door behind you.
          </h2>

          {/* Subtext */}
          <p className="font-reading text-[#F8EDF2]/90 text-base sm:text-[17px] leading-relaxed">
            What&apos;s inside is written for grown women who know what they want. You must be 18 or older to enter.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              onClick={handleAccept}
              className="w-full sm:w-auto"
            >
              I&apos;m 18+. Let me in.
            </Button>
            <Button
              variant="ghost"
              onClick={handleDecline}
              className="w-full sm:w-auto"
            >
              Not tonight
            </Button>
          </div>

          {/* Fine print */}
          <p className="font-sans text-xs text-[#BFA5B1]/60 leading-relaxed pt-2 border-t border-[rgba(198,107,145,0.1)]">
            By entering you confirm you&apos;re an adult and that you&apos;re choosing to read adult fiction.
          </p>
        </div>
      </div>
    );
  }

  // Once age verified, render children
  return <>{children}</>;
}
