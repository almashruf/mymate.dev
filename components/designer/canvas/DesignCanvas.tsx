"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas as FabricCanvas,
  FabricImage,
  Line,
  Rect,
  type FabricObject,
} from "fabric";

import { useDesigner } from "../state/designer-context";
import {
  contentPixelHeight,
  contentPixelWidth,
  zoomToScale,
} from "../state/model";
import type { DesignElement } from "../state/types";
import MeasurementLines from "./MeasurementLines";

const SAFETY_MARGIN = 16;

export default function DesignCanvas() {
  const { state, setElements, removeElements } = useDesigner();
  const { product, canvas } = state;

  const containerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [ready, setReady] = useState(false);

  const fcRef = useRef<FabricCanvas | null>(null);
  const objectsRef = useRef<Map<string, FabricObject>>(new Map());
  const backgroundRef = useRef<FabricObject | null>(null);
  const dashedRef = useRef<FabricObject | null>(null);
  const productRef = useRef(product);
  const elementsRef = useRef(canvas.elements);

  useEffect(() => {
    productRef.current = product;
  }, [product]);

  useEffect(() => {
    elementsRef.current = canvas.elements;
  }, [canvas.elements]);

  const logicalW = contentPixelWidth(product.width);
  const logicalH = contentPixelHeight(product.height);

  const layout = useMemo(() => {
    const availW = Math.max(container.width - SAFETY_MARGIN, 1);
    const availH = Math.max(container.height - SAFETY_MARGIN, 1);
    const scale = Math.min(
      zoomToScale(canvas.zoom),
      availW / logicalW,
      availH / logicalH
    );
    const width = Math.max(Math.round(logicalW * scale), 1);
    const height = Math.max(Math.round(logicalH * scale), 1);
    return { scale: width / logicalW, width, height };
  }, [container, canvas.zoom, logicalW, logicalH]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setContainer({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full rounded-xl";
    canvas.setAttribute("aria-label", "Design canvas");
    host.appendChild(canvas);

    const fc = new FabricCanvas(canvas, {
      selection: true,
      preserveObjectStacking: true,
      uniformScaling: true,
    });
    fcRef.current = fc;

    const { width, height } = productRef.current;
    const logicalW0 = width * 10;
    const logicalH0 = height * 10;
    const base = new Rect({
      left: logicalW0 / 2,
      top: logicalH0 / 2,
      width: logicalW0,
      height: logicalH0,
      fill: productRef.current.baseColor,
      selectable: false,
      evented: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: "default",
    });
    const dashed = new Rect({
      left: logicalW0 / 2,
      top: logicalH0 / 2,
      width: logicalW0 - 32,
      height: logicalH0 - 32,
      fill: "transparent",
      stroke: "rgba(255,255,255,0.25)",
      strokeWidth: 1,
      strokeDashArray: [6, 6],
      selectable: false,
      evented: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: "default",
    });
    backgroundRef.current = base;
    dashedRef.current = dashed;
    fc.add(base, dashed);

    const findId = (obj: FabricObject): string | undefined => {
      for (const [id, candidate] of objectsRef.current.entries()) {
        if (candidate === obj) return id;
      }
      return undefined;
    };

    const clampToWorkArea = (target: FabricObject) => {
      const p = productRef.current;
      const w = p.width * 10;
      const h = p.height * 10;
      const b = target.getBoundingRect();
      let dx = 0;
      let dy = 0;
      if (b.left < 0) dx = -b.left;
      if (b.top < 0) dy = -b.top;
      if (b.left + b.width > w) dx = w - b.left - b.width;
      if (b.top + b.height > h) dy = h - b.top - b.height;
      if (dx !== 0 || dy !== 0) {
        target.set({ left: target.left + dx, top: target.top + dy });
        target.setCoords();
      }
    };

    const syncFromCanvas = () => {
      const next = elementsRef.current.map((el) => {
        const obj = objectsRef.current.get(el.id);
        if (!obj) return el;
        return {
          ...el,
          x: obj.left,
          y: obj.top,
          rotation: obj.angle,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          visible: obj.visible,
        };
      });
      setElements(next);
    };

    fc.on("object:moving", (e) => {
      if (e.target) clampToWorkArea(e.target);
    });
    fc.on("object:scaling", (e) => {
      if (e.target) clampToWorkArea(e.target);
    });
    fc.on("object:rotating", (e) => {
      if (e.target) clampToWorkArea(e.target);
    });
    fc.on("object:modified", syncFromCanvas);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Delete" && event.key !== "Backspace") return;
      const t = event.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          t.isContentEditable
        ) {
          return;
        }
      }
      const active = fc.getActiveObjects();
      if (active.length === 0) return;
      const ids = active
        .map((obj) => findId(obj))
        .filter((id): id is string => id !== undefined);
      if (ids.length === 0) return;
      fc.discardActiveObject();
      removeElements(ids);
    };
    document.addEventListener("keydown", onKeyDown);

    setReady(true);
    const objects = objectsRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      fc.dispose();
      fcRef.current = null;
      host.replaceChildren();
      objects.clear();
      backgroundRef.current = null;
      dashedRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fc = fcRef.current;
    if (!fc || !ready) return;
    fc.setDimensions({ width: layout.width, height: layout.height });
    fc.setViewportTransform([layout.scale, 0, 0, layout.scale, 0, 0]);
    fc.requestRenderAll();
  }, [layout, ready]);

  useEffect(() => {
    const fc = fcRef.current;
    if (!fc || !ready) return;
    const base = backgroundRef.current;
    if (base && base instanceof Rect) {
      base.set({
        width: logicalW,
        height: logicalH,
        left: logicalW / 2,
        top: logicalH / 2,
        fill: product.baseColor,
        rx: product.form === "around" ? Math.min(logicalW, logicalH) * 0.06 : 0,
        stroke: product.edge === "with-border" ? "#000" : "transparent",
        strokeWidth: product.edge === "with-border" ? 2 : 0,
      });
    }
    const dashed = dashedRef.current;
    if (dashed && dashed instanceof Rect) {
      dashed.set({
        width: logicalW - 32,
        height: logicalH - 32,
        left: logicalW / 2,
        top: logicalH / 2,
        rx:
          product.form === "around"
            ? Math.min(logicalW, logicalH) * 0.06
            : 0,
      });
    }
    fc.requestRenderAll();
  }, [product, logicalW, logicalH, ready]);

  useEffect(() => {
    const fc = fcRef.current;
    if (!fc || !ready) return;

    const wanted = new Map(canvas.elements.map((el) => [el.id, el]));
    for (const [id, obj] of objectsRef.current.entries()) {
      if (!wanted.has(id)) {
        fc.remove(obj);
        objectsRef.current.delete(id);
      }
    }
    for (const el of canvas.elements) {
      const existing = objectsRef.current.get(el.id);
      if (existing) {
        applyElementProps(existing, el);
      } else if (el.type === "image" && el.source) {
        void createImageObject(el).then((obj) => {
          if (!obj) return;
          const stillWanted =
            wanted.has(el.id) && objectsRef.current.get(el.id) === undefined;
          if (!stillWanted) return;
          objectsRef.current.set(el.id, obj);
          fc.add(obj);
          fc.setActiveObject(obj);
          fc.requestRenderAll();
        });
      } else {
        const obj = buildObject(el);
        objectsRef.current.set(el.id, obj);
        fc.add(obj);
        fc.setActiveObject(obj);
        fc.requestRenderAll();
      }
    }
    fc.requestRenderAll();
  }, [canvas.elements, ready]);

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-0 w-full items-center justify-center px-20 py-12"
    >
      <div
        className="relative"
        style={{ width: layout.width, height: layout.height }}
      >
        {ready && (
          <MeasurementLines
            product={product}
            width={layout.width}
            height={layout.height}
          />
        )}
        <div ref={hostRef} className="absolute inset-0" />
      </div>
    </div>
  );
}

