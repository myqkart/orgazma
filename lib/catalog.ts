import { getAllStories } from "@/lib/stories";
import {
  CRAVINGS,
  NIGHT_PATH,
  THREADS,
  lengthBand,
  metaFor,
  type CravingDef,
  type StoryCardData,
  type ThreadDef,
} from "@/lib/taxonomy";

export function getAllCards(): StoryCardData[] {
  return getAllStories().map((story) => {
    const meta = metaFor(story.slug);
    const length = lengthBand(story.readTimeMinutes);
    return {
      slug: story.slug,
      title: story.title,
      subtitle: story.subtitle,
      previewText: story.previewText,
      imageUrl: story.imageUrl,
      readTimeMinutes: story.readTimeMinutes,
      isFeatured: story.isFeatured,
      hook: meta?.hook ?? story.subtitle,
      desire: meta?.desire ?? "",
      authorNote: meta?.authorNote ?? "",
      moods: meta?.moods ?? [],
      tropes: meta?.tropes ?? [],
      kinks: meta?.kinks ?? [],
      heat: meta?.heat ?? "ache",
      length,
      series: meta?.series,
    };
  });
}

export function getCard(slug: string): StoryCardData | undefined {
  return getAllCards().find((card) => card.slug === slug);
}

export function getTonight(): StoryCardData | undefined {
  const cards = getAllCards();
  return cards.find((card) => card.isFeatured) ?? cards[0];
}

export interface CravingRoom extends CravingDef {
  stories: StoryCardData[];
  image: string;
}

export function getCravingRooms(): CravingRoom[] {
  const cards = getAllCards();
  return CRAVINGS.map((craving) => {
    const stories = cards.filter((card) => card.moods.includes(craving.id));
    return {
      ...craving,
      stories,
      image: stories[0]?.imageUrl ?? "",
    };
  }).filter((room) => room.stories.length > 0 && room.image);
}

export function getCravingRoom(id: string): CravingRoom | undefined {
  return getCravingRooms().find((room) => room.id === id);
}

export interface ThreadRoom extends ThreadDef {
  stories: StoryCardData[];
  image: string;
}

export function getThreadRooms(): ThreadRoom[] {
  const cards = getAllCards();
  return THREADS.map((thread) => {
    const stories = thread.order
      .map((slug) => cards.find((card) => card.slug === slug))
      .filter((card): card is StoryCardData => Boolean(card));
    return {
      ...thread,
      stories,
      image: stories[0]?.imageUrl ?? "",
    };
  }).filter((room) => room.stories.length > 0);
}

export function getThreadRoom(id: string): ThreadRoom | undefined {
  return getThreadRooms().find((room) => room.id === id);
}

export function getNightPath(): { step: string; card: StoryCardData }[] {
  const cards = getAllCards();
  return NIGHT_PATH.map((step) => {
    const card = cards.find((item) => item.slug === step.slug);
    return card ? { step: step.step, card } : null;
  }).filter((item): item is { step: string; card: StoryCardData } => Boolean(item));
}
