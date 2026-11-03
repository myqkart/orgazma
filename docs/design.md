# design.md — Design System

A private, luxurious, dark-blue home for erotic fiction written for adult women. It should feel like a locked door, low lights and a held breath: quiet, unhurried, intimate. The interface teases; the stories deliver.

## 1. Stack
- Vite + React + TypeScript, Tailwind CSS, Framer Motion (optional, light use)
- Single page. Stories load from a local `stories.json`. No backend.

## 2. Color Tokens (exact)

| Role | Hex | Use |
|---|---|---|
| Background | `#0C1420` | Page base |
| Surface | `#172235` | Header, modal panel, footer, age gate card |
| Card | `#22334A` | Story cards, featured panel |
| Primary | `#4C87A5` | Buttons, progress bar, active states |
| Accent | `#8DC2D0` | Links, highlights, hover glow, focus ring, italic emphasis |
| Text | `#E6EEF0` | Main text |
| Muted | `#A0B0C0` | Subtitles, metadata, captions |

Derived (same family only):
- Border: `rgba(141,194,208,0.14)`
- Glow: `rgba(141,194,208,0.25)` (hover shadow around cards/buttons)
- Overlay: `rgba(12,20,32,0.88)` with 12px backdrop blur
- Primary hover: `#5B97B5`

Rules: never use Primary as small text on Background (low contrast); use Accent. Button text on Primary is `#0C1420` or `#E6EEF0`, whichever passes 4.5:1. No pure black/white.

## 3. Typography
- **Display (titles, hero, story titles):** Cormorant Garamond, 500–600, italic for taglines. Soft, romantic, high-fashion.
- **Reading body:** Literata 400, 19px default, line-height 1.9, max 62ch.
- **UI:** Inter 400/500, 13–14px, uppercase labels with 0.12em tracking.
- Hero title 64px desktop / 40px mobile. Section titles 36px. Card titles 26px.

## 4. Atmosphere
- Dark, warm-in-feel despite cool palette: use soft radial glows of Accent at 8–12% opacity behind hero and featured story, like candlelight on water.
- Fine grain/noise overlay at 3% opacity on Background for a tactile feel.
- Generous negative space; nothing crowded, nothing loud.
- Imagery: story `imageUrl` shown with a deep blue gradient overlay (`#0C1420` bottom to transparent), slightly desaturated, so photos feel moody and cohesive. Faces/bodies are never required; atmospheric imagery is preferred.

## 5. Layout & Spacing
- 8px base unit. Max width 1200px. Section padding 96px desktop / 56px mobile.
- Radius: 20px cards, 14px buttons, 999px pills. Modal radius 24px on desktop, full-screen on mobile.
- Borders hairline using Border token; soft shadows `0 20px 50px rgba(0,0,0,0.45)`.

## 6. Components
- **Story Card:** Card background, 3:4 image on top with gradient overlay, read-time pill top-right, title (display), subtitle (italic, muted), preview text clamped to 3 lines, "keep reading" link with arrow. Hover: lift 6px, Glow shadow, image scales 1.04, arrow slides right.
- **Featured Panel:** Wide split layout, large image left with glow, text right. "Featured" label in Accent with a thin line.
- **Buttons:** Primary = filled `#4C87A5`, 14px radius, subtle inner highlight; hover brightens and adds Glow. Ghost = 1px Accent border, Accent text.
- **Pills:** read time, "Featured", with Surface background and Accent text.
- **Focus ring:** 2px Accent, 3px offset.

## 7. Motion
- 250–400ms ease-out. Fade-up on scroll for cards (staggered 60ms).
- Hero: slow pulsing glow (8s loop), headline fades in line by line.
- Modal: backdrop fades, panel rises 24px and fades in.
- Respect `prefers-reduced-motion`: disable translate/scale/pulse, keep opacity.

## 8. Age Gate
Full-screen, Background with centered Surface card, soft glow behind. Two choices only. Saved in `localStorage` (`ageOk=1`). Blocks scroll and all content until accepted. Also add `<meta name="rating" content="adult">` and `<meta name="rating" content="RTA-5042-1996-1400-1577-RTA">`.

## 9. Reading Modal (the heart of the site)
- Opens over the grid with blurred backdrop; Surface panel, 720px wide, content column 62ch.
- Sticky top bar: close (X), title (truncated), font size A− / A+, thin Primary progress line.
- Header inside: image banner with gradient, title, subtitle, read time.
- Body: each `content[]` item is one paragraph; paragraphs equal to `***` render as a centered divider of three small Accent dots.
- Closes on X, Esc, or backdrop click. Locks page scroll while open. Returns focus to the card that opened it.
- Ending block with a closing line and two buttons (see content.md).

## 10. Responsive & Accessibility
- Grid: 3 columns / 2 / 1 at 1024 / 640 breakpoints. Modal full-screen on mobile.
- Body text contrast 4.5:1 minimum; modal is a proper `dialog` with `aria-modal`, focus trap, labelled by the story title.
- Font size preference saved to localStorage.
- No third-party trackers, no cookies beyond the age flag and reading preferences.