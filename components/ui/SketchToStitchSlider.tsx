"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Sliders, Brush, Layers } from "lucide-react";
import { SPECIES_FIELD_RECORDS } from "@/lib/naturalistData";

export function SketchToStitchSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeSpecies, setActiveSpecies] = useState<string>("fox-in-the-pines");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const speciesOptions = [
    { id: "fox-in-the-pines", name: "Red Fox in Pines", printImg: "/products/fox/flat.jpg", sketchImg: "/images/hero-fox.jpg" },
    { id: "night-owl", name: "Barn Owl Vigil", printImg: "/products/owl/flat.jpg", sketchImg: "/products/owl/print.jpg" },
    { id: "humpback-drift", name: "Humpback Drift", printImg: "/products/whale/flat.jpg", sketchImg: "/products/whale/print.jpg" },
    { id: "mountain-hare", name: "Mountain Hare", printImg: "/products/hare/flat.jpg", sketchImg: "/products/hare/print.jpg" },
  ];

  const currentOption = speciesOptions.find((s) => s.id === activeSpecies) || speciesOptions[0];

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handlePointerMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handlePointerMove(e.clientX);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
            <Brush className="w-3.5 h-3.5" />
            Field Journal to Loom
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Sketch to Stitch
          </h3>
          <p className="text-scale-12 text-muted">
            Drag the divider to reveal how original naturalist pencil field drawings transform into 4-pass water-based screen prints.
          </p>
        </div>

        {/* Species selector pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-sand/40 dark:bg-sand/20 border border-line">
          {speciesOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveSpecies(opt.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                activeSpecies === opt.id
                  ? "bg-forest text-surface shadow-xs"
                  : "text-muted hover:text-ink"
              }`}
            >
              {opt.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Drag Stage */}
      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-line shadow-md"
      >
        {/* Right Layer: Finished Screen-Printed Garment */}
        <div className="absolute inset-0 w-full h-full bg-sand/20">
          <img
            src={currentOption.printImg}
            alt={`${currentOption.name} finished garment screen print`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-forest/90 text-surface text-[11px] font-semibold backdrop-blur-xs">
            Final Screen-Printed Garment
          </div>
        </div>

        {/* Left Layer: Pencil Field Sketch (Clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
          >
            <img
              src={currentOption.sketchImg}
              alt={`${currentOption.name} naturalist field sketch`}
              className="w-full h-full object-cover filter contrast-125 sepia-25"
            />
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-ink/80 text-surface text-[11px] font-semibold backdrop-blur-xs">
              Original Naturalist Field Sketch
            </div>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-surface shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-forest text-surface border-2 border-surface flex items-center justify-center shadow-lg -ml-3.5">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </div>

      {/* Info Footnote */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted gap-2 pt-1">
        <span>* Zero synthetic digital vinyl heat-transfers. All KURMI garments use breathable discharge inks.</span>
        <span className="font-mono text-terracotta font-semibold">Pencil Lead to Botanical Discharge</span>
      </div>
    </div>
  );
}
