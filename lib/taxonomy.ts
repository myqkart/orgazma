/** Editorial layer for discovery. Does not touch story prose. Safe to import from client components. */

export type Heat = "simmer" | "ache" | "ruin";
export type LengthBand = "quick" | "linger" | "all-night";

export interface StoryMeta {
  hook: string;
  desire: string;
  authorNote: string;
  moods: string[];
  tropes: string[];
  kinks: string[];
  heat: Heat;
  series?: string;
}

export interface StoryTease {
  slug: string;
  title: string;
  subtitle: string;
  previewText: string;
  imageUrl: string;
  readTimeMinutes: number;
  hook?: string;
  desire?: string;
  heat?: Heat;
  length?: LengthBand;
  tropes?: string[];
  moods?: string[];
  kinks?: string[];
  series?: string;
  isFeatured?: boolean;
}

export interface StoryCardData extends StoryTease {
  hook: string;
  desire: string;
  authorNote: string;
  heat: Heat;
  length: LengthBand;
  tropes: string[];
  moods: string[];
  kinks: string[];
  series?: string;
}

export interface CravingDef {
  id: string;
  label: string;
  eyebrow: string;
  blurb: string;
  promise: string;
}

export interface ThreadDef {
  id: string;
  title: string;
  eyebrow: string;
  blurb: string;
  promise: string;
  order: string[];
}

export interface NightStep {
  slug: string;
  step: string;
}

export const HEATS: Record<Heat, { label: string; hint: string }> = {
  simmer: {
    label: "Simmer",
    hint: "Slow, close, and still a little gentle.",
  },
  ache: {
    label: "Ache",
    hint: "The want lasts. Hungry, not brutal.",
  },
  ruin: {
    label: "Ruin",
    hint: "Rough, urgent, hard to walk away from.",
  },
};

export const HEAT_ORDER: Heat[] = ["simmer", "ache", "ruin"];

export const LENGTHS: Record<LengthBand, { label: string; hint: string }> = {
  quick: {
    label: "A stolen hour",
    hint: "In and out before the night notices.",
  },
  linger: {
    label: "Stay a while",
    hint: "Enough time to stop rushing.",
  },
  "all-night": {
    label: "Don't plan tomorrow",
    hint: "Long enough to forget the clock.",
  },
};

export const LENGTH_ORDER: LengthBand[] = ["quick", "linger", "all-night"];

export const KINKS: { id: string; label: string }[] = [
  { id: "dreaming", label: "Dreaming" },
  { id: "women", label: "Between women" },
  { id: "strangers", label: "Strangers" },
  { id: "almost-caught", label: "Almost caught" },
  { id: "outdoors", label: "Outdoors" },
  { id: "being-seen", label: "Being seen" },
  { id: "first-time", label: "First time" },
  { id: "rough", label: "Rough hands" },
  { id: "quiet", label: "Keep quiet" },
];

export const CRAVINGS: CravingDef[] = [
  {
    id: "dreams",
    label: "Dreams that finish",
    eyebrow: "Half asleep",
    blurb: "You wake up wet, and the story still calls it a dream.",
    promise: "For the nights your body starts without you.",
  },
  {
    id: "quiet",
    label: "Don't make a sound",
    eyebrow: "Almost caught",
    blurb: "Libraries, classrooms, glass towers. Someone could walk in.",
    promise: "Heat that has to stay in the throat.",
  },
  {
    id: "strangers",
    label: "Once, and never again",
    eyebrow: "Strangers",
    blurb: "A body you will not get a second night with.",
    promise: "No names you have to keep.",
  },
  {
    id: "watched",
    label: "Eyes on you",
    eyebrow: "Being seen",
    blurb: "Cameras, mirrors, curtains, glass. The thrill is the gaze.",
    promise: "For when you want to be looked at until you give in.",
  },
  {
    id: "hers",
    label: "Her hands",
    eyebrow: "Between women",
    blurb: "No man in the room. A brush, a mirror, a bride who is not ready.",
    promise: "The softest door. It does not stay soft.",
  },
];

export const THREADS: ThreadDef[] = [
  {
    id: "malini",
    title: "Malini, after dark",
    eyebrow: "A thread",
    blurb:
      "The same woman. Different rooms, different hands, the same appetite. Read her in this order when one story is not enough.",
    promise: "She does not end when the page does.",
    order: [
      "around-6-00-am",
      "shhh-keep-quiet",
      "brush-of-an-artist",
      "let-me-click",
      "dolphin-under-the-volcano",
      "i-need-a-trip",
      "stargazing",
    ],
  },
];

