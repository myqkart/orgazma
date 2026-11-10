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
    dive: {
      title: "The Dive: a canvas you do not climb out of",
      description:
        "A scroll of lust, skin, and low light. Fall through the scenes. The stories at the bottom of each one will not let you leave clean. 18+.",
    },
  },
} as const;

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Lusty, erotic Unsplash scenes. Adult bodies, lingerie, bed, shower. No soft stock romance. */
export const SCENES = [
  {
    id: "lean",
    kicker: "Over him",
    line: "She leans down in black lace like the bed already agreed.",
    image: u("photo-1592398289517-d9437d109bc2", 2000),
    href: "/stories/forbidden-frequency",
    alt: "Woman in black lace leaning over a shirtless man in bed",
  },
  {
    id: "red",
    kicker: "Mouth",
    line: "Her mouth finds a throat. The red light keeps the secret.",
    image: u("photo-1553010254-267b14135d9b", 1800),
    href: "/stories/shhh-keep-quiet",
    alt: "Two women in lingerie, one kissing the other's neck in red light",
  },
  {
    id: "heels",
    kicker: "Knees",
    line: "Heels, lace, and a hand that knows exactly where it is going.",
    image: u("photo-1653209709214-9e75956b1ca9", 1800),
    href: "/stories/let-me-click",
    alt: "Two women in lingerie and heels kneeling together",
  },
  {
    id: "back",
    kicker: "Unhook",
    line: "The clasp is warm from her skin. Take your time ruining it.",
    image: u("photo-1674562958590-ff9e1c97d742", 1800),
    href: "/stories/wedding-album",
    alt: "Woman seen from behind in black lace lingerie on a bed",
  },
  {
    id: "thigh",
    kicker: "One finger",
    line: "A hand on her thigh. The rest of the night follows that hand.",
    image: u("photo-1640433195067-0f50fc4ecb67", 1800),
    href: "/stories/the-taste-of-fear",
    alt: "Close crop of a hand resting on a thigh in black lace",
  },
  {
    id: "shower",
    kicker: "The falls",
    line: "She went in alone. The waterfall did not stay empty.",
    image: u("photo-1632311155083-7d50dc1ec10c", 2000),
    href: "/stories/dolphin-under-the-volcano",
    alt: "A woman reclining in the pool beneath a waterfall",
  },
  {
    id: "bodies",
    kicker: "Light",
    line: "Hips, hands, and sunlight that should not be this honest.",
    image: u("photo-1642521300522-e1d4703acf6a", 2000),
    href: "/stories/i-need-a-trip",
    alt: "Sunlit naked bodies with hands resting on skin",
  },
  {
    id: "morning",
    kicker: "Sheets",
    line: "They stopped pretending this was only a kiss.",
    image: u("photo-1551260247-43edacf0d172", 2000),
    href: "/stories/around-6-00-am",
    alt: "Couple in underwear kissing while lying on a messy bed",
  },
  {
    id: "stockings",
    kicker: "Stay on",
    line: "The stockings stay on. That was the only rule.",
    image: u("photo-1770610325567-fe87751f3fd3", 2000),
    href: "/stories/let-me-click",
    alt: "Woman in black lingerie and stockings lying on a white bed",
  },
  {
    id: "blue",
    kicker: "Closer",
    line: "Close enough to taste the heat coming off her back.",
    image: u("photo-1526404746352-668ded9b50ab", 1600),
    href: "/stories/brush-of-an-artist",
    alt: "Close-up of a woman's back in pale blue lace lingerie",
  },
  {
    id: "watch",
    kicker: "Behind him",
    line: "She looks over his bare shoulder. You are already in the room.",
    image: u("photo-1542850262-29dc96e280b0", 1800),
    href: "/stories/stargazing",
    alt: "Woman looking over a shirtless man's shoulder in low light",
  },
  {
    id: "bare",
    kicker: "Morning after",
    line: "She has not put a thing on. The day can wait outside.",
    image: u("photo-1573576412548-de11ce1c8f7e", 1800),
    href: "/stories/around-6-00-am",
    alt: "Woman sitting on a bed with her back bare",
  },
] as const;

/** Intimate Unsplash URLs for UI surfaces. Same heat as the dive. */
export const ATMOS = {
  hero: u("photo-1592398289517-d9437d109bc2", 2400),
  heroSoft: u("photo-1553010254-267b14135d9b", 2000),
  ageGate: u("photo-1653209709214-9e75956b1ca9", 1800),
  collection: u("photo-1770610325567-fe87751f3fd3", 2000),
  about: u("photo-1642521300522-e1d4703acf6a", 2000),
  footer: u("photo-1592399668789-6432393d5761", 2000),
  readingGlow: u("photo-1573576412548-de11ce1c8f7e", 1600),
  ambient: [
    u("photo-1640433195067-0f50fc4ecb67", 900),
    u("photo-1526404746352-668ded9b50ab", 900),
    u("photo-1674562958590-ff9e1c97d742", 900),
    u("photo-1640433194309-125e6df68561", 900),
  ],
  strip: [
    u("photo-1592398289517-d9437d109bc2", 1000),
    u("photo-1553010254-267b14135d9b", 1000),
    u("photo-1653209709214-9e75956b1ca9", 1000),
    u("photo-1674562958590-ff9e1c97d742", 1000),
    u("photo-1640433195067-0f50fc4ecb67", 1000),
    u("photo-1592399668789-6432393d5761", 1000),
    u("photo-1642521300522-e1d4703acf6a", 1000),
    u("photo-1770610325567-fe87751f3fd3", 1000),
    u("photo-1526404746352-668ded9b50ab", 1000),
    u("photo-1542850262-29dc96e280b0", 1000),
    u("photo-1640433194309-125e6df68561", 1000),
    u("photo-1782148737290-28b170b3eb42", 1000),
  ],
  moods: [
    {
      label: "Slow & soaked",
      blurb: "When you want every page to drag a fingernail down your spine.",
      image: u("photo-1632311155083-7d50dc1ec10c", 1200),
      href: "/dive#shower",
    },
    {
      label: "Hard & hungry",
      blurb: "No teasing. Just the kind of heat that ruins tomorrow.",
      image: u("photo-1653209709214-9e75956b1ca9", 1200),
      href: "/dive#heels",
    },
    {
      label: "Secret & sinful",
      blurb: "Stories for locked doors, low lights, and hands you shouldn't have.",
      image: u("photo-1640433195067-0f50fc4ecb67", 1200),
      href: "/dive#thigh",
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
