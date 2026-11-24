"use client";

import React, { useEffect, useRef } from "react";
import { X, Receipt, ShieldCheck, Info, Sparkles, CheckCircle2 } from "lucide-react";

interface TransparencyReceiptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  expectedPrice?: number;
}

export function TransparencyReceiptDrawer({
  isOpen,
  onClose,
  expectedPrice = 899,
}: TransparencyReceiptDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const costBreakdown = [
    {
      category: "1. Raw Materials",
      cost: 210,
      detail: "100% GOTS-certified long-staple organic cotton (180 GSM bio-washed combed jersey). Non-GMO, rain-fed Gujarat crop.",
      icon: "🌱",
    },
    {
      category: "2. Botanical & Water-Base Inks",
      cost: 95,
      detail: "4-pass breathable water-based screen discharge inks, natural plant pigments, and zero toxic PVC/phthalates.",
      icon: "🎨",
    },
    {
      category: "3. Fair-Wage Tailoring & Craft",
      cost: 280,
      detail: "Ethical craft cluster in Coimbatore / Tiruppur. Artisans earn 2.4× statutory minimum wage with full health coverage.",
      icon: "✂️",
    },
    {
      category: "4. Compostable Packaging & Trims",
      cost: 65,
      detail: "Plantable marigold seed-paper hangtags, organic cotton woven neck tags, 100% compostable cassava starch mailers.",
      icon: "📦",
    },
    {
      category: "5. Logistics, Hub Quality & Operations",
      cost: 249,
      detail: "Clean zero-plastic fulfillment, individual hand-inspection in Bengaluru, server infrastructure, GST (5%), and payment gateway fees at launch.",
      icon: "🚚",
    },
  ];

  const totalCalculated = costBreakdown.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transparency-drawer-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-surface dark:bg-surface border-l border-line h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest/10 dark:bg-emerald-950/40 text-forest dark:text-emerald-400 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-terracotta" />
            </div>
            <div>
              <h2 id="transparency-drawer-title" className="font-fraunces text-scale-20 font-bold text-ink">
                Cost Transparency
              </h2>
              <span className="text-[11px] text-muted uppercase tracking-wider block">
                Radical Open Ledger • ₹0 Secret Markup
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
            aria-label="Close cost drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Note Banner */}
          <div className="p-4 rounded-xl bg-sand/40 dark:bg-sand/20 border border-line space-y-2">
            <div className="flex items-center gap-2 text-forest dark:text-emerald-400 font-semibold text-scale-12">
              <ShieldCheck className="w-4 h-4 text-terracotta shrink-0" />
              <span>Why We Disclose Our Exact Costs</span>
            </div>
            <p className="text-scale-12 text-muted leading-relaxed">
              Traditional fashion brands mark up garments 5× to 8× to pay for luxury retail rent, billboards, and burned unsold inventory. Because KURMI operates on <strong>100% pre-order demand validation</strong>, we manufacture zero unsold excess and pass every rupee of efficiency to you.
            </p>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-4">
            <h3 className="text-scale-12 font-bold uppercase tracking-wider text-muted">
              Where Your ₹{expectedPrice} Goes
            </h3>

            {costBreakdown.map((item) => (
              <div
                key={item.category}
                className="p-3.5 rounded-xl border border-line bg-surface hover:border-forest/40 transition-colors space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-fraunces font-bold text-scale-14 text-ink flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.category}</span>
                  </span>
                  <span className="font-mono font-bold text-scale-14 text-forest dark:text-emerald-400">
                    ₹{item.cost}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Total Reconciliation */}
          <div className="p-4 rounded-xl bg-forest text-surface space-y-3 shadow-md">
            <div className="flex justify-between items-center pb-2 border-b border-surface/20">
              <span className="font-fraunces text-scale-16 font-bold">Total True Manufacturing Cost</span>
              <span className="font-mono text-scale-18 font-bold">₹{totalCalculated}</span>
            </div>
            <div className="flex justify-between items-center text-scale-12 text-surface/80">
              <span>Expected Supporter Drop Price</span>
              <span className="font-bold text-surface">₹{expectedPrice}</span>
            </div>
            <div className="flex justify-between items-center text-scale-12 text-amber-200">
              <span>Pre-Launch Demand Validation Subsidy</span>
              <span className="font-bold font-mono">₹{expectedPrice - totalCalculated}</span>
            </div>
            <p className="text-[10px] text-surface/75 leading-relaxed pt-1">
              * In Drop 01, KURMI covers any production variance to ensure founding backers receive the highest possible organic yarn quality at our guaranteed early price.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-sand/20 flex items-center justify-between">
          <span className="text-[11px] text-muted">Verified GOTS & Fair Trade compliant</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-surface border border-line text-scale-12 font-medium text-ink hover:bg-sand/50 transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
