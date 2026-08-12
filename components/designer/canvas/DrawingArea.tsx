import StaticCanvas from "./StaticCanvas";
import ZoomControl from "./ZoomControl";
import CanvasToolbar from "./CanvasToolbar";

export default function DrawingArea() {
  return (
    <section className="flex min-w-0 flex-1 flex-col">
      <div className="px-5 pb-3 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Drawing area
        </p>
      </div>

      <div className="relative mx-4 min-h-[420px] flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="flex h-full items-center justify-center px-20 py-12">
          <StaticCanvas />
        </div>
        <div className="absolute right-4 top-4 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500">
          No elements
        </div>
      </div>

      <div className="px-6 pt-4">
        <ZoomControl />
      </div>

      <div className="px-6 py-2.5 text-center text-[11px] font-medium text-zinc-400">
        600×400 px&nbsp;&nbsp;&nbsp;&nbsp;0 element(s)
      </div>

      <div className="px-6 pb-5 pt-2.5">
        <CanvasToolbar />
      </div>
    </section>
  );
}