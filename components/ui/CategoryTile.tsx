"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface CategoryTileProps {
  id: string;
  label: string;
  gender: "men" | "women";
  garment: "tshirt" | "shirt";
  desc: string;
  animal: string;
  onClick: (gender: "men" | "women", garment: "tshirt" | "shirt") => void;
}

export function CategoryTile({
  label,
  gender,
  garment,
  desc,
  animal,
  onClick,
}: CategoryTileProps) {
  return (
    <div
      onClick={() => onClick(gender, garment)}
      className="group relative p-6 bg-surface dark:bg-surface rounded-card border border-line hover:border-terracotta/50 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(gender, garment);
        }
      }}
      aria-label={`Browse ${label}`}
    >
      {/* Decorative Habitat Corner Watermark */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-sand/30 dark:bg-sand/15 pointer-events-none group-hover:scale-125 transition-transform duration-500 ease-out" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            {animal}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-sand/60 text-[10px] font-medium text-muted">
            {garment === "tshirt" ? "180+ GSM" : "Linen-Cotton"}
          </span>
        </div>

        <h3 className="font-fraunces text-scale-20 md:text-scale-28 font-bold text-ink group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors">
          {label}
        </h3>

        <p className="mt-2 text-scale-14 text-muted leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
        <span className="text-scale-12 font-semibold text-ink group-hover:text-terracotta transition-colors">
          View species designs
        </span>
        <div className="w-8 h-8 rounded-full bg-sand/70 group-hover:bg-terracotta group-hover:text-surface flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
