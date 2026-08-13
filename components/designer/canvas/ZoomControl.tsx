"use client";

import { Minus, Plus } from "lucide-react";

import { useDesigner } from "../state/designer-context";
import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from "../state/constants";

export default function ZoomControl() {
  const { state, setZoom, zoomBy } = useDesigner();
  const zoom = state.canvas.zoom;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-zinc-600">Zoom</span>
      <button
        type="button"
        onClick={() => zoomBy(-ZOOM_STEP)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="range"
        min={ZOOM_MIN}
        max={ZOOM_MAX}
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
        className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200"
        aria-label="Zoom level"
      />
      <button
        type="button"
        onClick={() => zoomBy(ZOOM_STEP)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}