import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import type { CravingRoom } from "@/lib/catalog";

export function CravingDoors({
  rooms,
  eyebrow = "Name the hunger",
  title = "Choose the room your body already picked.",
  body = "These are not tags dumped under a grid. Each door is a mood, with its own heat and its own promise.",
}: {
  rooms: CravingRoom[];
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            {eyebrow}
          </p>
          <h2 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl text-foreground tracking-tight font-semibold text-balance">
            {title}
          </h2>
          <p className="font-reading text-muted text-[15px] sm:text-lg">{body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {rooms.map((room, index) => {
            const wide = rooms.length % 2 === 1 && index === rooms.length - 1;
            return (
              <Link
                key={room.id}
                href={`/cravings/${room.id}`}
                className={`group relative overflow-hidden rounded-[22px] sm:rounded-[32px] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.35)] focus-visible:outline-none transition-transform duration-500 active:scale-[0.99] sm:hover:-translate-y-1 touch-manipulation ${
                  wide
                    ? "md:col-span-2 min-h-[240px] sm:min-h-[280px]"
                    : "min-h-[280px] sm:min-h-[360px]"
                }`}
              >
                <SafeImage
                  src={room.image}
                  alt=""
                  fill
                  sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                  className="object-cover object-center saturate-[0.85] brightness-[0.55] transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-7 space-y-2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
                    {room.eyebrow}
                    <span className="text-foreground/70">
                      {" "}
                      · {room.stories.length}{" "}
                      {room.stories.length === 1 ? "story" : "stories"}
                    </span>
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-balance">
                    {room.label}
                  </h3>
                  <p className="font-reading text-sm sm:text-base text-foreground/85 max-w-xl">
                    {room.blurb}
                  </p>
                  <p className="pt-1 font-sans text-xs font-semibold tracking-wide text-accent">
                    Step into the room
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      {" "}
                      →
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
