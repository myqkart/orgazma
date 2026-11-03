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

## Decision 3: Lucide Icons
`lucide-react` is already installed in `node_modules` (as seen in npm install). We use lightweight SVG icons (`X`, `Menu`, `ArrowRight`, `Minus`, `Plus`, `Moon`, `Flame`) from `lucide-react` or clean inline SVG components matching exact design requirements.

## Decision 4: Smooth Animation & Reduced Motion
Transitions are built with standard Tailwind/CSS transitions and keyframes, with `@media (prefers-reduced-motion: reduce)` disabling translate/scale while keeping gentle opacity transitions. This avoids unnecessary client bundle bloat and provides instant, glitch-free rendering.
