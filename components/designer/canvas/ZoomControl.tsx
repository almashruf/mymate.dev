import { Minus, Plus } from "lucide-react";

export default function ZoomControl() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-zinc-600">Zoom</span>
      <button
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200"
        aria-label="Zoom level"
      />
      <button
        type="button"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}