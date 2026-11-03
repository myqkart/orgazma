# Architecture & Implementation Decisions

## Decision 1: Project Root Directory vs Subfolder
The user prompt notes "Everything must be built inside the existing Next.js project `my-app`". The current repository root `/Users/macbookair/.vsc/.srj/orgazma` already contains the Next.js 16 app with `package.json`, `app/`, `next.config.ts`, etc., with path alias `@/*` mapped to `./*`. Therefore, all directories (`app/`, `components/`, `lib/`, `data/`, `types/`) are placed directly at the project root rather than creating a nested folder or using `src/`.

## Decision 2: Tailwind v4 Theme Tokens
Tailwind v4 is in use with `@import "tailwindcss";` and `@theme`. We define color tokens:
- `--color-bg-base: #0C1420`
- `--color-surface: #172235`
- `--color-card: #22334A`
- `--color-primary: #4C87A5`
- `--color-primary-hover: #5B97B5`
- `--color-accent: #8DC2D0`
- `--color-text-main: #E6EEF0`
- `--color-muted: #A0B0C0`
- `--color-border-subtle: rgba(141, 194, 208, 0.14)`
- `--color-glow: rgba(141, 194, 208, 0.25)`
- `--color-overlay: rgba(12, 20, 32, 0.88)`
And font families:
- `--font-display: var(--font-cormorant), serif`
- `--font-reading: var(--font-literata), Georgia, serif`
- `--font-sans: var(--font-inter), system-ui, sans-serif`

## Decision 3: Server Component Footer & Prerender Stability
In Next.js 16 with cache components / static generation, evaluating `new Date()` inside client component render breaks static prerendering. Following the prompt guidance ("page.tsx, Hero, Footer and the Featured/Grid sections can be server components"), `Footer` is maintained as a server component with a deterministic year prop defaulting to 2026 and standard `#` anchor with smooth scrolling.

## Decision 4: Smooth Animation & Reduced Motion
Transitions are built with standard Tailwind/CSS transitions and keyframes, with `@media (prefers-reduced-motion: reduce)` disabling translate/scale while keeping gentle opacity transitions. This avoids unnecessary client bundle bloat and provides instant, glitch-free rendering.

## Decision 5: ReadingModal React 19 State & Slug Hash Synchronization
In React 19 / ESLint 9, calling `setState` synchronously within `useEffect` is prohibited. To eliminate cascading renders, `ReadingModal` initializes user font size preferences using a safe lazy initializer, keys the modal by `story.slug` for auto-resetting scroll state, and derives closing lines deterministically from the story slug. URL hash state (`#story=slug`) is bidirectionally synced with browser history (`pushState`, `popstate`, `hashchange`) for full Back/Forward button and deep-link support.
