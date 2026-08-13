"use client";

import { useState } from "react";

import { useDesigner } from "../state/designer-context";
import { COLOR_PRESETS } from "../state/constants";

export default function ColorSelector() {
  const { state, setBaseColor } = useDesigner();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-lg border border-zinc-300 bg-white p-3">
        <div
          className="h-10 w-10 shrink-0 rounded-md border border-zinc-300"
          style={{ backgroundColor: state.product.baseColor }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            base color
          </p>
          <p className="text-sm font-semibold text-zinc-800">
            {state.product.baseColor.toUpperCase()}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-bold text-white"
        >
          change
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-10 mt-2 rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((color) => (
              <button
                type="button"
                key={color}
                aria-label={color.toUpperCase()}
                onClick={() => {
                  setBaseColor(color);
                  setOpen(false);
                }}
                className={
                  color === state.product.baseColor
                    ? "h-7 w-7 rounded-md border border-zinc-300 ring-2 ring-green-500"
                    : "h-7 w-7 rounded-md border border-zinc-300"
                }
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}