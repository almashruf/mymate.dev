"use client";

import { Info } from "lucide-react";

import SectionTitle from "./SectionTitle";
import ColorSelector from "./ColorSelector";
import OptionGroup from "./OptionGroup";
import DimensionSelector from "./DimensionSelector";
import QuantitySelector from "./QuantitySelector";
import { useDesigner } from "../state/designer-context";
import {
  EDGE_OPTIONS,
  FLAME_RETARDANT_OPTIONS,
  FORMAT_OPTIONS,
  FORM_OPTIONS,
} from "../state/constants";

export default function Configurator() {
  const { state, setEdge, setFlameRetardant, setForm, setFormat } =
    useDesigner();
  const { product } = state;

  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="border-b border-zinc-100 px-5 pb-4 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Configurator
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
          Color palette vectorizer
        </h1>
      </div>
      <div className="scrollbar-none min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pb-5 pt-4">
        <section className="space-y-2.5">
          <SectionTitle>Base color</SectionTitle>
          <ColorSelector />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Edge</SectionTitle>
          <OptionGroup
            activeValue={product.edge}
            options={EDGE_OPTIONS}
            onSelect={setEdge}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>
            Flame-retardant
            <Info className="h-3 w-3 text-zinc-400" />
          </SectionTitle>
          <OptionGroup
            activeValue={product.flameRetardant}
            options={FLAME_RETARDANT_OPTIONS}
            onSelect={setFlameRetardant}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Form</SectionTitle>
          <OptionGroup
            activeValue={product.form}
            options={FORM_OPTIONS}
            onSelect={setForm}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Format</SectionTitle>
          <OptionGroup
            activeValue={product.format}
            options={FORMAT_OPTIONS}
            onSelect={setFormat}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Dimensions</SectionTitle>
          <DimensionSelector />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Quantity</SectionTitle>
          <QuantitySelector />
        </section>
      </div>
    </aside>
  );
}