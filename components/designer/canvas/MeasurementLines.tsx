import type { DesignerProduct } from "../state/types";

type Props = {
  product: DesignerProduct;
  width: number;
  height: number;
};

export default function MeasurementLines({ product, width, height }: Props) {
  return (
    <>
      <div
        className="pointer-events-none absolute -top-8 left-0 right-0 h-6"
        style={{ width }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-green-500" />
        <div className="absolute left-0 top-1/2 h-2 w-[2px] -translate-y-1/2 bg-green-500" />
        <div className="absolute right-0 top-1/2 h-2 w-[2px] -translate-y-1/2 bg-green-500" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-green-500">
          {product.width.toFixed(2)} cm
        </span>
      </div>

      <div
        className="pointer-events-none absolute -left-14 top-0 bottom-0 w-12"
        style={{ height }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-green-500" />
        <div className="absolute right-[-3px] top-0 h-[2px] w-2 bg-green-500" />
        <div className="absolute right-[-3px] bottom-0 h-[2px] w-2 bg-green-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-green-500">
            {product.height.toFixed(2)} cm
          </span>
        </div>
      </div>
    </>
  );
}