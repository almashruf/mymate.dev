"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  createInitialState,
  computePricing,
  sanitizeDimension,
  sanitizeQuantity,
  sanitizeZoom,
} from "./model";
import type {
  DesignerCanvas,
  DesignerProduct,
  DesignerState,
  DesignElement,
  Edge,
  FlameRetardant,
  Form,
  Format,
} from "./types";

export interface DesignerActions {
  setBaseColor(color: string): void;
  setEdge(edge: Edge): void;
  setFlameRetardant(flameRetardant: FlameRetardant): void;
  setForm(form: Form): void;
  setFormat(format: Format): void;
  setDimension(field: "width" | "height", value: number): void;
  setQuantity(quantity: number): void;
  setZoom(zoom: number): void;
  zoomBy(delta: number): void;
  setElements(elements: DesignElement[]): void;
  addElement(element: DesignElement): void;
  removeElements(ids: string[]): void;
}

export interface DesignerContextValue extends DesignerActions {
  state: DesignerState;
}

const DesignerContext = createContext<DesignerContextValue | null>(null);

export function DesignerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DesignerState>(() => createInitialState());

  const updateProduct = useCallback((patch: Partial<DesignerProduct>) => {
    setState((prev) => {
      const product = { ...prev.product, ...patch };
      return { ...prev, product, pricing: computePricing(product) };
    });
  }, []);

  const setBaseColor = useCallback(
    (color: string) => updateProduct({ baseColor: color }),
    [updateProduct]
  );

  const setEdge = useCallback(
    (edge: Edge) => updateProduct({ edge }),
    [updateProduct]
  );

  const setFlameRetardant = useCallback(
    (flameRetardant: FlameRetardant) => updateProduct({ flameRetardant }),
    [updateProduct]
  );

  const setForm = useCallback(
    (form: Form) => updateProduct({ form }),
    [updateProduct]
  );

  const setFormat = useCallback(
    (format: Format) => updateProduct({ format }),
    [updateProduct]
  );

  const setDimension = useCallback(
    (field: "width" | "height", value: number) =>
      updateProduct({ [field]: sanitizeDimension(field, value) }),
    [updateProduct]
  );

  const setQuantity = useCallback(
    (quantity: number) => updateProduct({ quantity: sanitizeQuantity(quantity) }),
    [updateProduct]
  );

  const setZoom = useCallback((zoom: number) => {
    setState((prev) => {
      const nextZoom = sanitizeZoom(zoom);
      if (nextZoom === prev.canvas.zoom) return prev;
      return { ...prev, canvas: { ...prev.canvas, zoom: nextZoom } };
    });
  }, []);

  const zoomBy = useCallback(
    (delta: number) => setZoom(state.canvas.zoom + delta),
    [setZoom, state.canvas.zoom]
  );

  const setElements = useCallback((elements: DesignElement[]) => {
    setState((prev) => {
      if (prev.canvas.elements === elements) return prev;
      return { ...prev, canvas: { ...prev.canvas, elements } };
    });
  }, []);

  const addElement = useCallback((element: DesignElement) => {
    setState((prev) => ({
      ...prev,
      canvas: { ...prev.canvas, elements: [...prev.canvas.elements, element] },
    }));
  }, []);

  const removeElements = useCallback((ids: string[]) => {
    setState((prev) => ({
      ...prev,
      canvas: {
        ...prev.canvas,
        elements: prev.canvas.elements.filter((el) => !ids.includes(el.id)),
      },
    }));
  }, []);

  const value = useMemo<DesignerContextValue>(
    () => ({
      state,
      setBaseColor,
      setEdge,
      setFlameRetardant,
      setForm,
      setFormat,
      setDimension,
      setQuantity,
      setZoom,
      zoomBy,
      setElements,
      addElement,
      removeElements,
    }),
    [
      state,
      setBaseColor,
      setEdge,
      setFlameRetardant,
      setForm,
      setFormat,
      setDimension,
      setQuantity,
      setZoom,
      zoomBy,
      setElements,
      addElement,
      removeElements,
    ]
  );

  return (
    <DesignerContext.Provider value={value}>{children}</DesignerContext.Provider>
  );
}

export function useDesigner(): DesignerContextValue {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error("useDesigner must be used within DesignerProvider");
  }
  return context;
}

export type { DesignerCanvas, DesignerProduct, DesignerState };