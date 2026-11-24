"use client";

import React, { useState } from "react";
import { ZoomIn, Sparkles, ShieldCheck, Eye, Layers } from "lucide-react";

export function TextileMicroscope() {
  const [zoomLevel, setZoomLevel] = useState<"10x" | "50x" | "100x">("50x");
  const [activeTab, setActiveTab] = useState<"fiber" | "longevity">("fiber");
  const [longevityDay, setLongevityDay] = useState<number>(300);

  const zoomData = {
    "10x": {
      title: "10× Surface Weave",
      desc: "Interlocked 180 GSM combed jersey matrix. Notice the clean, pill-resistant surface with uniform knit loops.",
      fastFashion: "Open-end yarn with loose stray fuzz and micro-pills forming immediately.",
      kurmi: "Combed ring-spun yarn bio-washed with natural fruit enzymes for zero fuzz balls.",
    },
    "50x": {
      title: "50× Micro-Yarn Alignment",
      desc: "Long-staple cotton fibers spun parallel at 32/1 Ne count, delivering silky softness without synthetic silicone softeners.",
      fastFashion: "Short, brittle fibers that break under laundering tension, causing fabric thinning.",
      kurmi: "Extra-long staple Gujarati organic cotton retaining 98% tensile fiber integrity across 100+ washes.",
    },
    "100x": {
      title: "100× Molecular Cellulose Structure",
      desc: "Pure natural hollow cellulose lumen that breathes dynamically with skin warmth and absorbs atmospheric humidity.",
      fastFashion: "Melted petroleum polyester threads that trap sweat and harbor odor bacteria.",
      kurmi: "100% breathable organic plant cellulose: antibacterial, hypo-allergenic, and dermatologically neutral.",
    },
  };

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6 shadow-sm">
      {/* Header with Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5" />
            Naturalist Textile Laboratory
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Fiber Microscope & Longevity
          </h3>
          <p className="text-scale-12 text-muted">
            Inspect our 100% GOTS combed organic cotton at high magnification vs conventional fast-fashion.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-full bg-sand/50 dark:bg-sand/20 border border-line self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("fiber")}
            className={`px-4 py-1.5 rounded-full text-scale-12 font-medium transition-all ${
              activeTab === "fiber"
                ? "bg-forest text-surface shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Fiber Microscope
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("longevity")}
            className={`px-4 py-1.5 rounded-full text-scale-12 font-medium transition-all ${
              activeTab === "longevity"
                ? "bg-forest text-surface shadow-xs"
                : "text-muted hover:text-ink"
            }`}
          >
            Year 3 Longevity Test
          </button>
        </div>
      </div>

      {activeTab === "fiber" ? (
        <div className="space-y-6">
          {/* Zoom Level Selectors */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted uppercase font-semibold">Magnification:</span>
            {(["10x", "50x", "100x"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setZoomLevel(level)}
                className={`px-3 py-1 rounded-lg text-scale-12 font-bold font-mono transition-all ${
                  zoomLevel === level
                    ? "bg-forest text-surface ring-2 ring-forest/30"
                    : "bg-sand/50 text-muted hover:bg-sand hover:text-ink"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Interactive Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* KURMI Organic Ring-Spun */}
            <div className="p-5 rounded-xl bg-forest/5 dark:bg-emerald-950/20 border-2 border-forest/50 dark:border-emerald-600/50 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-forest text-surface font-semibold text-[11px]">
                  KURMI 180 GSM Ring-Spun
                </span>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider">
                  GOTS Certified
                </span>
              </div>

              {/* Graphical Specimen Representation */}
              <div className="h-36 rounded-lg bg-sand/30 dark:bg-black/30 border border-line flex items-center justify-center p-4 relative overflow-hidden">
                <div
                  className={`w-full h-full flex flex-col justify-around transition-transform duration-500 ${
                    zoomLevel === "100x"
                      ? "scale-150"
                      : zoomLevel === "50x"
                      ? "scale-125"
                      : "scale-100"
                  }`}
                >
                  <div className="h-2 w-full bg-emerald-700/60 rounded-full" />
                  <div className="h-2 w-full bg-emerald-600/70 rounded-full" />
                  <div className="h-2 w-full bg-emerald-800/80 rounded-full" />
                  <div className="h-2 w-full bg-emerald-700/70 rounded-full" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-muted bg-surface/80 px-2 py-0.5 rounded">
                  {zoomLevel} Microscopic View
                </span>
              </div>

              <p className="text-scale-12 text-ink leading-relaxed">
                {zoomData[zoomLevel].kurmi}
              </p>
            </div>

            {/* Fast Fashion Open-End Carded */}
            <div className="p-5 rounded-xl bg-red-50/40 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-300 font-semibold text-[11px]">
                  Conventional Fast-Fashion Tee
                </span>
                <span className="text-[10px] text-red-700 dark:text-red-400 font-medium uppercase tracking-wider">
                  Carded Open-End
                </span>
              </div>

              <div className="h-36 rounded-lg bg-red-100/20 dark:bg-red-950/20 border border-red-200/50 flex items-center justify-center p-4 relative overflow-hidden">
                <div
                  className={`w-full h-full flex flex-col justify-around opacity-60 transition-transform duration-500 ${
                    zoomLevel === "100x"
                      ? "scale-150"
                      : zoomLevel === "50x"
                      ? "scale-125"
                      : "scale-100"
                  }`}
                >
                  <div className="h-1.5 w-3/4 bg-red-400 rounded-full ml-2" />
                  <div className="h-1.5 w-1/2 bg-red-500 rounded-full ml-8" />
                  <div className="h-1.5 w-4/5 bg-red-400 rounded-full ml-4" />
                  <div className="h-1.5 w-2/3 bg-red-600 rounded-full ml-6" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-red-600 dark:text-red-400 bg-surface/80 px-2 py-0.5 rounded">
                  Prone to pilling
                </span>
              </div>

              <p className="text-scale-12 text-muted leading-relaxed">
                {zoomData[zoomLevel].fastFashion}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Year 3 Longevity Slider */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sand/30 dark:bg-sand/10 border border-line space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-scale-14 text-ink flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest dark:text-emerald-400" />
                <span>Simulate Wash Aging: Day {longevityDay}</span>
              </span>
              <span className="font-mono text-scale-12 font-bold text-terracotta">
                {longevityDay < 60 ? "Brand New Feel" : longevityDay < 200 ? "50+ Washes" : "100+ Washes (Year 3)"}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="365"
              value={longevityDay}
              onChange={(e) => setLongevityDay(Number(e.target.value))}
              className="w-full accent-forest cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-muted">
              <span>Day 1 (Unboxing)</span>
              <span>Day 180 (6 Months)</span>
              <span>Day 365+ (Year 3 Heirloom)</span>
            </div>
          </div>

          {/* Aging Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-scale-12">
            <div className="p-3.5 rounded-xl border border-line bg-surface space-y-1">
              <span className="font-bold text-ink block">Collar Anti-Roll</span>
              <span className="text-forest dark:text-emerald-400 font-semibold block text-[11px]">
                {longevityDay > 250 ? "Zero Bacon Curling" : "1×1 Lycra Ribbed"}
              </span>
              <p className="text-[11px] text-muted">
                Herringbone back neck-tape anchors the collar permanently.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-line bg-surface space-y-1">
              <span className="font-bold text-ink block">Dimensional Shrinkage</span>
              <span className="text-forest dark:text-emerald-400 font-semibold block text-[11px]">
                {longevityDay > 250 ? "< 1.2% Total Loss" : "Pre-shrunk Bio-Polish"}
              </span>
              <p className="text-[11px] text-muted">
                Pre-washed at loom stage with mountain river water.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-line bg-surface space-y-1">
              <span className="font-bold text-ink block">Screen-Print Patina</span>
              <span className="text-forest dark:text-emerald-400 font-semibold block text-[11px]">
                {longevityDay > 250 ? "Vintage Soft Handfeel" : "Water-Base Discharge"}
              </span>
              <p className="text-[11px] text-muted">
                Zero plastic cracking; pigment dyes the actual cotton fiber.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
