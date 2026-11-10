import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { SCENES } from "@/lib/site";

export function SceneTrail() {
  return (
    <section className="relative mt-4 mb-2" aria-label="Dive deeper">
      <div className="px-4 sm:px-6 md:px-8 mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            Still here
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl text-foreground font-semibold">
            The canvas is still open.
          </h2>
        </div>
        <Link
          href="/dive"
          className="shrink-0 font-sans text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Dive in
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 md:px-8 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SCENES.map((scene) => (
          <Link
            key={scene.id}
            href={`/dive#${scene.id}`}
            className="group relative snap-start shrink-0 w-[68vw] sm:w-[280px] h-44 sm:h-52 overflow-hidden rounded-[20px] border border-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            <SafeImage
              src={scene.image}
              alt={scene.alt}
              fill
              sizes="280px"
              className="object-cover object-center saturate-[1.05] brightness-[0.88] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-3 font-display text-lg text-foreground leading-snug line-clamp-2">
              {scene.line}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
