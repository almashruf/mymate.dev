export default function ColorSelector() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-300 bg-white p-3">
      <div className="h-10 w-10 shrink-0 rounded-md border border-zinc-300 bg-[#4a4a4a]" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          base color
        </p>
        <p className="text-sm font-semibold text-zinc-800">#4A4A4A</p>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-bold text-white"
      >
        change
      </button>
    </div>
  );
}