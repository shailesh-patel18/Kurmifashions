"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Sparkles, Check, Compass, ShieldAlert, Award } from "lucide-react";
import { Product } from "@/lib/types";
import { useKurmi } from "@/lib/context";
import { Chip } from "./Chip";
import { SPECIES_FIELD_RECORDS } from "@/lib/naturalistData";

interface DesignCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export function DesignCard({ product, onOpenDetail }: DesignCardProps) {
  const { addToInterestList, stats } = useKurmi();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "Original");
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [localVotes, setLocalVotes] = useState(0);

  const interestCount = (stats.productInterest[product.id] || 0) + localVotes;
  const interestMeterPct = Math.min(100, Math.max(12, (interestCount / 150) * 100));

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToInterestList({
      productId: product.id,
      size: selectedSize as any,
      quantity: 1,
      color: selectedColor,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVoting) return;
    setIsVoting(true);
    setLocalVotes((v) => v + 1);
  };

  const speciesDetail = SPECIES_FIELD_RECORDS[product.id];

  return (
    <div
      onClick={() => onOpenDetail?.(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="design-card field-card group relative bg-surface dark:bg-surface rounded-card border border-line hover:border-dashed hover:border-terracotta/70 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-card-hover cursor-pointer"
      role="article"
      aria-label={`${product.name} species field design card`}
    >
      <div>
        {/* Top Header: Specimen Tag & IUCN Status & Fabric Badge & Vote Heart */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-sand/80 dark:bg-sand/60 text-forest dark:text-ink text-[11px] font-semibold tracking-wider uppercase">
              {product.tag}
            </span>
            {speciesDetail && (
              <span
                title={`IUCN Red List Status: ${speciesDetail.iucnLabel}`}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                  speciesDetail.iucnStatus === "VU" || speciesDetail.iucnStatus === "EN"
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/60"
                    : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/60"
                }`}
              >
                IUCN: {speciesDetail.iucnStatus}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-sand/40 text-[10px] text-muted font-medium">
              {speciesDetail?.weightGsm ? `${speciesDetail.weightGsm} GSM` : product.fabric.split(",")[0]}
            </span>
          </div>

          <button
            type="button"
            onClick={handleVote}
            title="Express interest for this design"
            aria-label={`Vote for ${product.name}, current interest ${interestCount}`}
            className="p-1.5 rounded-full hover:bg-sand/60 text-muted hover:text-terracotta transition-colors flex items-center gap-1 text-scale-12"
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isVoting ? "fill-terracotta text-terracotta scale-125" : ""
              }`}
            />
            <span className="text-[11px] font-medium">{interestCount}</span>
          </button>
        </div>

        {/* Product Visual Container on Sand Panel */}
        <div className="relative aspect-[4/5] w-full rounded-2xl bg-sand/40 dark:bg-sand/20 overflow-hidden flex items-center justify-center mb-4 border border-line/60">
          {/* Primary Image */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={product.images.flat}
              alt={product.altText}
              className="w-full h-full object-cover filter transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Alternate Image on Hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={product.images.alt}
              alt={`${product.altText} alternate field angle`}
              className="w-full h-full object-cover filter transition-transform duration-500 scale-105"
            />
          </div>

          {/* Habitat Badge */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/90 dark:bg-surface/85 backdrop-blur-md border border-line text-[11px] text-ink font-medium shadow-sm">
            <MapPin className="w-3 h-3 text-terracotta shrink-0" aria-hidden="true" />
            <span className="truncate max-w-[170px]">{product.habitat}</span>
          </div>

          {/* Color Swatch Dots */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 p-1 rounded-full bg-surface/85 backdrop-blur-xs border border-line">
            {product.colors.map((c) => (
              <span
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-3.5 h-3.5 rounded-full border cursor-pointer transition-transform ${
                  selectedColor === c.name ? "ring-2 ring-terracotta scale-110 border-white" : "border-black/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Species & Common Name */}
        <div className="space-y-1 mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            {product.species}
          </p>
          <h3 className="font-fraunces text-scale-20 font-bold text-ink group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <p className="text-scale-12 text-muted line-clamp-2 leading-relaxed">
            {product.story}
          </p>
        </div>
      </div>

      {/* Card Footer: Pricing, Sizes & Inquiry Action */}
      <div className="pt-3 border-t border-line/60 space-y-3">
        {/* Real-Data Species Unlock Meter */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-muted flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-terracotta" />
              Batch Unlock ({Math.round(interestMeterPct)}%)
            </span>
            <span className="font-semibold text-ink">{interestCount}/150 reserved</span>
          </div>
          <div className="h-1.5 w-full bg-sand/60 dark:bg-sand/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-forest dark:bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${interestMeterPct}%` }}
            />
          </div>
        </div>

        {/* Price & Size Selector */}
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[11px] text-muted block leading-none">Expected price</span>
            <span className="font-fraunces text-scale-16 font-bold text-ink">
              ₹{product.expectedPriceINR.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Size Choice Chips */}
          <div className="flex gap-1" role="group" aria-label="Select size">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`w-7 h-7 rounded-full text-[11px] font-semibold transition-all ${
                  selectedSize === size
                    ? "bg-forest text-surface shadow-xs"
                    : "bg-sand/60 text-muted hover:text-ink hover:bg-sand"
                }`}
                aria-pressed={selectedSize === size}
                aria-label={`Size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* "I want this" Action Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full h-10 rounded-full font-medium text-scale-14 flex items-center justify-center gap-1.5 transition-all duration-200 ${
            isAdded
              ? "bg-emerald-700 text-surface shadow-sm"
              : "bg-forest hover:bg-forest-hover text-surface shadow-xs hover:-translate-y-0.5"
          }`}
          aria-label={`Add ${product.name} size ${selectedSize} to interest list`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 animate-in zoom-in-50" aria-hidden="true" />
              <span>Pledged ({selectedSize})</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>I want this ({selectedSize})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
