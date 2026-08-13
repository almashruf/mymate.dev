import {
  DEFAULT_HEIGHT,
  DEFAULT_LINE_LENGTH,
  DEFAULT_LINE_STROKE,
  DEFAULT_LINE_STROKE_WIDTH,
  DEFAULT_WIDTH,
  FLAME_RETARDANT_SURCHARGE,
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_QUANTITY,
  MIN_WIDTH,
  PX_PER_CM,
  UNIT_PRICE,
  VAT_RATE,
  ZOOM_DEFAULT,
  ZOOM_MAX,
  ZOOM_MAX_SCALE,
  ZOOM_MIN,
  ZOOM_MIN_SCALE,
  ZOOM_SCALE_REFERENCE,
  BASE_COLOR,
} from "./constants";
import type {
  DesignerPricing,
  DesignerProduct,
  DesignerState,
  DesignElement,
  ElementType,
} from "./types";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatEuro(value: number): string {
  return `€${value.toFixed(2)}`;
}

export function computePricing(product: DesignerProduct): DesignerPricing {
  const unitPrice =
    UNIT_PRICE +
    (product.flameRetardant === "with" ? FLAME_RETARDANT_SURCHARGE : 0);
  const subtotal = roundMoney(unitPrice * product.quantity);
  const vat = roundMoney(subtotal * VAT_RATE);
  const total = roundMoney(subtotal + vat);
  return { unitPrice, subtotal, vat, total };
}

export function sanitizeDimension(
  field: "width" | "height",
  value: number
): number {
  return clamp(
    Math.round(value),
    field === "width" ? MIN_WIDTH : MIN_HEIGHT,
    field === "width" ? MAX_WIDTH : MAX_HEIGHT
  );
}

export function sanitizeQuantity(value: number): number {
  return Math.max(MIN_QUANTITY, Math.round(value));
}

export function sanitizeZoom(value: number): number {
  return clamp(value, ZOOM_MIN, ZOOM_MAX);
}

export function createInitialState(): DesignerState {
  const product: DesignerProduct = {
    baseColor: BASE_COLOR,
    edge: "with-border",
    flameRetardant: "without",
    form: "square",
    format: "standard",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    quantity: MIN_QUANTITY,
  };
  return {
    product,
    canvas: { zoom: ZOOM_DEFAULT, elements: [] },
    pricing: computePricing(product),
  };
}

export function contentPixelWidth(widthCm: number): number {
  return widthCm * PX_PER_CM;
}

export function contentPixelHeight(heightCm: number): number {
  return heightCm * PX_PER_CM;
}

export function zoomToScale(zoom: number): number {
  return clamp(
    zoom / ZOOM_SCALE_REFERENCE,
    ZOOM_MIN_SCALE,
    ZOOM_MAX_SCALE
  );
}

export function createDefaultElement(
  product: DesignerProduct,
  type: ElementType = "line"
): DesignElement {
  const id = createElementId();
  const centerX = contentPixelWidth(product.width) / 2;
  const centerY = contentPixelHeight(product.height) / 2;
  if (type === "line") {
    return {
      id,
      type,
      x: centerX,
      y: centerY,
      width: DEFAULT_LINE_LENGTH,
      height: DEFAULT_LINE_STROKE_WIDTH,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      content: {
        stroke: DEFAULT_LINE_STROKE,
        strokeWidth: DEFAULT_LINE_STROKE_WIDTH,
      },
    };
  }
  const rectSize = 60;
  return {
    id,
    type,
    x: centerX,
    y: centerY,
    width: rectSize,
    height: rectSize,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    content: { fill: BASE_COLOR },
  };
}

export function createElementId(): string {
  return `el_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function createImageElement(
  source: string,
  naturalWidth: number,
  naturalHeight: number,
  product: DesignerProduct
): DesignElement {
  const centerX = contentPixelWidth(product.width) / 2;
  const centerY = contentPixelHeight(product.height) / 2;
  const maxW = contentPixelWidth(product.width) * 0.6;
  const maxH = contentPixelHeight(product.height) * 0.6;
  const fitScale = Math.min(maxW / naturalWidth, maxH / naturalHeight, 1);
  const width = Math.max(Math.round(naturalWidth * fitScale), 1);
  const height = Math.max(Math.round(naturalHeight * fitScale), 1);
  return {
    id: createElementId(),
    type: "image",
    source,
    x: centerX,
    y: centerY,
    width,
    height,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
  };
}