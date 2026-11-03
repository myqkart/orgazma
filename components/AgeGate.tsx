"use client";

import React, { useSyncExternalStore, useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/ImageFallback";
import {
  FlourishOrnament,
  HeartOrnament,
  RoseOrnament,
  SparkleOrnament,
} from "@/components/decor/Ornaments";
import { ATMOS, SITE } from "@/lib/site";

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

export function AgeGate({ children }: { children: React.ReactNode }) {
  const isVerifiedFromStorage = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const [hasAcceptedLocally, setHasAcceptedLocally] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isAgeVerified = isVerifiedFromStorage || hasAcceptedLocally;

  const handleAccept = () => {
    try {
      localStorage.setItem("ageOk", "1");
    } catch {
      // ignore
    }
    setHasAcceptedLocally(true);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center" aria-hidden="true">
        <div className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-ping" />
      </div>
    );
  }

  if (!isAgeVerified) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-5 overflow-y-auto overscroll-contain"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agegate-headline"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="absolute inset-0">
          <SafeImage
            src={ATMOS.ageGate}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center saturate-[0.8] brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/85 to-background" />
        </div>

        <RoseOrnament className="hidden sm:block absolute top-[16%] left-[10%] w-16 h-16 text-accent/30 animate-float-soft" />
        <SparkleOrnament className="absolute top-[12%] right-[10%] sm:top-[22%] sm:right-[16%] w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent/50 animate-sparkle" />

        <div className="relative w-full max-w-[480px] my-auto rounded-[24px] sm:rounded-[32px] bg-surface/92 backdrop-blur-2xl border border-white/[0.1] p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-center space-y-5 sm:space-y-6 overflow-hidden">
          <div className="absolute inset-0 shimmer-border opacity-20 pointer-events-none rounded-[24px] sm:rounded-[32px]" />
          <div className="relative space-y-5 sm:space-y-6">
            <div className="flex justify-center">
              <span className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-[#f0c574] flex items-center justify-center shadow-[0_0_30px_rgba(230,179,90,0.45)]">
                <HeartOrnament className="w-5 h-5 text-[#1a1408]" />
              </span>
            </div>

            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
              Locked. Adults only.
            </p>
            <FlourishOrnament className="mx-auto w-24 sm:w-28 h-5 sm:h-6 text-primary/50" />

            <h2
              id="agegate-headline"
              className="font-display text-[1.65rem] sm:text-4xl text-foreground font-semibold leading-[1.15] text-balance"
            >
              Slip inside. Leave the lights low.
            </h2>

            <p className="font-reading text-foreground/85 text-[15px] sm:text-[17px] leading-relaxed">
              {SITE.name} is packed with explicit erotic fiction for hungry adults.
              You must be 18 or older to open these pages.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1">
              <Button
                variant="primary"
                size="md"
                onClick={handleAccept}
                className="w-full sm:w-auto"
              >
                I&apos;m 18+. Undress the door.
              </Button>
              <Button
                variant="glass"
                size="md"
                onClick={handleDecline}
                className="w-full sm:w-auto"
              >
                Too young. Leave.
              </Button>
            </div>

            <p className="font-sans text-xs text-muted/70 leading-relaxed pt-2 border-t border-white/[0.08]">
              By entering you swear you&apos;re an adult craving adult heat.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