function buildObject(el: DesignElement): FabricObject {
  const object = buildGeometry(el);
  applyElementProps(object, el);
  return object;
}

function buildGeometry(el: DesignElement): FabricObject {
  const { x, y, type, width } = el;
  const half = width / 2;
  if (type === "line") {
    return new Line([x - half, y, x + half, y], {
      stroke: el.content?.stroke ?? "#3F3F46",
      strokeWidth: el.content?.strokeWidth ?? 4,
      strokeUniform: true,
      originX: "center",
      originY: "center",
      left: x,
      top: y,
    });
  }
  return new Rect({
    left: x,
    top: y,
    width,
    height: el.height,
    fill: el.content?.fill ?? "#626B6A",
    rx: el.content?.radius ?? 0,
    originX: "center",
    originY: "center",
  });
}

function createImageObject(
  el: DesignElement
): Promise<FabricObject | null> {
  return FabricImage.fromURL(el.source as string, {
    crossOrigin: "anonymous",
  })
    .then((img) => {
      img.set({
        left: el.x,
        top: el.y,
        width: el.width,
        height: el.height,
        angle: el.rotation,
        scaleX: el.scaleX,
        scaleY: el.scaleY,
        visible: el.visible,
        originX: "center",
        originY: "center",
        strokeWidth: 0,
      });
      return img as FabricObject;
    })
    .catch(() => null);
}

function applyElementProps(obj: FabricObject, el: DesignElement) {
  const transform = {
    left: el.x,
    top: el.y,
    angle: el.rotation,
    scaleX: el.scaleX,
    scaleY: el.scaleY,
    visible: el.visible,
  };
  if (obj instanceof Line) {
    obj.set({
      ...transform,
      stroke: el.content?.stroke ?? obj.stroke,
      strokeWidth: el.content?.strokeWidth ?? obj.strokeWidth,
    });
  } else if (obj instanceof FabricImage) {
    obj.set(transform);
  } else if (obj instanceof Rect) {
    obj.set({
      ...transform,
      fill: el.content?.fill ?? obj.fill,
    });
  }
}