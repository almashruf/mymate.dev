"use client";

import { useDesigner } from "../state/designer-context";
import { contentPixelHeight, contentPixelWidth } from "../state/model";
import DesignCanvas from "./DesignCanvas";
import ZoomControl from "./ZoomControl";
import CanvasToolbar from "./CanvasToolbar";

export default function DrawingArea() {
  const { state } = useDesigner();
  const { product, canvas } = state;
  const pixelWidth = contentPixelWidth(product.width);
  const pixelHeight = contentPixelHeight(product.height);

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="px-5 pb-3 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Drawing area
        </p>
      </div>

      <div className="relative mx-5 min-h-[420px] flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <DesignCanvas />
        {canvas.elements.length === 0 && (
          <div className="pointer-events-none absolute right-4 top-4 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500">
            No elements
          </div>
        )}
      </div>

      <div className="px-5 pt-4">
        <ZoomControl />
      </div>

      <div className="px-5 py-2.5 text-center text-[11px] font-medium text-zinc-400">
        {pixelWidth}×{pixelHeight} px&nbsp;&nbsp;&nbsp;&nbsp;
        {canvas.elements.length} element(s)
      </div>

      <div className="px-5 pb-5 pt-2.5">
        <CanvasToolbar />
      </div>
    </section>
  );
}