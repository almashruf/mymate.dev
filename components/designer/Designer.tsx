"use client";

import { DesignerProvider } from "./state/designer-context";
import Configurator from "./configurator/Configurator";
import DrawingArea from "./canvas/DrawingArea";
import PreviewPanel from "./preview/PreviewPanel";

export default function Designer() {
  return (
    <DesignerProvider>
      <main className="flex min-h-screen items-center justify-center bg-[#e9edf1] p-5">
        <div className="flex h-[calc(100vh-2.5rem)] w-full max-w-[1480px] overflow-hidden rounded-2xl border border-zinc-300 bg-white">
          <Configurator />
          <DrawingArea />
          <PreviewPanel />
        </div>
      </main>
    </DesignerProvider>
  );
}