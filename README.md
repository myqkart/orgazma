# Velvet Hours — Adult Fiction for Women

A private, luxurious, single-page web experience for adult women's erotic fiction. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Google Fonts (Cormorant Garamond, Literata, Inter).

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the site.

### 3. Build & Lint for Production
```bash
npm run lint
npm run build
```

---

## How to Manage Stories

All fiction lives inside [`data/stories.json`](file:///Users/macbookair/.vsc/.srj/orgazma/data/stories.json). No backend, API routes, or databases are required.

### Story Schema

Each story in the array follows this exact schema:

```json
{
  "title": "Around 6:00 AM",
  "subtitle": "Morning dream always comes true",
  "previewText": "The early light barely filtered through the linen blinds when the quiet warmth of waking skin settled the room into stillness.",
  "imageUrl": "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80",
  "readTimeMinutes": 8,
  "isFeatured": true,
  "content": [
    "The early light barely filtered through the linen blinds when the quiet warmth of waking skin settled the room into stillness.",
    "There is a rhythm to the morning before the street below stirs to life.",
    "***",
    "Vihaan's hand moved with unhurried certainty, fingertips brushing along the contour of her waist.",
    "A soft intake of breath was the only response needed."
  ]
}
```

### Formatting Rules & Best Practices
1. **Paragraphs**: Each item in the `content` array is rendered as a clean, styled paragraph in Literata with comfortable line height (`max-w-[62ch]`).
2. **Scene Breaks**: To create an elegant centered three-dot scene break, add `"***"` as an isolated entry in the `content` array.
3. **Safety**: Text is rendered as plain text, never raw HTML.
4. **Slugs**: Slugs are generated automatically from the `title` (e.g. `Around 6:00 AM` becomes `#story=around-6-00-am`). Collisions automatically resolve to `-2`, `-3`.

---

## How to Spotlight a Featured Story

- Set `"isFeatured": true` on the story object you wish to highlight as **Tonight's Pick**.
- If multiple stories have `isFeatured: true`, the first one in the array wins.
- The featured story will appear prominently in the **Tonight's Pick** section at the top of the page while remaining in **The Collection** grid with a `Tonight's pick` pill.
- If no story has `isFeatured: true`, the Featured section and its matching anchor link in the navigation are automatically hidden.

---

## Images & Remote Domains

Stories currently use images from `images.unsplash.com` and `images.pexels.com`. If you use images from additional domains, add them to `images.remotePatterns` in [`next.config.ts`](file:///Users/macbookair/.vsc/.srj/orgazma/next.config.ts):

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "images.pexels.com" },
    { protocol: "https", hostname: "your-image-domain.com" },
  ],
}
```

If an image fails to load or the network blocks it, a styled dark Surface-to-Card placeholder with a subtle crescent moon icon renders automatically.

---

## How to Deploy to Vercel

1. **Push to Git**:
   Push your changes to your GitHub, GitLab, or Bitbucket repository:
   ```bash
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your repository (`orgazma`).
   - Framework preset will automatically detect **Next.js**.
   - Build command: `npm run build` (or `next build`).
   - Output directory: `.next`.
3. **Deploy**:
   - Click **Deploy**. Vercel will build and deploy the application to a high-speed Edge global CDN.
4. **Optional: Unlist / Noindex**:
   - If you want the site unlisted from search engines, add `robots: { index: false, follow: false }` to `metadata` in [`app/layout.tsx`](file:///Users/macbookair/.vsc/.srj/orgazma/app/layout.tsx).

---

## Architecture & Storage Keys

- `ageOk`: Boolean flag (`"1"`) confirming reader is 18+. Stored in `localStorage`.
- `fontSize`: Reading size index (`0` for 17px, `1` for 19px default, `2` for 22px).
- `pos:{slug}`: Reading scroll position for each story. Shows a resume toast upon return.
