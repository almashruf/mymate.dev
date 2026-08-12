import { Info } from "lucide-react";

import SectionTitle from "./SectionTitle";
import ColorSelector from "./ColorSelector";
import OptionGroup from "./OptionGroup";
import DimensionSelector from "./DimensionSelector";
import QuantitySelector from "./QuantitySelector";

export default function Configurator() {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="border-b border-zinc-100 px-5 pb-4 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
          Configurator
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">
          Color palette vectorizer
        </h1>
      </div>
      <div className="scrollbar-none min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <section className="space-y-2.5">
          <SectionTitle>Base color</SectionTitle>
          <ColorSelector />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Edge</SectionTitle>
          <OptionGroup
            activeValue="with-border"
            options={[{ value: "with-border", label: "With border" }]}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>
            Flame-retardant
            <Info className="h-3 w-3 text-zinc-400" />
          </SectionTitle>
          <OptionGroup
            activeValue="without"
            options={[
              { value: "without", label: "Without" },
              { value: "with", label: "With (+€45 net)" },
            ]}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Form</SectionTitle>
          <OptionGroup
            activeValue="square"
            options={[
              { value: "square", label: "Square" },
              { value: "around", label: "Around" },
            ]}
          />
        </section>

        <section className="space-y-2.5">
          <SectionTitle>Format</SectionTitle>
          <OptionGroup
            activeValue="standard"
            options={[
              { value: "standard", label: "standard" },
              { value: "wish", label: "Wish" },
            ]}
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