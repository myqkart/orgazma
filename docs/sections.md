# sections.md: Sections

Each section is a React component. Copy shown here is the default; the full bank is in content.md. Colors and type come from design.md.

---

## 1. AgeGate
**Purpose:** confirm adult readers before anything loads.
**Layout:** full-screen overlay, Surface card centered (max 480px), soft Accent glow behind.
**Copy:**
- Eyebrow: "Adults only"
- Headline: "Close the door behind you."
- Subtext: "What's inside is written for grown women who know what they want. You must be 18 or older to enter."
- Primary button: "I'm 18+. Let me in."
- Ghost button: "Not tonight"
- Fine print: "By entering you confirm you're an adult and that you're choosing to read adult fiction."

## 2. Navigation
**Layout:** sticky top bar, transparent over hero then Surface with blur after scroll. Left: wordmark. Right: anchor links **Tonight's Pick**, **The Collection**, and a small "18+" pill.
**Copy:** Wordmark = site name (placeholder: "Velvet Hours"). Links: "Tonight's Pick", "The Collection".
**Behavior:** smooth scroll to anchors; hamburger on mobile.

## 3. Hero
**Purpose:** set the mood in one breath.
**Layout:** full viewport height, centered text, radial Accent glow, grain overlay, scroll cue at bottom.
**Copy:**
- Headline: "Read what you'd never say out loud."
- Tagline (italic): "Slow burns, hungry mornings and the kind of heat that follows you into the day."
- Primary CTA: "Start with tonight's pick"
- Ghost CTA: "Browse every story"
- Scroll cue: "Go on. Lower."

## 4. Featured Story
**Purpose:** spotlight the story where `isFeatured: true` (first one wins if several).
**Layout:** wide Card panel, image left (glowing edge), text right.
**Content from JSON:** `imageUrl`, `title`, `subtitle`, `previewText`, `readTimeMinutes`.
**Copy:**
- Label: "Tonight's pick"
- Pill: "{n} min of your own time"
- CTA: "Read it now" (opens modal)
- Secondary line under CTA: "Best read alone, door closed."
**Empty state:** section hidden if no featured story.

## 5. Stories Grid ("The Collection")
**Purpose:** browse everything.
**Layout:** section title + intro line + responsive grid (3/2/1) of Story Cards. Newest at top, in JSON order.
**Copy:**
- Title: "The Collection"
- Intro: "Pick the mood you're in. Every story is a door."
- Card CTA: "Keep reading →"
- Card pill: "{n} min"
**Behavior:** clicking a card opens the Reading Modal. Cards fade up in sequence on scroll.
**Optional:** small search field, placeholder "Search for a mood, a name, a morning…".

## 6. Reading Modal
**Purpose:** distraction-free reading without leaving the page.
**Layout:** see design.md section 9.
**Copy:**
- Top bar tooltip labels: "Smaller", "Larger", "Close"
- Banner meta: "{n} min read"
- Scene break: three dots, no text
- Ending line (italic, centered): "You can breathe now. Or not."
- Ending buttons: "Another story" (closes modal and scrolls to grid) and "Back to the top"

## 7. Footer
**Layout:** Surface background, centered, minimal.
**Copy:**
- Line 1: wordmark
- Line 2: "Written for grown women who like their fiction unhurried."
- Line 3 (small, muted): "Adult content. All characters are 18 or older. Not for minors."
- Line 4: "© {year} {author name}"
- Link: "Back to top ↑"

## 8. System States
- **Loading:** three Accent dots pulsing, text "Setting the mood…"
- **Empty (no stories):** "Nothing here yet. Something good is coming." with a ghost button "Check back soon".
- **Error (JSON fails):** "The lights flickered. Try again in a moment." with a "Reload" button.
- **Image failed:** show a Surface-to-Card gradient placeholder with a small Accent flame/moon icon.