import { Minus, Plus } from "lucide-react";

export default function QuantitySelector() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center overflow-hidden rounded-lg border border-zinc-300 bg-white">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-zinc-600"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="flex h-9 w-10 items-center justify-center border-x border-zinc-300 text-sm font-semibold text-zinc-900">
          1
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-zinc-600"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}