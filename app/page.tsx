import { getAllStories, getFeatured } from "@/lib/stories";

export default function Page() {
  const stories = getAllStories();
  const featured = getFeatured();

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-display text-[#8DC2D0]">Phase 2 Test Output</h1>
      <p className="text-[#A0B0C0]">
        Total stories loaded: <strong className="text-[#E6EEF0]">{stories.length}</strong>
      </p>
      <p className="text-[#A0B0C0]">
        Featured story slug: <strong className="text-[#8DC2D0]">{featured?.slug}</strong> (&ldquo;{featured?.title}&rdquo;)
      </p>
      <ul className="space-y-2 border-t border-[rgba(141,194,208,0.14)] pt-4">
        {stories.map((s) => (
          <li key={s.slug} className="text-sm font-sans flex justify-between py-1 border-b border-[rgba(141,194,208,0.1)]">
            <span className="text-[#E6EEF0]">{s.title}</span>
            <span className="text-[#8DC2D0]">slug: {s.slug} | {s.readTimeMinutes} min | featured: {String(s.isFeatured)}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
