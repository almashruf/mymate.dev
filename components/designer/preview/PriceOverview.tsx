"use client";

import { useDesigner } from "../state/designer-context";
import { formatEuro } from "../state/model";
import { VAT_RATE_LABEL } from "../state/constants";

export default function PriceOverview() {
  const { state } = useDesigner();
  const { pricing } = state;
  const quantity = state.product.quantity;

  const rows = [
    { label: "Net price (unit)", value: formatEuro(pricing.unitPrice) },
    { label: `Subtotal (${quantity}x)`, value: formatEuro(pricing.subtotal) },
    { label: `VAT (${VAT_RATE_LABEL})`, value: formatEuro(pricing.vat) },
  ];

  return (
    <section className="px-5 pb-5 pt-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        Price overview
      </h3>

      <div className="mt-3 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="space-y-1.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-zinc-500">{row.label}</span>
              <span className="font-medium tabular-nums text-zinc-800">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3">
          <span className="text-sm font-semibold text-zinc-900">
            Total including VAT,
          </span>
          <span className="text-sm font-semibold tabular-nums text-zinc-900">
            {formatEuro(pricing.total)}
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">plus shipping.</p>
      </div>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white"
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-lg border border-zinc-300 bg-white text-sm font-medium text-zinc-700"
        >
          Download PNG-8
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
        Price example — true pricing logic is not yet integrated here.
      </p>
    </section>
  );
}