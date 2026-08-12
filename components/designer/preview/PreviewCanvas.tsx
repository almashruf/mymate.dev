export default function PreviewCanvas() {
  return (
    <div className="relative mb-4">
      <div className="checkerboard flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-300">
        <div className="relative aspect-[3/2] w-1/2 border-2 border-black bg-[#4a4a4a]">
          <div className="absolute inset-3 border border-dashed border-white/25" />
        </div>
      </div>
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-600 px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
        Preview
      </span>
    </div>
  );
}