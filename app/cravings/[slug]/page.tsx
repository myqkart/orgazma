import { notFound } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { SceneTrail } from "@/components/SceneTrail";
import { StoryDoor } from "@/components/StoryDoor";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getCravingRoom, getCravingRooms } from "@/lib/catalog";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCravingRooms().map((room) => ({ slug: room.id }));
}

async function CachedCraving({ slug }: { slug: string }) {
  "use cache";
  const room = getCravingRoom(slug);
  if (!room) return null;

  const title = `${room.label}: a craving on ${SITE.name}`;
  const description = room.blurb;
  const url = `${SITE.url}/cravings/${room.id}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="rating" content="adult" />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={room.image} />
      <PageBanner eyebrow={room.eyebrow} title={room.label} body={room.promise} image={room.image} />
      <Container clean className="py-12 sm:py-16 md:py-20 space-y-14 sm:space-y-20">
        <p className="font-reading text-lg sm:text-xl text-foreground/90 max-w-2xl">{room.blurb}</p>
        {room.stories.length === 1 && (
          <p className="font-display italic text-2xl text-primary max-w-xl">
            Only one story lives in this room. That is the point.
          </p>
        )}
        <div className="space-y-16 sm:space-y-24">
          {room.stories.map((story, index) => (
            <StoryDoor key={story.slug} story={story} kicker={story.tropes[0]} flip={index % 2 === 1} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/cravings">All cravings</Button>
          <Button variant="glass" href={`/stories?mood=${room.id}`}>
            This hunger in the archive
          </Button>
        </div>
      </Container>
      <SceneTrail />
    </>
  );
}

export default async function CravingPage({ params }: PageProps) {
  const { slug } = await params;
  const view = await CachedCraving({ slug });
  if (!view) notFound();
  return view;
}
