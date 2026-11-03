/** Site chrome only — never mutates story body text. */

export const SITE = {
  name: "Orgazma",
  tagline: "Filthy fiction for nights you can't sleep through.",
  description:
    "Explicit erotic stories for adults who want heat, hunger, and a door that locks. 18+ only.",
  ageNote: "Adults only. Every character is 18+. Minors stay out.",
} as const;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Intimate / bedtime / seductive Unsplash URLs for UI surfaces. */
export const ATMOS = {
  // Couple in bed — soft morning intimacy
  hero: u("photo-1758523666970-07b30de4c9d1", 2400),
  // Candlelit almost-kiss
  heroSoft: u("photo-1560439972-1af698047fa3", 2000),
  // Rose petals / bedroom romance
  ageGate: u("photo-1518199266791-5375a83190b7", 1800),
  // Hands in bed, candles, petals
  collection: u("photo-1578359218607-e41323f6b5ff", 2000),
  // Intimate embrace
  about: u("photo-1516589178581-6cd7833ae3b2", 2000),
  // Soft lusty couple
  footer: u("photo-1529333166437-7750a6dd5a70", 2000),
  readingGlow: u("photo-1758523666996-7540603c85a7", 1600),
  ambient: [
    u("photo-1502823403499-6ccfcf4fb453", 900),
    u("photo-1516726817505-f5ed825624d8", 900),
    u("photo-1517841905240-472988babdf9", 900),
    u("photo-1488426862026-3ee34a7d66df", 900),
  ],
  strip: [
    u("photo-1758523666970-07b30de4c9d1", 900),
    u("photo-1578359218607-e41323f6b5ff", 900),
    u("photo-1560439972-1af698047fa3", 900),
    u("photo-1516589178581-6cd7833ae3b2", 900),
    u("photo-1529333166437-7750a6dd5a70", 900),
    u("photo-1769050737376-038ce3490e92", 900),
  ],
  moods: [
    {
      label: "Slow & soaked",
      blurb: "When you want every page to drag a fingernail down your spine.",
      image: u("photo-1758523666996-7540603c85a7", 1200),
      href: "/stories",
    },
    {
      label: "Hard & hungry",
      blurb: "No teasing. Just the kind of heat that ruins tomorrow.",
      image: u("photo-1529333166437-7750a6dd5a70", 1200),
      href: "/stories",
    },
    {
      label: "Secret & sinful",
      blurb: "Stories for locked doors, low lights, and hands you shouldn't have.",
      image: u("photo-1560439972-1af698047fa3", 1200),
      href: "/stories",
    },
  ],
} as const;

export const ENDING_LINES = [
  "You can breathe now. Or stay wet a little longer.",
  "Take a minute. Your body earned it.",
  "Stay with the ache. Replay the filthy part.",
  "That one sticks between your thighs, doesn't it?",
  "Lights off. Eyes closed. Feel it again.",
] as const;
