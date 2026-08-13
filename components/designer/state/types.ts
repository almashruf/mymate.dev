export type Edge = "with-border" | "without-border";

export type FlameRetardant = "without" | "with";

export type Form = "square" | "around";

export type Format = "standard" | "wish";

export interface DesignerProduct {
  baseColor: string;
  edge: Edge;
  flameRetardant: FlameRetardant;
  form: Form;
  format: Format;
  width: number;
  height: number;
  quantity: number;
}

export interface CanvasElement {
  id: string;
  type: string;
}

export type ElementType = "line" | "rect" | "image";

export interface ElementContent {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
}

export interface DesignElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  visible: boolean;
  source?: string;
  content?: ElementContent;
}

export interface DesignerCanvas {
  zoom: number;
  elements: DesignElement[];
}

export interface DesignerPricing {
  unitPrice: number;
  subtotal: number;
  vat: number;
  total: number;
}

export interface DesignerState {
  product: DesignerProduct;
  canvas: DesignerCanvas;
  pricing: DesignerPricing;
}