import PreviewCanvas from "./PreviewCanvas";
import PriceOverview from "./PriceOverview";

export default function PreviewPanel() {
  return (
    <aside className="w-[320px] shrink-0 overflow-y-auto border-l border-zinc-200 bg-white">
      <div className="px-5 pb-3 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Preview
        </p>
      </div>
      <div className="px-5">
        <PreviewCanvas />
      </div>
      <PriceOverview />
    </aside>
  );
}