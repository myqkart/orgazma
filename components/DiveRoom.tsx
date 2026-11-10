import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Button } from "@/components/ui/Button";
import { SCENES } from "@/lib/site";

export function DiveRoom() {
  return (
    <div>
      {SCENES.map((scene, index) => {
        const next = SCENES[index + 1];
        return (
          <section
            key={scene.id}
            id={scene.id}
            className="relative min-h-[100svh] flex items-end overflow-hidden scroll-mt-0"
          >
            <div className="absolute inset-0">
              <SafeImage
                src={scene.image}
                alt={scene.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center saturate-[1.08] brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/10" />
            </div>

            <div className="relative z-10 w-full max-w-[980px] mx-auto px-4 sm:px-6 md:px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pb-16 pt-28">
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary font-semibold">
                {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")} · {scene.kicker}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-[1.85rem] sm:text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] text-balance">
                {scene.line}
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button variant="primary" size="lg" href={scene.href} className="w-full sm:w-auto">
                  Open the story under this
                </Button>
                {next ? (
                  <Button variant="glass" size="lg" href={`#${next.id}`} className="w-full sm:w-auto">
                    Sink deeper
                  </Button>
                ) : (
                  <Button variant="glass" size="lg" href="/stories" className="w-full sm:w-auto">
                    Stay in the archive
                  </Button>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative px-4 sm:px-6 py-16 sm:py-24 text-center">
        <p className="font-display text-3xl sm:text-5xl text-foreground font-semibold text-balance max-w-2xl mx-auto">
          You can leave the page. The heat does not leave with you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button variant="primary" size="lg" href="/stories" className="w-full sm:w-auto">
            Open every door
          </Button>
          <Link
            href="#lean"
            className="min-h-12 inline-flex items-center justify-center px-6 rounded-full font-sans font-semibold text-foreground/80 hover:text-primary"
          >
            Start the canvas again
          </Link>
        </div>
      </section>
    </div>
  );
}
