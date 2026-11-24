"use client";

import React, { useEffect, useRef } from "react";
import { X, Droplets, Wind, ShieldCheck, TreePine, Leaf, Sparkles } from "lucide-react";

interface ImpactReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  pledgedCount?: number;
}

export function ImpactReceiptModal({
  isOpen,
  onClose,
  pledgedCount = 1,
}: ImpactReceiptModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const waterSavedPerUnit = 1420; // Liters saved vs conventional cotton tee
  const co2eSavedPerUnit = 2.1; // kg CO2e saved vs virgin polyester/fast-fashion
  const pesticideGramsSaved = 120; // grams chemical defoliants avoided

  const totalWater = waterSavedPerUnit * pledgedCount;
  const totalCo2 = (co2eSavedPerUnit * pledgedCount).toFixed(1);
  const totalPesticide = pesticideGramsSaved * pledgedCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="impact-receipt-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface dark:bg-surface rounded-card border border-line shadow-2xl p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
          aria-label="Close impact modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5" />
            Ecological Accounting • Field Audit
          </span>
          <h2 id="impact-receipt-title" className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Environmental Impact Receipt
          </h2>
          <p className="text-scale-14 text-muted mt-1">
            What your made-to-demand choice saves across Earth’s watersheds and air.
          </p>
        </div>

        {/* 3 Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center space-y-1">
            <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            <span className="font-fraunces text-scale-20 font-bold text-blue-950 dark:text-blue-200 block">
              {totalWater.toLocaleString()} L
            </span>
            <span className="text-[11px] text-blue-800 dark:text-blue-300 font-medium block">
              Freshwater Conserved
            </span>
            <span className="text-[9px] text-muted block">
              Rain-fed organic irrigation
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <Wind className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <span className="font-fraunces text-scale-20 font-bold text-emerald-950 dark:text-emerald-200 block">
              {totalCo2} kg
            </span>
            <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium block">
              CO₂e Emissions Averted
            </span>
            <span className="text-[9px] text-muted block">
              Zero petrochemical yarn
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center space-y-1">
            <TreePine className="w-5 h-5 text-amber-700 dark:text-amber-400 mx-auto" />
            <span className="font-fraunces text-scale-20 font-bold text-amber-950 dark:text-amber-200 block">
              {totalPesticide} g
            </span>
            <span className="text-[11px] text-amber-800 dark:text-amber-300 font-medium block">
              Synthetic Chemicals 0%
            </span>
            <span className="text-[9px] text-muted block">
              Pure botanical farming
            </span>
          </div>
        </div>

        {/* Detailed Impact Breakdown */}
        <div className="space-y-3.5 mb-6 text-scale-12">
          <div className="p-3.5 rounded-xl border border-line bg-sand/30 dark:bg-sand/10 space-y-1">
            <div className="flex justify-between font-semibold text-ink">
              <span>Zero Unsold Landfill Promise</span>
              <span className="text-forest dark:text-emerald-400">100% Demand Match</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Fast fashion dumps over 92 million tons of clothes into Atacama & African landfills annually. Because we start loom production only after 1,000 inquiries, <strong>zero garments are made to be trashed</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-line bg-sand/30 dark:bg-sand/10 space-y-1">
            <div className="flex justify-between font-semibold text-ink">
              <span>Microplastic Shedding Index</span>
              <span className="text-forest dark:text-emerald-400">0.00% Synthetic</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Polyester tees release ~700,000 plastic microfibers per laundry wash into our oceans. Every KURMI garment is 100% natural cellulose cotton that biodegrades safely in soil within 5–6 months.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-line bg-sand/30 dark:bg-sand/10 space-y-1">
            <div className="flex justify-between font-semibold text-ink">
              <span>Plantable Seed Paper Packaging</span>
              <span className="text-forest dark:text-emerald-400">Wild Marigolds</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Your hangtag is embedded with non-invasive native marigold seeds. Moisten in soil to sprout fresh flowers that nourish local honeybees and butterflies.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-full bg-forest text-surface font-semibold text-scale-12 hover:bg-forest/90 transition-colors"
        >
          Back to Field Guide
        </button>
      </div>
    </div>
  );
}
