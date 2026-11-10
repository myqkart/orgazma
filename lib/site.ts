/** Site chrome only. Never mutates story body text. */

export const SITE = {
  name: "Orgazma",
  shortName: "Orgazma",
  tagline: "Filthy fiction for nights you can't sleep through.",
  description:
    "Explicit erotic stories for adults who want heat, hunger, and a door that locks. Midnight reading for the desperately wet. 18+ only.",
  longDescription:
    "Orgazma is an adults-only erotic fiction library made for locked doors and low lights. Slow burns, filthy mornings, and intimate bedtime stories, written to be read alone.",
  /** Override at deploy with NEXT_PUBLIC_SITE_URL if needed. */
  url: "https://orgazma.app",
  locale: "en_US",
  language: "en",
  creator: "Orgazma",
  twitterHandle: "@orgazma",
  email: "hello@orgazma.app",
  ageNote: "Adults only. Every character is 18+. Minors stay out.",
  keywords: [
    "erotic fiction",
    "adult stories",
    "erotica",
    "sexy short stories",
    "explicit romance",
    "bedtime erotica",
    "intimate fiction",
    "18+ stories",
    "midnight reading",
    "lusty stories",
    "Orgazma",
  ],
  ogImage: {
    url: "/og.jpg",
    width: 1200,
    height: 630,
    alt: "Orgazma, intimate erotic fiction after dark",
  },
  pages: {
    home: {
      title: "Orgazma: explicit erotic fiction after midnight",
      description:
        "Filthy bedtime stories for hungry adults. Read explicit erotic fiction under the stars. Locked doors only. 18+.",
    },
    stories: {
      title: "The Archive: every door, chosen by hunger",
      description:
        "Browse Orgazma by craving, heat, length, and touch. Explicit erotic stories for adults who want a room, not a feed. 18+.",
    },
    cravings: {
      title: "Cravings: name the hunger",
      description:
        "Step into a mood: dreams, almost caught, strangers, being seen, or her hands. Explicit erotic fiction, 18+.",
    },
    nightstand: {
      title: "Nightstand: stories you kept",
      description:
        "Unfinished stories, saved stories, and the ones you already finished. Your private drawer on this device. 18+.",
    },
    about: {
      title: "After Dark: what Orgazma is",
      description:
        "Orgazma is a private reading room for adults who want explicit heat, midnight atmosphere, and stories that stay between the sheets. 18+ only.",
    },
  },
} as const;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Intimate / bedtime / seductive Unsplash URLs for UI surfaces. */
export const ATMOS = {
  hero: u("photo-1758523666970-07b30de4c9d1", 2400),
  heroSoft: u("photo-1560439972-1af698047fa3", 2000),
  ageGate: u("photo-1518199266791-5375a83190b7", 1800),
  collection: u("photo-1578359218607-e41323f6b5ff", 2000),
  about: u("photo-1516589178581-6cd7833ae3b2", 2000),
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
