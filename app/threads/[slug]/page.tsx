import { notFound } from "next/navigation";
import { PageBanner } from "@/components/PageBanner";
import { SceneTrail } from "@/components/SceneTrail";
import { StoryDoor } from "@/components/StoryDoor";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getThreadRoom, getThreadRooms } from "@/lib/catalog";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getThreadRooms().map((room) => ({ slug: room.id }));
}

async function CachedThread({ slug }: { slug: string }) {
  "use cache";
  const room = getThreadRoom(slug);
  if (!room) return null;

  const title = `${room.title}: a thread on ${SITE.name}`;
  const description = room.blurb;
  const url = `${SITE.url}/threads/${room.id}`;

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
      <PageBanner eyebrow={room.eyebrow} title={room.title} body={room.promise} image={room.image} />
      <Container clean className="py-12 sm:py-16 md:py-20 space-y-14 sm:space-y-20">
        <p className="font-reading text-lg sm:text-xl text-foreground/90 max-w-2xl">{room.blurb}</p>
        <div className="space-y-16 sm:space-y-24">
          {room.stories.map((story, index) => (
            <StoryDoor
              key={story.slug}
              story={story}
              kicker={`0${index + 1} · ${story.tropes[0] ?? "Her night"}`}
              flip={index % 2 === 1}
            />
          ))}
        </div>
        <Button href="/stories">Wander off her path</Button>
      </Container>
      <SceneTrail />
    </>
  );
}

export default async function ThreadPage({ params }: PageProps) {
  const { slug } = await params;
  const view = await CachedThread({ slug });
  if (!view) notFound();
  return view;
}
