import type { Edge, FlameRetardant, Form, Format } from "./types";

export const BASE_COLOR = "#626B6A";

export const DEFAULT_WIDTH = 60;
export const DEFAULT_HEIGHT = 40;

export const MIN_WIDTH = 40;
export const MAX_WIDTH = 200;
export const MIN_HEIGHT = 40;
export const MAX_HEIGHT = 500;
export const DIMENSION_STEP = 10;

export const PX_PER_CM = 10;

export const MIN_QUANTITY = 1;

export const UNIT_PRICE = 24;
export const FLAME_RETARDANT_SURCHARGE = 45;
export const VAT_RATE = 0.19;
export const VAT_RATE_LABEL = "19%";

export const COLOR_PRESETS = [
  "#626B6A",
  "#4A4A4A",
  "#8C8C8C",
  "#B8B8B8",
  "#E8E8E8",
  "#FFFFFF",
];

export const DEFAULT_LINE_LENGTH = 120;
export const DEFAULT_LINE_STROKE = "#3F3F46";
export const DEFAULT_LINE_STROKE_WIDTH = 4;

export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

export const ZOOM_DEFAULT = 50;
export const ZOOM_MIN = 0;
export const ZOOM_MAX = 100;
export const ZOOM_STEP = 5;
export const ZOOM_SCALE_REFERENCE = 50;
export const ZOOM_MIN_SCALE = 0.4;
export const ZOOM_MAX_SCALE = 2;

export const EDGE_OPTIONS: { value: Edge; label: string }[] = [
  { value: "with-border", label: "With border" },
  { value: "without-border", label: "Without border" },
];

export const FLAME_RETARDANT_OPTIONS: {
  value: FlameRetardant;
  label: string;
}[] = [
  { value: "without", label: "Without" },
  { value: "with", label: "With (+€45 net)" },
];

export const FORM_OPTIONS: { value: Form; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "around", label: "Around" },
];

export const FORMAT_OPTIONS: { value: Format; label: string }[] = [
  { value: "standard", label: "standard" },
  { value: "wish", label: "Wish" },
];