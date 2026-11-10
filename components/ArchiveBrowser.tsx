"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StoryCard } from "@/components/StoryCard";
import { StoryDoor } from "@/components/StoryDoor";
import {
  CRAVINGS,
  HEATS,
  HEAT_ORDER,
  KINKS,
  LENGTHS,
  LENGTH_ORDER,
  filterCards,
  type ArchiveQuery,
  type Heat,
  type LengthBand,
  type StoryCardData,
} from "@/lib/taxonomy";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-10 px-3.5 rounded-full border font-sans text-[12px] tracking-wide transition-colors cursor-pointer touch-manipulation ${
        active
          ? "bg-primary/20 text-primary border-primary/40"
          : "bg-white/[0.03] text-foreground/80 border-white/[0.1] hover:border-primary/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function ArchiveBrowser({ cards }: { cards: StoryCardData[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query: ArchiveQuery = {
    q: params.get("q") ?? "",
    mood: params.get("mood") ?? undefined,
    heat: params.get("heat") ?? undefined,
    length: params.get("length") ?? undefined,
    kink: params.get("kink") ?? undefined,
  };

  const mood = CRAVINGS.some((item) => item.id === query.mood) ? query.mood : undefined;
  const heat = HEAT_ORDER.includes(query.heat as Heat) ? (query.heat as Heat) : undefined;
  const length = LENGTH_ORDER.includes(query.length as LengthBand)
    ? (query.length as LengthBand)
    : undefined;
  const kink = KINKS.some((item) => item.id === query.kink) ? query.kink : undefined;
  const q = query.q ?? "";

  const filtered = useMemo(
    () => filterCards(cards, { q, mood, heat, length, kink }),
    [cards, q, mood, heat, length, kink]
  );

  const filtering = Boolean(q.trim() || mood || heat || length || kink);
  const tonight = cards.find((card) => card.isFeatured) ?? cards[0];
  const lead = !filtering ? tonight : filtered.length === 1 ? filtered[0] : undefined;
  const grid = lead ? filtered.filter((card) => card.slug !== lead.slug) : filtered;

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggle(key: string, value: string, current?: string) {
    setParam(key, current === value ? undefined : value);
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  return (
    <section className="relative">
      <div className="max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 py-10 sm:py-14 space-y-8">
        <div className="rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-surface/60 p-4 sm:p-6 space-y-5">
          <div className="relative">
            <label htmlFor="archive-search" className="sr-only">
              Search stories, moods, and touches
            </label>
            <input
              id="archive-search"
              type="search"
              enterKeyHint="search"
              value={q}
              onChange={(event) => setParam("q", event.target.value || undefined)}
              placeholder="A name, a room, a kind of touch…"
              className="w-full min-h-12 pl-4 pr-12 py-3 rounded-full bg-white/[0.04] border border-white/[0.1] text-base text-foreground placeholder-muted/50 focus:border-accent focus:outline-none"
            />
            {q && (
              <button
                type="button"
                onClick={() => setParam("q")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-1 my-auto h-10 w-10 rounded-full text-muted hover:text-foreground cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          <FilterRow label="Hunger">
            {CRAVINGS.map((craving) => (
              <Chip
                key={craving.id}
                active={mood === craving.id}
                onClick={() => toggle("mood", craving.id, mood)}
              >
                {craving.label}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Heat">
            {HEAT_ORDER.map((id) => (
              <Chip key={id} active={heat === id} onClick={() => toggle("heat", id, heat)}>
                {HEATS[id].label}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Length">
            {LENGTH_ORDER.map((id) => (
              <Chip key={id} active={length === id} onClick={() => toggle("length", id, length)}>
                {LENGTHS[id].label}
              </Chip>
            ))}
          </FilterRow>

          <FilterRow label="Touch">
            {KINKS.map((item) => (
              <Chip
                key={item.id}
                active={kink === item.id}
                onClick={() => toggle("kink", item.id, kink)}
              >
                {item.label}
              </Chip>
            ))}
          </FilterRow>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="font-reading text-sm text-muted">
              {filtered.length === 0
                ? "No door matches that exact hunger."
                : filtered.length === 1
                  ? "One door is open."
                  : `${filtered.length} doors are open.`}
            </p>
            {filtering && (
              <button
                type="button"
                onClick={clearAll}
                className="min-h-10 font-sans text-xs uppercase tracking-[0.14em] text-accent hover:text-primary cursor-pointer touch-manipulation"
              >
                Clear the night
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3" role="status">
            <p className="font-display italic text-2xl text-foreground">
              Nothing in that exact mood.
            </p>
            <p className="font-reading text-muted">Loosen one craving. The room is still warm.</p>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-14">
            {lead && (
              <StoryDoor
                story={lead}
                kicker={filtering ? "The one that fits" : "If you cannot choose"}
              />
            )}
            {grid.length > 0 && (
              <div className="space-y-5">
                {lead && (
                  <h2 className="font-display text-2xl sm:text-3xl text-foreground">
                    {filtering ? "The rest of this hunger" : "Every other door"}
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {grid.map((story, index) => (
                    <StoryCard key={story.slug} story={story} priority={index < 3} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
