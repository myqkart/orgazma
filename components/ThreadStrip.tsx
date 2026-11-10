import React from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/ImageFallback";
import type { ThreadRoom } from "@/lib/catalog";

export function ThreadStrip({ room }: { room: ThreadRoom }) {
  return (
    <section className="relative">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="rounded-[28px] sm:rounded-[36px] border border-white/[0.08] bg-surface/70 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[320px]">
              <SafeImage
                src={room.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover saturate-[0.85] brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface via-surface/30 to-transparent" />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">
                {room.eyebrow}
              </p>
              <h2 className="font-display text-[1.75rem] sm:text-4xl font-semibold text-foreground text-balance">
                {room.title}
              </h2>
              <p className="font-reading text-muted text-[15px] sm:text-lg max-w-xl">{room.blurb}</p>
              <ol className="flex gap-3 overflow-x-auto snap-x pb-1">
                {room.stories.map((story, index) => (
                  <li key={story.slug} className="snap-start shrink-0">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="flex items-center gap-3 min-h-11 pr-3 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-primary/40 touch-manipulation"
                    >
                      <span className="relative h-11 w-11 rounded-full overflow-hidden shrink-0">
                        <SafeImage src={story.imageUrl} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                      <span className="font-sans text-sm text-foreground pr-1">
                        <span className="text-primary mr-1">0{index + 1}</span>
                        {story.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                href={`/threads/${room.id}`}
                className="inline-flex min-h-11 items-center font-sans text-sm font-semibold text-primary hover:text-primary-hover touch-manipulation"
              >
                Spend the night with her →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
