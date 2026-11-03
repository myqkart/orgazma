import { notFound } from "next/navigation";
import { StoryView } from "@/components/StoryView";
import { getAllStories, getBySlug } from "@/lib/stories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

async function CachedStory({ slug }: { slug: string }) {
  "use cache";
  const story = getBySlug(slug);
  if (!story) return null;

  const all = getAllStories();
  const idx = all.findIndex((s) => s.slug === slug);
  const next = all[(idx + 1) % all.length];
  const nextSlug = next && next.slug !== slug ? next.slug : undefined;

  return <StoryView story={story} nextSlug={nextSlug} />;
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const view = await CachedStory({ slug });
  if (!view) notFound();
  return view;
}
