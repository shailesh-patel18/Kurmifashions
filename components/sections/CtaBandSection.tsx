"use client";

import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { COPY } from "@/data/copy";
import { useKurmi } from "@/lib/context";

export function CtaBandSection() {
  const { stats, interestList, setIsInquiryModalOpen } = useKurmi();

  const handleJoin = () => {
    if (interestList.length > 0) {
      setIsInquiryModalOpen(true);
    } else {
      document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-20 bg-forest text-surface relative overflow-hidden">
      {/* Background Subtle Wave Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1000 300" className="w-full h-full object-cover" fill="none">
          <path d="M0 150 Q250 50 500 150 T1000 150" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M0 200 Q250 100 500 200 T1000 200" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
            {COPY.ctaBand.tag}
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold leading-tight">
            {COPY.ctaBand.title}
          </h2>
          <p className="text-scale-16 text-emerald-100/90 max-w-xl mx-auto">
            {COPY.ctaBand.subtitle}
          </p>
        </div>

        {/* Live Progress Bar Container */}
        <div className="max-w-md mx-auto p-4 rounded-card bg-surface/10 backdrop-blur-md border border-white/20">
          <ProgressBar current={stats.totalSupporters} goal={1000} showLabels={true} />
        </div>

        <div>
          <Button
            variant="secondary"
            size="lg"
            className="shadow-xl px-10 text-scale-16"
            onClick={handleJoin}
          >
            {COPY.ctaBand.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
