import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/ImageFallback";
import { FlourishOrnament } from "@/components/decor/Ornaments";
import { SCENES } from "@/lib/site";

const HOME_IDS = ["lean", "red", "heels", "back", "thigh", "shower"] as const;

export function LustCanvas() {
  const frames = HOME_IDS.map((id) => SCENES.find((scene) => scene.id === id)).filter(
    (scene): scene is (typeof SCENES)[number] => Boolean(scene)
  );

  return (
    <section className="relative">
      <Container clean className="py-12 sm:py-16 md:py-20">
        <div className="mb-7 sm:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-xl space-y-2 sm:space-y-3">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
              The canvas
            </p>
            <h2 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight text-balance">
              Fall in. The way back gets quieter every scene.
            </h2>
            <FlourishOrnament className="w-28 sm:w-32 h-6 sm:h-7 text-accent/40" />
            <p className="font-reading text-[15px] sm:text-lg text-muted leading-relaxed">
              Skin, lace, wet light, a bed that has already started. Scroll the whole room when you are ready to stay.
            </p>
          </div>
          <Button variant="primary" size="lg" href="/dive" className="w-full sm:w-auto shrink-0">
            Dive in
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[210px]">
          {frames.map((scene, index) => {
            const span =
              index === 0
                ? "col-span-2 row-span-2"
                : index === 1
                  ? "col-span-2 md:col-span-2 row-span-1"
                  : "col-span-1 row-span-1";
            return (
              <Link
                key={scene.id}
                href={`/dive#${scene.id}`}
                className={`group relative overflow-hidden rounded-[18px] sm:rounded-[28px] border border-white/[0.1] shadow-[0_14px_36px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${span}`}
              >
                <SafeImage
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover object-center saturate-[1.05] brightness-[0.9] transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">
                    {scene.kicker}
                  </p>
                  <p className="mt-1 font-display text-base sm:text-xl text-foreground leading-snug line-clamp-2">
                    {scene.line}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
