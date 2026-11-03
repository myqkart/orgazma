# Architecture & Implementation Decisions

## Decision 1: Project Root Directory vs Subfolder
The user prompt notes "Everything must be built inside the existing Next.js project `my-app`". The current repository root `/Users/macbookair/.vsc/.srj/orgazma` already contains the Next.js 16 app with `package.json`, `app/`, `next.config.ts`, etc., with path alias `@/*` mapped to `./*`. Therefore, all directories (`app/`, `components/`, `lib/`, `data/`, `types/`) are placed directly at the project root rather than creating a nested folder or using `src/`.

## Decision 2: Tailwind v4 Theme Tokens & Refined Typography
Tailwind v4 is in use with `@import "tailwindcss";` and `@theme`.
Colors:
- `--color-background: #0E080D` (deep plum-black base)
- `--color-surface: #1C101A` (dark berry surface)
- `--color-card: #291626` (elevated wine card)
- `--color-primary: #702442` (rich burgundy primary)
- `--color-primary-hover: #862F52` (brightened wine hover)
- `--color-accent: #C66B91` (rose / mauve highlight)
- `--color-text-main: #F8EDF2` (soft pinkish-white main text)
- `--color-foreground: #F8EDF2`
- `--color-muted: #BFA5B1` (muted rose-gray captions & metadata)
- `--color-border-subtle: rgba(198, 107, 145, 0.16)`
- `--color-glow: rgba(198, 107, 145, 0.25)`
- `--color-overlay: rgba(14, 8, 13, 0.88)`

Typography:
Replaced the high-contrast, razor-thin Cormorant Garamond and idiosyncratic Literata pairing with a much cleaner, dignified, and highly legible combination:
- **Display**: **Playfair Display** (`--font-playfair`) for headlines and story titles — sturdy, stately, and balanced.
- **Reading Body**: **Lora** (`--font-lora`) for all prose and story reading — renowned for superior screen legibility and relaxed optical rhythm.
- **UI & Subtitles**: **Inter** (`--font-inter`) for modern, crisp UI controls and clean metadata tags.

## Decision 3: Server Component Footer & Prerender Stability
In Next.js 16 with cache components / static generation, evaluating `new Date()` inside client component render breaks static prerendering. Following the prompt guidance ("page.tsx, Hero, Footer and the Featured/Grid sections can be server components"), `Footer` is maintained as a server component with a deterministic year prop defaulting to 2026 and standard `#` anchor with smooth scrolling.

## Decision 4: Smooth Animation & Reduced Motion
Transitions are built with standard Tailwind/CSS transitions and keyframes, with `@media (prefers-reduced-motion: reduce)` disabling translate/scale while keeping gentle opacity transitions. This avoids unnecessary client bundle bloat and provides instant, glitch-free rendering.

## Decision 5: ReadingModal React 19 State & Slug Hash Synchronization
In React 19 / ESLint 9, calling `setState` synchronously within `useEffect` is prohibited. To eliminate cascading renders, `ReadingModal` initializes user font size preferences using a safe lazy initializer, keys the modal by `story.slug` for auto-resetting scroll state, and derives closing lines deterministically from the story slug. URL hash state (`#story=slug`) is bidirectionally synced with browser history (`pushState`, `popstate`, `hashchange`) for full Back/Forward button and deep-link support.

## Decision 6: AgeGate Hydration-Safe External Store & Persistence
`AgeGate` uses React's `useSyncExternalStore` and deferred mounting to synchronize with `localStorage.getItem("ageOk")` without any hydration flash or SSR mismatches. Reading position `pos:{slug}` and font size preferences are stored and recalled safely on client interactions, showing a polite "Pick up where you left off?" toast upon revisiting an in-progress story.
