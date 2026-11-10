import React from "react";
import { SafeImage } from "@/components/ui/ImageFallback";
import { Container } from "@/components/ui/Container";

export function PageBanner({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}) {
  return (
    <section className="relative pt-[5.5rem] sm:pt-24 px-3 sm:px-5 md:px-8">
      <div className="relative min-h-[38svh] sm:min-h-[46svh] flex items-end overflow-hidden rounded-[22px] sm:rounded-[40px] border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0">
          <SafeImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center saturate-[1.05] brightness-[0.58]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
        </div>
        <Container clean className="relative z-10 pb-8 sm:pb-12 pt-20 sm:pt-24 space-y-3 sm:space-y-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-accent font-semibold">
            {eyebrow}
          </p>
          <h1 className="font-display text-[1.85rem] sm:text-5xl md:text-6xl font-semibold text-foreground tracking-tight max-w-3xl leading-[1.08] text-balance">
            {title}
          </h1>
          <p className="font-reading text-[15px] sm:text-lg text-muted max-w-xl">{body}</p>
        </Container>
      </div>
    </section>
  );
}
