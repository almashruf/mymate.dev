"use client";

import { useDesigner } from "../state/designer-context";

export default function PreviewCanvas() {
  const { state } = useDesigner();
  const { baseColor, edge, form, width, height } = state.product;
  const hasBorder = edge === "with-border";
  const borderRadius = form === "around" ? 12 : 0;

  return (
    <div className="relative mb-4">
      <div className="checkerboard flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-300">
        <div
          className="relative w-1/2"
          style={{
            aspectRatio: `${width} / ${height}`,
            backgroundColor: baseColor,
            border: hasBorder ? "2px solid #000" : "none",
            borderRadius,
          }}
        >
          <div className="absolute inset-3 border border-dashed border-white/25" />
        </div>
      </div>
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
        Preview
      </span>
    </div>
  );
}