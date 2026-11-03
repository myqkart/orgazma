import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lost in the dark",
  description: `This page slipped under the sheets. Return to ${SITE.name} and find another filthy story.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container clean className="min-h-[70svh] flex flex-col items-center justify-center text-center py-24 space-y-6">
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
        Lost in the dark
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground">
        This page slipped under the sheets.
      </h1>
      <p className="font-reading text-muted text-lg max-w-md">
        Whatever you were hunting isn&apos;t here. Try the archive instead.
      </p>
      <Button variant="primary" href="/stories">
        Back to the heat
      </Button>
    </Container>
  );
}
