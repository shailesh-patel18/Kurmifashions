"use client";

import React, { useEffect, useRef } from "react";
import { X, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";
import { useKurmi } from "@/lib/context";
import { Button } from "./Button";
import { InterestItemRow } from "./InterestItemRow";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";

export function InterestDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    interestList,
    updateQuantity,
    removeFromInterestList,
    setIsInquiryModalOpen,
  } = useKurmi();

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const products = productsData as Product[];

  // Accessible Escape & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  const totalQuantity = interestList.reduce((acc, curr) => acc + curr.quantity, 0);

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-ink/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-bg h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300 border-l border-line">
        {/* Drawer Header */}
        <div className="p-5 border-b border-line flex justify-between items-center bg-surface dark:bg-surface">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-forest text-surface flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 id="drawer-title" className="font-fraunces font-bold text-scale-20 text-ink">
                My Interest List
              </h2>
              <p className="text-[11px] text-muted">
                {totalQuantity} {totalQuantity === 1 ? "piece" : "pieces"} pledged
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
            aria-label="Close interest list"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Zero-Payment Callout */}
        <div className="p-3.5 mx-4 mt-4 rounded-xl bg-sand/60 dark:bg-sand/30 border border-line text-scale-12 text-ink flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="font-semibold text-terracotta">Pre-Launch Model:</strong> No
            payment or card needed today. Inquiries register your preferred design and size to
            reach our 1,000 unlock threshold.
          </p>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {interestList.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-sand/50 flex items-center justify-center text-muted">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="font-fraunces text-scale-16 font-semibold text-ink">
                Nothing picked yet
              </p>
              <p className="text-scale-12 text-muted max-w-xs">
                Explore our naturalist species designs and tap "I want this" to add your size to
                the launch ledger.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDrawerOpen(false)}
                className="mt-2"
              >
                Explore designs
              </Button>
            </div>
          ) : (
            interestList.map((item) => {
              const prod = products.find((p) => p.id === item.productId);
              if (!prod) return null;
              return (
                <InterestItemRow
                  key={`${item.productId}-${item.size}`}
                  item={item}
                  product={prod}
                  onUpdateQty={(q) => updateQuantity(item.productId, item.size, q)}
                  onRemove={() => removeFromInterestList(item.productId, item.size)}
                />
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        {interestList.length > 0 && (
          <div className="p-5 border-t border-line bg-surface dark:bg-surface space-y-3">
            <div className="flex justify-between items-baseline text-scale-14">
              <span className="text-muted">Total commitment today:</span>
              <span className="font-fraunces font-bold text-scale-20 text-forest dark:text-emerald-400">
                ₹0 (Free inquiry)
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md"
              onClick={() => {
                setIsDrawerOpen(false);
                setIsInquiryModalOpen(true);
              }}
            >
              Send my inquiry ({totalQuantity} {totalQuantity === 1 ? "design" : "designs"})
            </Button>
            <p className="text-[11px] text-center text-muted">
              Takes 30 seconds • We will notify you when production begins
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
