"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { useKurmi } from "@/lib/context";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { MapPin, Sparkles, Check, Ruler, Share2 } from "lucide-react";

export function ProductDetailView({ product }: { product: Product }) {
  const { addToInterestList, setIsSizeGuideOpen } = useKurmi();
  const [activeImage, setActiveImage] = useState<"flat" | "alt" | "print">("flat");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAdd = () => {
    addToInterestList({
      productId: product.id,
      size: selectedSize as any,
      quantity,
      color: product.colors[0]?.name,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Product Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-[4/5] w-full rounded-3xl bg-sand/40 dark:bg-sand/20 border border-line flex items-center justify-center relative overflow-hidden shadow-card">
          <img
            src={product.images[activeImage]}
            alt={product.altText}
            className="w-full h-full object-cover filter transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 dark:bg-surface/85 backdrop-blur-sm border border-line text-scale-12 font-semibold text-terracotta shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{product.habitat}</span>
          </div>
        </div>

        <div className="flex gap-4">
          {(["flat", "alt", "print"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveImage(view)}
              className={`w-24 h-24 rounded-2xl bg-sand/30 border-2 overflow-hidden transition-all ${
                activeImage === view ? "border-forest dark:border-emerald-400" : "border-line"
              }`}
              aria-label={`Switch to ${view} shot`}
            >
              <img
                src={product.images[view]}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Specimen Field Information */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-scale-12 font-semibold uppercase tracking-widest text-muted">
              {product.species}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-sand/60 text-[11px] font-semibold text-forest dark:text-ink">
              {product.tag}
            </span>
          </div>
          <h1 className="font-fraunces text-scale-40 font-bold text-ink">
            {product.name}
          </h1>
          <p className="mt-3 text-scale-16 text-muted leading-relaxed">
            {product.story}
          </p>
        </div>

        <div className="p-5 rounded-card bg-sand/40 dark:bg-sand/20 border border-line space-y-2.5 text-scale-14">
          <div className="flex justify-between">
            <span className="text-muted">Fabric:</span>
            <span className="font-semibold text-ink">{product.fabric}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Fit Profile:</span>
            <span className="font-semibold text-ink capitalize">{product.fit} Cut</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Gender Styling:</span>
            <span className="font-semibold text-ink capitalize">{product.gender.join(" & ")}</span>
          </div>
        </div>

        <div>
          <span className="text-scale-12 text-muted block">Expected price</span>
          <div className="flex items-baseline gap-3">
            <span className="font-fraunces text-scale-40 font-bold text-ink">
              ₹{product.expectedPriceINR.toLocaleString("en-IN")}
            </span>
            <span className="text-scale-12 text-terracotta font-medium">
              (₹0 today • Validating demand before manufacturing)
            </span>
          </div>
        </div>

        <div>
          {/* Colorway Selection */}
          <div className="mb-4">
            <label className="text-scale-12 font-semibold text-ink uppercase tracking-wider block mb-2">
              Select Colorway:
            </label>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface text-scale-12 font-medium"
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-2.5">
            <label className="text-scale-12 font-semibold text-ink uppercase tracking-wider">
              Choose your size:
            </label>
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-scale-12 text-terracotta hover:underline font-semibold flex items-center gap-1"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Guide (Sample)</span>
            </button>
          </div>

          <div className="flex gap-2.5">
            {product.sizes.map((size) => (
              <Chip
                key={size}
                variant="size"
                active={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Chip>
            ))}
          </div>
        </div>

        <div className="pt-2 flex gap-3 items-center">
          <div className="flex items-center gap-2 bg-sand/50 dark:bg-sand/30 rounded-full p-2 border border-line">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-surface text-ink font-bold flex items-center justify-center hover:bg-sand"
            >
              -
            </button>
            <span className="w-8 text-center text-scale-14 font-bold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="w-8 h-8 rounded-full bg-surface text-ink font-bold flex items-center justify-center hover:bg-sand"
            >
              +
            </button>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleAdd}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>Pledged to Interest List</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>I want this ({selectedSize})</span>
              </>
            )}
          </Button>

          <button
            type="button"
            onClick={handleShare}
            className="w-14 h-14 rounded-full border border-line flex items-center justify-center hover:bg-sand/60 text-muted hover:text-ink transition-colors"
            title="Share this design"
          >
            <Share2 className="w-5 h-5 text-terracotta" />
          </button>
        </div>
        {copiedLink && (
          <p className="text-scale-12 text-emerald-600 font-medium">
            Link copied to clipboard! Share with friends to move up the drop list.
          </p>
        )}
      </div>
    </div>
  );
}
