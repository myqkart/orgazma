import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import type { StoryCardData } from "@/lib/taxonomy";

export function NightPath({
  steps,
}: {
  steps: { step: string; card: StoryCardData }[];
}) {
  return (
    <section className="relative">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
            One night, in order
          </p>
          <h2 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl text-foreground tracking-tight font-semibold text-balance">
            If you only have tonight, do not choose. Follow.
          </h2>
          <p className="font-reading text-muted text-[15px] sm:text-lg">
            Start soft. Get quiet and risky. Finish somewhere you cannot be polite. Three doors, and the second one is better because of the first.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((item, index) => (
            <li key={item.card.slug}>
              <Link
                href={`/stories/${item.card.slug}`}
                className="group flex flex-col h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-card/60 shadow-[0_16px_40px_rgba(0,0,0,0.3)] focus-visible:outline-none transition-transform duration-500 sm:hover:-translate-y-1 touch-manipulation"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={item.card.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover saturate-[0.88] brightness-[0.75] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-display text-3xl text-primary">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5 space-y-2">
                  <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-primary font-semibold">
                    {item.step}
                  </p>
                  <h3 className="font-display text-2xl text-foreground">{item.card.title}</h3>
                  <p className="font-reading text-sm text-muted leading-relaxed line-clamp-3">
                    {item.card.hook}
                  </p>
                  <p className="mt-auto pt-3 font-sans text-xs font-semibold text-accent">
                    {index < steps.length - 1 ? "Then the next door →" : "Stay until the end →"}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
