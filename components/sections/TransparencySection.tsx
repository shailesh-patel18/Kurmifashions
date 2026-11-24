"use client";

import React, { useState } from "react";
import { Receipt, Droplets, ShieldCheck, ZoomIn, Compass } from "lucide-react";
import { TransparencyReceiptDrawer } from "../ui/TransparencyReceiptDrawer";
import { ImpactReceiptModal } from "../ui/ImpactReceiptModal";
import { TextileMicroscope } from "../ui/TextileMicroscope";
import { TraceabilityPassport } from "../ui/TraceabilityPassport";

export function TransparencySection() {
  const [isCostDrawerOpen, setIsCostDrawerOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);

  return (
    <section
      id="transparency"
      className="py-16 md:py-24 bg-sand/30 dark:bg-sand/10 border-y border-line"
      aria-label="Radical cost and ecological transparency"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-scale-12 font-semibold uppercase tracking-widest text-terracotta flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-forest dark:text-emerald-400" />
            Radical Transparency Code
          </span>
          <h2 className="font-fraunces text-scale-28 md:text-scale-40 font-bold text-ink">
            No Secret Markups. No Mystery Fibers.
          </h2>
          <p className="text-scale-16 text-muted leading-relaxed">
            Most fashion labels hide behind opaque markups and synthetic blends. At KURMI, every rupee of production cost, every farm coordinate, and every drop of water saved is published openly.
          </p>

          {/* Quick Action Triggers */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsCostDrawerOpen(true)}
              className="h-11 px-5 rounded-full bg-forest text-surface font-semibold text-scale-12 flex items-center gap-2 hover:bg-forest/90 transition-all shadow-sm"
            >
              <Receipt className="w-4 h-4 text-amber-300" />
              <span>Open Cost Breakdown (₹899 Ledger)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsImpactModalOpen(true)}
              className="h-11 px-5 rounded-full bg-surface dark:bg-surface border border-line hover:border-emerald-500 text-ink font-semibold text-scale-12 flex items-center gap-2 transition-all shadow-xs"
            >
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Calculate Eco Impact Saved</span>
            </button>
          </div>
        </div>

        {/* 2 Interactive Components: Textile Microscope & Traceability Passport */}
        <div className="space-y-8">
          <TextileMicroscope />
          <TraceabilityPassport />
        </div>
      </div>

      {/* Drawers / Modals */}
      <TransparencyReceiptDrawer
        isOpen={isCostDrawerOpen}
        onClose={() => setIsCostDrawerOpen(false)}
      />

      <ImpactReceiptModal
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
      />
    </section>
  );
}