export const NIGHT_PATH: NightStep[] = [
  { slug: "around-6-00-am", step: "Begin half-asleep" },
  { slug: "shhh-keep-quiet", step: "Then don't make a sound" },
  { slug: "dolphin-under-the-volcano", step: "Finish where no one is polite" },
];

const META: Record<string, StoryMeta> = {
  "around-6-00-am": {
    hook: "The office party followed her into sleep. Her body never got the message that it was a dream.",
    desire: "Morning heat, half-awake, the kind that leaves the sheets damp before the day starts.",
    authorNote:
      "Read this before you are fully awake. The dream and the body disagree about what happened, and that argument is the point.",
    moods: ["dreams"],
    tropes: ["Office crush", "Waking wet", "Half-asleep"],
    kinks: ["dreaming"],
    heat: "simmer",
    series: "malini",
  },
  "brush-of-an-artist": {
    hook: "A bridal brush slips. After that, it is not a brush.",
    desire: "Slow hands, a mirror, and a woman learning her want from another woman.",
    authorNote:
      "This is the tender one that refuses to stay tender. Give it the long way through. There is only one story in the room called Her hands, and this is it.",
    moods: ["hers", "watched"],
    tropes: ["Artist and bride", "Between women", "The mirror"],
    kinks: ["women", "being-seen"],
    heat: "ache",
    series: "malini",
  },
  "dolphin-under-the-volcano": {
    hook: "She went looking for a secret waterfall. A stranger came down with the water.",
    desire: "Naked in daylight, rough hands, nowhere left to be polite.",
    authorNote:
      "No slow dinner. The landscape does the teasing. He does not. Read it when you want the gentleness gone.",
    moods: ["strangers"],
    tropes: ["Waterfall", "Stranger", "Daylight"],
    kinks: ["strangers", "outdoors", "rough"],
    heat: "ruin",
    series: "malini",
  },
  "let-me-click": {
    hook: "The camera was only supposed to look. Then it kept looking.",
    desire: "Being arranged, photographed, and taken apart by the person holding the lens.",
    authorNote:
      "For the mood where you want to be seen first, and handled second. The shutter is the foreplay.",
    moods: ["watched"],
    tropes: ["The camera", "A pose", "After the shutter"],
    kinks: ["being-seen", "rough"],
    heat: "ruin",
    series: "malini",
  },
  "forbidden-frequency": {
    hook: "A locked clocktower. A stranger. A city that cannot see you through the glass.",
    desire: "Urgent, public, and over before the hour strikes.",
    authorNote:
      "Short fuse. Two adults, no prologue. The name inked on his hand may rhyme with someone you have already met.",
    moods: ["quiet", "strangers"],
    tropes: ["Clocktower", "Stranger", "Against the glass"],
    kinks: ["almost-caught", "strangers", "rough"],
    heat: "ruin",
  },
  "the-taste-of-fear": {
    hook: "An empty college classroom. A first time. A knock that might be nothing.",
    desire: "Nerves, hurry, and a taste that stays after you are dressed again.",
    authorNote:
      "Everyone here is in college. The fear is being caught, not being young. Read it like you can hear the corridor.",
    moods: ["quiet"],
    tropes: ["College", "First time", "Empty classroom"],
    kinks: ["first-time", "almost-caught"],
    heat: "ache",
  },
  "i-need-a-trip": {
    hook: "A storm, a stranger's hut, and your shadow thrown across his curtain.",
    desire: "Voyeur heat that turns rough. Do not leave before the last page.",
    authorNote:
      "The forest is not the whole truth. Stay through the quiet after. This one pays you for patience.",
    moods: ["dreams", "strangers", "watched"],
    tropes: ["Forest storm", "Stranger", "The curtain"],
    kinks: ["dreaming", "strangers", "being-seen", "rough"],
    heat: "ruin",
    series: "malini",
  },
  "wedding-album": {
    hook: "The choli will not close. The groom's brother is the only one who can reach the hooks.",
    desire: "A hotel mirror, a red lehenga, and hands that stop pretending they are only helping.",
    authorNote:
      "The wedding is still happening downstairs. This room is the part nobody puts in the album.",
    moods: ["watched"],
    tropes: ["Wedding hotel", "The mirror", "Red lehenga"],
    kinks: ["being-seen", "almost-caught"],
    heat: "ruin",
  },
  stargazing: {
    hook: "The camp is asleep. Malini is not. Ayaan is, until he isn't.",
    desire: "A sleeping bag, a sky full of witnesses, and a hand over his mouth so nobody wakes.",
    authorNote:
      "Everyone else is in the same field. The quiet is the whole risk. She starts it. He finishes awake.",
    moods: ["quiet", "strangers"],
    tropes: ["Campfire night", "Under the stars", "Don't wake them"],
    kinks: ["quiet", "outdoors", "almost-caught"],
    heat: "ruin",
    series: "malini",
  },
  "shhh-keep-quiet": {
    hook: "The erotic shelf was supposed to be research. The stacks had other plans.",
    desire: "A saree, a whisper, and the risk of a footstep between the shelves.",
    authorNote:
      "Read this the way you would hide a phone. The quiet is not decoration. It is the tension.",
    moods: ["quiet"],
    tropes: ["Library stacks", "Saree", "Almost caught"],
    kinks: ["quiet", "almost-caught", "being-seen"],
    heat: "ache",
    series: "malini",
  },
};

