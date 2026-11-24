"use client";

import React, { useState, useEffect } from "react";
import { X, Ruler, CheckCircle2, Sparkles } from "lucide-react";
import { useKurmi } from "@/lib/context";
import { COPY } from "@/data/copy";

export function SizeGuideDrawer() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useKurmi();
  const [chestSize, setChestSize] = useState<number>(39);
  const [fitPreference, setFitPreference] = useState<"fitted" | "regular" | "relaxed">("regular");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSizeGuideOpen) {
        setIsSizeGuideOpen(false);
      }
    };
    if (isSizeGuideOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSizeGuideOpen, setIsSizeGuideOpen]);

  // Compute recommended size
  const getRecommendedSize = () => {
    let base = "M";
    if (chestSize <= 36) base = "XS";
    else if (chestSize <= 38) base = "S";
    else if (chestSize <= 40) base = "M";
    else if (chestSize <= 42) base = "L";
    else if (chestSize <= 44) base = "XL";
    else base = "XXL";

    if (fitPreference === "relaxed") {
      const order = ["XS", "S", "M", "L", "XL", "XXL"];
      const nextIdx = Math.min(order.length - 1, order.indexOf(base) + 1);
      return order[nextIdx];
    }
    return base;
  };

  const recommended = getRecommendedSize();

  if (!isSizeGuideOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-bg h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-line p-6 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-line">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-terracotta" />
              <h2 id="size-guide-title" className="font-fraunces font-bold text-scale-20 text-ink">
                {COPY.sizeGuide.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive "Find My Fit" Advisor */}
          <div className="mt-5 p-4 rounded-2xl bg-surface border border-line shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="font-fraunces font-bold text-scale-16 text-ink">
                Smart Fit Recommender
              </span>
            </div>

            {/* Chest Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-scale-12 font-medium">
                <span className="text-muted">Your Chest Circumference:</span>
                <span className="font-bold text-ink">{chestSize} inches</span>
              </div>
              <input
                type="range"
                min={34}
                max={48}
                value={chestSize}
                onChange={(e) => setChestSize(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
            </div>

            {/* Fit Preference Pills */}
            <div className="space-y-1.5">
              <span className="text-scale-12 text-muted font-medium block">Preferred Silhouette:</span>
              <div className="grid grid-cols-3 gap-2">
                {(["fitted", "regular", "relaxed"] as const).map((fit) => (
                  <button
                    key={fit}
                    type="button"
                    onClick={() => setFitPreference(fit)}
                    className={`py-1.5 px-2 rounded-lg text-scale-12 font-medium capitalize border transition-all ${
                      fitPreference === fit
                        ? "bg-forest text-surface border-forest shadow-xs"
                        : "bg-sand/40 text-muted hover:text-ink border-line"
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="p-3 rounded-xl bg-sand/60 dark:bg-sand/30 border border-line flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted block uppercase tracking-wider">Recommended Size:</span>
                <span className="text-scale-14 font-medium text-ink">
                  {fitPreference === "relaxed" ? "Relaxed drape" : "Natural field fit"}
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-forest text-surface flex items-center justify-center font-fraunces font-bold text-scale-20 shadow-sm">
                {recommended}
              </div>
            </div>
          </div>

          <div className="my-5 p-3 rounded-xl bg-sand/60 dark:bg-sand/30 border border-line text-scale-12 text-ink">
            <span className="font-semibold text-terracotta block mb-0.5">SAMPLE MEASUREMENTS</span>
            {COPY.sizeGuide.disclaimer}
          </div>

          {/* Men's Chart with active highlight */}
          <div className="space-y-3">
            <h3 className="font-fraunces font-bold text-scale-16 text-ink">
              Men's Regular Fit (Inches)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-scale-12 text-left">
                <thead className="bg-sand/60 dark:bg-sand/40 text-muted uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest</th>
                    <th className="p-2.5">Length</th>
                    <th className="p-2.5">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line text-ink">
                  {[
                    { size: "XS", chest: '36"', length: '26.5"', shoulder: '16.5"' },
                    { size: "S", chest: '38"', length: '27.5"', shoulder: '17.5"' },
                    { size: "M", chest: '40"', length: '28.5"', shoulder: '18.5"' },
                    { size: "L", chest: '42"', length: '29.5"', shoulder: '19.5"' },
                    { size: "XL", chest: '44"', length: '30.5"', shoulder: '20.5"' },
                    { size: "XXL", chest: '46"', length: '31.0"', shoulder: '21.5"' },
                  ].map((row) => (
                    <tr
                      key={row.size}
                      className={row.size === recommended ? "bg-terracotta/15 font-bold" : ""}
                    >
                      <td className="p-2.5 font-bold flex items-center gap-1.5">
                        <span>{row.size}</span>
                        {row.size === recommended && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-terracotta inline" />
                        )}
                      </td>
                      <td className="p-2.5">{row.chest}</td>
                      <td className="p-2.5">{row.length}</td>
                      <td className="p-2.5">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSizeGuideOpen(false)}
          className="mt-6 w-full h-11 rounded-full bg-forest text-surface font-medium text-scale-14 hover:bg-forest-hover transition-colors"
        >
          Confirm Size ({recommended})
        </button>
      </div>
    </div>
  );
}
