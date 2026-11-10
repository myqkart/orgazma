import { notFound } from "next/navigation";
import { StoryView } from "@/components/StoryView";
import { getAllCards } from "@/lib/catalog";
import { getAllStories, getBySlug } from "@/lib/stories";
import { metaFor, nextInThread, relatedCards } from "@/lib/taxonomy";
import { SITE } from "@/lib/site";

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

  const cards = getAllCards();
  const related = relatedCards(cards, slug, 3);
  const follow = nextInThread(cards, slug);
  const meta = metaFor(slug);

  const title = `${story.title}: explicit erotic story`;
  const description =
    story.previewText?.slice(0, 155).trim() ||
    `Read ${story.title} on ${SITE.name}. Explicit erotic fiction for adults. 18+.`;
  const url = `${SITE.url}/stories/${story.slug}`;
  const image = story.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.previewText,
    image: [image],
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: url,
    isAccessibleForFree: true,
    audience: {
      "@type": "PeopleAudience",
      requiredMinAge: 18,
    },
    genre: "Erotica",
    keywords: meta?.tropes.join(", "),
  };

  return (
    <>
      {/* React 19 / Next hoists these into <head>. Avoids generateMetadata + Cache Components conflict */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="rating" content="adult" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={story.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryView story={story} related={related} follow={follow} />
    </>
  );
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const view = await CachedStory({ slug });
  if (!view) notFound();
  return view;
}
