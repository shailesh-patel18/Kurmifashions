"use client";

import React from "react";
import { COPY } from "@/data/copy";
import { CategoryTile } from "../ui/CategoryTile";

interface CategoriesSectionProps {
  onSelectCategory: (gender: "men" | "women", garment: "tshirt" | "shirt") => void;
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section id="categories" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-2 mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            {COPY.categories.tag}
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            {COPY.categories.title}
          </h2>
          <p className="text-scale-16 text-muted">
            {COPY.categories.subtitle}
          </p>
        </div>

        {/* 4 Category Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COPY.categories.items.map((cat) => (
            <CategoryTile
              key={cat.id}
              id={cat.id}
              label={cat.label}
              gender={cat.gender as any}
              garment={cat.garment as any}
              desc={cat.desc}
              animal={cat.animal}
              onClick={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
