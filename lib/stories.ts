import rawStories from "@/data/stories.json";
import type { Story, StoryWithSlug } from "@/types/story";

export function slugify(text: string): string {
  const cleaned = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "story";
}

function processStories(raw: unknown[]): StoryWithSlug[] {
  const slugCounts = new Map<string, number>();
  const processed: StoryWithSlug[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const s = item as Partial<Story>;

    const title = typeof s.title === "string" ? s.title.trim() : "";
    const rawContent = Array.isArray(s.content) ? s.content : [];
    const content = rawContent
      .filter((p): p is string => typeof p === "string" && p.trim().length > 0)
      .map((p) => p.trim());

    if (!title || content.length === 0) {
      continue;
    }

    const baseSlug = slugify(title);
    const count = (slugCounts.get(baseSlug) ?? 0) + 1;
    slugCounts.set(baseSlug, count);

    const slug = count === 1 ? baseSlug : `${baseSlug}-${count}`;

    const subtitle = typeof s.subtitle === "string" ? s.subtitle.trim() : "";
    const previewText =
      typeof s.previewText === "string" && s.previewText.trim().length > 0
        ? s.previewText.trim()
        : content[0]?.slice(0, 160) ?? "";

    const imageUrl =
      typeof s.imageUrl === "string" && s.imageUrl.trim().length > 0
        ? s.imageUrl.trim()
        : "https://images.unsplash.com/photo-1640433195067-0f50fc4ecb67?auto=format&fit=crop&w=1200&q=80";

    const readTimeMinutes =
      typeof s.readTimeMinutes === "number" && s.readTimeMinutes > 0
        ? Math.round(s.readTimeMinutes)
        : Math.max(1, Math.round(content.join(" ").split(/\s+/).length / 150));

    const isFeatured = Boolean(s.isFeatured);

    processed.push({
      title,
      subtitle,
      previewText,
      imageUrl,
      readTimeMinutes,
      isFeatured,
      content,
      slug,
    });
  }

  return processed;
}

const parsedStories: StoryWithSlug[] = processStories(rawStories as unknown[]);

export function getAllStories(): StoryWithSlug[] {
  return parsedStories;
}

export function getFeatured(): StoryWithSlug | undefined {
  return parsedStories.find((story) => story.isFeatured === true);
}

export function getBySlug(slug: string): StoryWithSlug | undefined {
  return parsedStories.find((story) => story.slug === slug);
}

