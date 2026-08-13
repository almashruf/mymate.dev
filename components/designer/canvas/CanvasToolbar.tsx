"use client";

import { useRef, useState } from "react";
import { Minus, Palette, Shapes, Type, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useDesigner } from "../state/designer-context";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from "../state/constants";
import {
  createDefaultElement,
  createImageElement,
} from "../state/model";

type Tool = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function loadImageDimensions(
  source: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth === 0 && img.naturalHeight === 0) {
        reject(new Error("Corrupted image"));
        return;
      }
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = source;
  });
}

export default function CanvasToolbar() {
  const { state, addElement } = useDesigner();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    setError(null);
    if (!files || files.length === 0) return;
    const file = files[0];

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError(
        `Unsupported file type: ${file.type || "unknown"}. Use PNG, JPG, WEBP or SVG.`
      );
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setError(
        `Image too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Max ${MAX_IMAGE_SIZE_BYTES / (1024 * 1024)} MB.`
      );
      return;
    }

    try {
      const source = await readFileAsDataURL(file);
      const { width, height } = await loadImageDimensions(source);
      addElement(createImageElement(source, width, height, state.product));
    } catch {
      setError("Could not load this image. The file may be corrupted.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const tools: Tool[] = [
    { icon: Type, label: "Add text", onClick: () => {} },
    { icon: Shapes, label: "Select icon", onClick: () => {} },
    {
      icon: Minus,
      label: "Add line",
      onClick: () => addElement(createDefaultElement(state.product, "line")),
    },
    { icon: Palette, label: "Choose a design", onClick: () => {} },
  ];

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(event) => void handleFiles(event.currentTarget.files)}
      />
      <div className="grid grid-cols-5 gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-2 py-2.5 text-zinc-600"
        >
          <Upload className="h-[18px] w-[18px]" />
          <span className="text-[10px] font-medium leading-none">
            Upload image
          </span>
        </button>
        {tools.map(({ icon: Icon, label, onClick }) => (
          <button
            type="button"
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-2 py-2.5 text-zinc-600"
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="text-[10px] font-medium leading-none">
              {label}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </>
  );
}