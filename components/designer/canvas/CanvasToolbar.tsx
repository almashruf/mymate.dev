import { Minus, Palette, Shapes, Type, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tool = {
  icon: LucideIcon;
  label: string;
};

const tools: Tool[] = [
  { icon: Upload, label: "Upload image" },
  { icon: Type, label: "Add text" },
  { icon: Shapes, label: "Select icon" },
  { icon: Minus, label: "Add line" },
  { icon: Palette, label: "Choose a design" },
];

export default function CanvasToolbar() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {tools.map(({ icon: Icon, label }) => (
        <button
          type="button"
          key={label}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-2 py-2.5 text-zinc-600"
        >
          <Icon className="h-[18px] w-[18px]" />
          <span className="text-[10px] font-medium leading-none">{label}</span>
        </button>
      ))}
    </div>
  );
}