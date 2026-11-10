# pages.md: Page Structure & User Flow

## Structure
One page (`/`) plus a modal. No router needed. Deep-linking to a story is supported through the URL hash (`/#story=around-6-00-am`).

Order of the page, top to bottom:
1. AgeGate (overlay, first visit only)
2. Navigation
3. Hero
4. Featured Story (`#pick`)
5. Stories Grid (`#collection`)
6. Footer
7. Reading Modal (overlay, on demand)

## Data Loading
- Stories live in `src/data/stories.json` as an array of objects:

```json
{
  "title": "Around 6:00 AM",
  "subtitle": "Morning dream always comes true",
  "previewText": "With each forward movement, Ayaan lifted her upper leg, exposing...",
  "imageUrl": "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  "readTimeMinutes": 8,
  "isFeatured": true,
  "content": ["...", "...", "..."]
}
```

- On mount, import the JSON, validate each item (title and content required; defaults for the rest), and derive a `slug` from the title (lowercase, non-alphanumerics to `-`). If two slugs collide, append `-2`, `-3`.
- Show the Loading state until the data is ready (near-instant for local JSON, but keep the state for later remote loading).
- Keep everything in a single `stories` array in React state/context.

## Featured Logic
- Featured story = first item with `isFeatured === true`.
- It appears in the Featured section. It also remains in the grid (marked with a small "Tonight's pick" pill) so the collection is complete.
- If none is featured, hide the Featured section and the matching nav link.

## Grid Logic
- Render all stories in JSON order. Responsive columns 3 / 2 / 1.
- Optional search: filters client-side on `title`, `subtitle` and `previewText` (case-insensitive). No results state: "Nothing like that yet. Try another mood."
- Each card is a `button` (or link) with `aria-haspopup="dialog"`.

## Opening a Story
1. User clicks a card or the featured CTA.
2. App sets `activeSlug`, updates the URL hash, locks body scroll, and mounts the Reading Modal.
3. Modal renders banner, title, subtitle, read time, then each `content` item as a paragraph (`***` becomes a scene divider). Text is rendered as plain text, never as raw HTML.
4. Progress line tracks scroll inside the modal.
5. Reading position is saved per slug in localStorage; on reopening, show a small toast "Pick up where you left off?" with **Continue** / **From the start**.

## Closing a Story
- Close via X, Esc, or backdrop click; hash is cleared, scroll unlocks, focus returns to the originating card.
- Ending block offers "Another story" (closes and scrolls to the grid) and "Back to the top".
- Browser Back button also closes the modal (hash change listener).

## First Visit Flow
Land → AgeGate → (accept) Hero fades in → scroll to Featured → open story. If the user arrives via a story hash, the AgeGate still shows first; after accepting, the modal opens.
If they decline: redirect to a neutral page (config value, default `https://www.google.com`).

## Additional States
- **Loading, Empty, Error, Image failed:** see sections.md section 8.
- **Unknown hash slug:** ignore silently and show the normal page.
- **Offline:** page still works since data is bundled.

## Persistence (localStorage keys)
- `ageOk`: age confirmation
- `fontSize`: reading size preference
- `pos:{slug}`: saved scroll position per story

## Updating Stories
Edit `stories.json`, add or reorder objects, set `isFeatured: true` on the one to spotlight, rebuild and redeploy. No other code changes needed.