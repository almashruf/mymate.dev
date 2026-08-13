"use client";

import { ChevronDown } from "lucide-react";

import { useDesigner } from "../state/designer-context";
import {
  DIMENSION_STEP,
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
} from "../state/constants";

function buildOptions(min: number, max: number): number[] {
  const values: number[] = [];
  for (let value = min; value <= max; value += DIMENSION_STEP) {
    values.push(value);
  }
  return values;
}

type DimensionFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function DimensionField({
  label,
  value,
  min,
  max,
  onChange,
}: DimensionFieldProps) {
  const options = buildOptions(min, max);
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-600">
        {label}
      </label>
      <div className="relative flex h-9 w-full items-center rounded-lg border border-zinc-300 bg-white">
        <select
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-full w-full cursor-pointer appearance-none bg-transparent px-3 pr-8 text-sm font-medium text-zinc-800 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-zinc-400" />
      </div>
      <p className="mt-1.5 text-[11px] text-zinc-400">
        Min.: {min} cm. | Max.: {max} cm.
      </p>
    </div>
  );
}

export default function DimensionSelector() {
  const { state, setDimension } = useDesigner();

  return (
    <div className="space-y-4">
      <DimensionField
        label="Width (cm):"
        value={state.product.width}
        min={MIN_WIDTH}
        max={MAX_WIDTH}
        onChange={(value) => setDimension("width", value)}
      />
      <DimensionField
        label="Height (cm):"
        value={state.product.height}
        min={MIN_HEIGHT}
        max={MAX_HEIGHT}
        onChange={(value) => setDimension("height", value)}
      />
    </div>
  );
}