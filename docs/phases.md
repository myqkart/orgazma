# phases.md — Build Plan (Next.js App Router, inside `my-app`)

All work happens inside the existing `my-app` project created with `create-next-app`. Read `docs/design.md`, `docs/sections.md`, `docs/pages.md` and `docs/content.md` for details. This file says what to build, and when. Where those docs mention Vite or a router, follow the Next.js approach here instead.

Paths below assume no `src/` folder. If the project has one, put everything under `src/`.

---

## Phase 1 — Theme, Fonts & Cleanup
**Build:**
- Remove default boilerplate from `app/page.tsx`, `app/globals.css`, and unused files in `public/`
- Color tokens from design.md (Tailwind v4: `@theme` in `app/globals.css`; v3: `tailwind.config`)
- Fonts through `next/font/google` in `app/layout.tsx` (Cormorant Garamond, Literata, Inter) as CSS variables mapped to Tailwind font families
- Global styles: body background `#0C1420`, text `#E6EEF0`, grain overlay, focus ring, smooth scroll, reduced-motion rules
- `metadata` in `layout.tsx`: title, description, adult rating tags
- `next.config.ts`: `images.remotePatterns` for `images.unsplash.com`

**Done when:** a temporary test page shows correct colors, three fonts, and primary/ghost buttons; no console errors.

---

## Phase 2 — Data Layer
**Build:**
- `data/stories.json` with 6 placeholder stories in the exact schema (one featured)
- `types/story.ts` with `Story` (raw) and `StoryWithSlug`
- `lib/stories.ts`: validate items, fill defaults, derive unique slugs from titles (`-2`, `-3` on collision), `getAllStories()`, `getFeatured()`, `getBySlug()`

**Done when:** a server component prints 6 stories with unique slugs and exactly one featured story (check in terminal/browser, then remove the debug output).

---

## Phase 3 — Shared Components
**Build (`components/`):** `Button` (primary/ghost), `Pill`, `Container`, `StoryCard` (default + featured variants, uses `next/image`, gradient overlay, hover lift), `LoadingState`, `EmptyState`, `ErrorState`, image-failed placeholder.

**Done when:** a preview page shows all components with placeholder data and hover/focus states match design.md. Run `npm run lint`.

---

## Phase 4 — Navigation, Hero & Footer
**Build:**
- `Navigation` (client): transparent then blurred Surface on scroll, anchor links, mobile menu
- `Hero` with glow, line-by-line fade-in, CTAs and scroll cue from content.md
- `Footer` with adult notice
- Assemble in `app/page.tsx`

**Done when:** page flows Navigation, Hero, Footer; anchors scroll smoothly; mobile menu works.

---

## Phase 5 — Featured & Stories Grid
**Build:**
- `FeaturedStory` (hidden when none), anchor `#pick`
- `StoriesGrid` (3/2/1 columns), anchor `#collection`
- Staggered fade-up on scroll, optional client-side search with "no results" state
- Cards accept an `onOpen(slug)` prop (not wired yet)

**Done when:** featured story appears once at the top; grid shows all stories; search filters on title, subtitle and preview.

---

## Phase 6 — Reading Modal
**Build:**
- Client `StoryReader` wrapper that owns `activeSlug` state and renders the grid, featured section and modal together
- `ReadingModal`: backdrop blur, banner, title, subtitle, read time, paragraphs as plain text (`***` becomes a divider), sticky top bar (close, A−/A+), progress line, body scroll lock, Esc/backdrop close, focus trap, focus returns to the card, ending block with rotating closing line and two buttons
- URL hash sync (`#story=slug`) including Back button and opening from a direct link

**Done when:** every story opens and closes by click, Esc and Back; hash links open the right story; long text scrolls inside the modal. Run `npm run lint` and `npm run build`.

---

## Phase 7 — Age Gate & Persistence
**Build:**
- `AgeGate` (client) with `mounted` check to avoid hydration flash; content stays hidden until accepted; decline redirects to a neutral URL
- `localStorage` keys: `ageOk`, `fontSize`, `pos:{slug}`; resume-reading toast ("Pick up where you left off?")
- All `localStorage`/`window` access only inside effects or handlers

**Done when:** gate shows on first visit only, direct story links still hit the gate first and then open the story, font size and reading position persist across reloads, no hydration warnings.

---

## Phase 8 — Polish & Accessibility
**Build:** motion pass with `prefers-reduced-motion`, responsive checks at 360 / 768 / 1024 / 1440, keyboard navigation, dialog ARIA, contrast fixes, page title and description, delete unused files and dependencies.

**Done when:** keyboard-only use works end to end, `npm run lint` and `npm run build` pass with no warnings, mobile layout is clean.

---

## Phase 9 — My Real Stories (run later, separately)
**Prompt:** "Replace `data/stories.json` with the attached file without changing the schema. Check for missing fields, duplicate titles, very long paragraphs, and broken image URLs (add new domains to `remotePatterns` if needed). Report what you find."

## Phase 10 — Deploy (run later, separately)
**Prompt:** "Prepare `my-app` for Vercel. Confirm `npm run build` passes, add anything required, and give me step-by-step deploy instructions. Optional: set the site to `noindex` via `metadata.robots` if I want it unlisted."

---

## Tips
- Commit after every phase so you can roll back.
- If a phase is too large, split it and run the parts as separate prompts.
- If Antigravity drifts, paste the relevant section of the docs back into the prompt.