export function metaFor(slug: string): StoryMeta | undefined {
  return META[slug];
}

export function lengthBand(minutes: number): LengthBand {
  if (minutes <= 8) return "quick";
  if (minutes <= 12) return "linger";
  return "all-night";
}

export function heatLabel(heat: Heat): string {
  return HEATS[heat].label;
}

export function lengthLabel(band: LengthBand): string {
  return LENGTHS[band].label;
}

export function kinkLabel(id: string): string {
  return KINKS.find((kink) => kink.id === id)?.label ?? id;
}

export function cravingById(id: string): CravingDef | undefined {
  return CRAVINGS.find((craving) => craving.id === id);
}

export function threadById(id: string): ThreadDef | undefined {
  return THREADS.find((thread) => thread.id === id);
}

export interface ArchiveQuery {
  q?: string;
  mood?: string;
  heat?: string;
  length?: string;
  kink?: string;
}

export function filterCards(cards: StoryCardData[], query: ArchiveQuery): StoryCardData[] {
  const q = query.q?.trim().toLowerCase() ?? "";

  return cards.filter((card) => {
    if (query.mood && !card.moods.includes(query.mood)) return false;
    if (query.heat && card.heat !== query.heat) return false;
    if (query.length && card.length !== query.length) return false;
    if (query.kink && !card.kinks.includes(query.kink)) return false;
    if (!q) return true;

    const moodLabels = card.moods
      .map((id) => cravingById(id)?.label ?? "")
      .join(" ");
    const kinkLabels = card.kinks.map((id) => kinkLabel(id)).join(" ");
    const haystack = [
      card.title,
      card.subtitle,
      card.previewText,
      card.hook,
      card.desire,
      card.authorNote,
      ...card.tropes,
      moodLabels,
      kinkLabels,
      HEATS[card.heat].label,
      LENGTHS[card.length].label,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function relatedCards(
  cards: StoryCardData[],
  slug: string,
  limit = 3
): StoryCardData[] {
  const current = cards.find((card) => card.slug === slug);
  if (!current) return cards.filter((card) => card.slug !== slug).slice(0, limit);

  const follow = nextInThread(cards, slug);

  return cards
    .filter((card) => card.slug !== slug && card.slug !== follow?.card.slug)
    .map((card) => {
      const moods = card.moods.filter((mood) => current.moods.includes(mood)).length;
      const kinks = card.kinks.filter((kink) => current.kinks.includes(kink)).length;
      const tropes = card.tropes.filter((trope) => current.tropes.includes(trope)).length;
      const heat = card.heat === current.heat ? 1 : 0;
      const series = card.series && card.series === current.series ? 2 : 0;
      return { card, score: moods * 3 + kinks * 2 + tropes + heat + series };
    })
    .sort((a, b) => b.score - a.score || a.card.title.localeCompare(b.card.title))
    .slice(0, limit)
    .map((entry) => entry.card);
}

export function nextInThread(
  cards: StoryCardData[],
  slug: string
): { card: StoryCardData; loop: boolean; threadTitle: string } | null {
  for (const thread of THREADS) {
    const index = thread.order.indexOf(slug);
    if (index === -1) continue;
    const nextSlug = thread.order[index + 1] ?? thread.order[0];
    const card = cards.find((item) => item.slug === nextSlug);
    if (!card || card.slug === slug) return null;
    return {
      card,
      loop: index === thread.order.length - 1,
      threadTitle: thread.title,
    };
  }
  return null;
}

export function cardsByHeat(cards: StoryCardData[]) {
  return HEAT_ORDER.map((heat) => ({
    heat,
    label: HEATS[heat].label,
    hint: HEATS[heat].hint,
    cards: cards.filter((card) => card.heat === heat),
  })).filter((group) => group.cards.length > 0);
}
