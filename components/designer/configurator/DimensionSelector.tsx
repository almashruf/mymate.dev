import { ChevronDown } from "lucide-react";

type Dimension = {
  label: string;
  value: string;
  min: number;
  max: number;
};

function DimensionField({ label, value, min, max }: Dimension) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
        {label}
      </label>
      <div className="flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-300 bg-white px-3">
        <span className="text-sm font-medium text-zinc-800">{value}</span>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </div>
      <p className="mt-1.5 text-[11px] text-zinc-400">
        Min.: {min} cm. | Max.: {max} cm.
      </p>
    </div>
  );
}

export default function DimensionSelector() {
  const dimensions: Dimension[] = [
    { label: "Width (cm):", value: "60", min: 40, max: 200 },
    { label: "Height (cm):", value: "40", min: 40, max: 500 },
  ];

  return (
    <div className="space-y-4">
      {dimensions.map((dimension) => (
        <DimensionField key={dimension.label} {...dimension} />
      ))}
    </div>
  );
}