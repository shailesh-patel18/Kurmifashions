"use client";

import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { InquiryItem, Product } from "@/lib/types";

interface InterestItemProps {
  item: InquiryItem;
  product: Product;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
}

export function InterestItemRow({
  item,
  product,
  onUpdateQty,
  onRemove,
}: InterestItemProps) {
  return (
    <div className="p-3.5 bg-surface dark:bg-surface rounded-card border border-line flex items-center gap-3.5 transition-all duration-200">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-sand/40 dark:bg-sand/20 shrink-0 p-1 flex items-center justify-center overflow-hidden border border-line/60">
        <img
          src={product.images.flat}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-fraunces font-bold text-scale-14 text-ink truncate">
          {product.name}
        </h4>
        <p className="text-[11px] text-muted truncate">
          {product.species} • Size <span className="font-semibold text-ink">{item.size}</span>
        </p>
        <p className="text-scale-12 font-medium text-forest dark:text-emerald-400 mt-0.5">
          Expected ₹{product.expectedPriceINR.toLocaleString("en-IN")}
        </p>
      </div>

      {/* Quantity Stepper (1-10) */}
      <div className="flex items-center gap-1.5 bg-sand/50 dark:bg-sand/30 rounded-full p-1 border border-line/60">
        <button
          type="button"
          onClick={() => onUpdateQty(Math.max(1, item.quantity - 1))}
          disabled={item.quantity <= 1}
          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-surface text-ink disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-5 text-center text-scale-12 font-bold text-ink">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQty(Math.min(10, item.quantity + 1))}
          disabled={item.quantity >= 10}
          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-surface text-ink disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={onRemove}
        className="p-2 text-muted hover:text-red-500 rounded-full hover:bg-sand/50 transition-colors"
        aria-label={`Remove ${product.name} from list`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
