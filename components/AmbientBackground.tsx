"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NightSky } from "@/components/NightSky";
import { SparkleOrnament } from "@/components/decor/Ornaments";

export function AmbientBackground() {
  const pathname = usePathname();
  const isReading = pathname?.startsWith("/stories/") && pathname !== "/stories";
  if (isReading) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <NightSky dense fireflies />
      <SparkleOrnament className="absolute top-[14%] right-[12%] w-4 h-4 text-primary/40 animate-sparkle" />
      <SparkleOrnament className="hidden sm:block absolute top-[70%] right-[30%] w-3.5 h-3.5 text-accent/35 animate-sparkle-delayed" />
      <SparkleOrnament className="hidden md:block absolute top-[35%] left-[12%] w-3 h-3 text-primary/35 animate-sparkle" />
    </div>
  );
}
