export default function Page() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-display font-semibold text-[#8DC2D0]">
        Velvet Hours — Display Font (Cormorant Garamond)
      </h1>
      <p className="font-reading text-lg text-[#E6EEF0] leading-relaxed">
        Reading font test (Literata). What&apos;s inside is written for grown women who know what they want.
      </p>
      <p className="font-sans text-sm text-[#A0B0C0] uppercase tracking-[0.12em]">
        UI Font test (Inter) — Tonight&apos;s Pick • 8 min
      </p>
      <div className="flex gap-4 items-center">
        <button
          type="button"
          className="px-6 py-3 rounded-[14px] bg-[#4C87A5] hover:bg-[#5B97B5] text-[#0C1420] font-medium transition-all shadow-[0_0_20px_rgba(141,194,208,0.25)]"
        >
          Primary Button
        </button>
        <button
          type="button"
          className="px-6 py-3 rounded-[14px] border border-[#8DC2D0] text-[#8DC2D0] hover:bg-[#8DC2D0]/10 font-medium transition-all"
        >
          Ghost Button
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-6">
        <div className="p-4 rounded-[20px] bg-[#172235] border border-[rgba(141,194,208,0.14)]">
          <div className="text-xs text-[#A0B0C0]">Surface Token</div>
          <div className="text-sm font-semibold text-[#8DC2D0]">#172235</div>
        </div>
        <div className="p-4 rounded-[20px] bg-[#22334A] border border-[rgba(141,194,208,0.14)]">
          <div className="text-xs text-[#A0B0C0]">Card Token</div>
          <div className="text-sm font-semibold text-[#8DC2D0]">#22334A</div>
        </div>
        <div className="p-4 rounded-[20px] bg-[#0C1420] border border-[rgba(141,194,208,0.14)]">
          <div className="text-xs text-[#A0B0C0]">Base Token</div>
          <div className="text-sm font-semibold text-[#8DC2D0]">#0C1420</div>
        </div>
      </div>
    </main>
  );
}
