"use client";

import React from "react";
import { Sparkles, Compass, CheckCircle2 } from "lucide-react";
import { COPY } from "@/data/copy";
import { PinesDivider } from "../illustrations/SectionDividers";

export function HowItWorksSection() {
  const icons = [
    <Compass key="1" className="w-6 h-6 text-terracotta" />,
    <Sparkles key="2" className="w-6 h-6 text-forest dark:text-emerald-400" />,
    <CheckCircle2 key="3" className="w-6 h-6 text-terracotta" />,
  ];

  return (
    <section id="how-it-works" className="relative w-full py-20 bg-sand/30 dark:bg-sand/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            {COPY.howItWorks.tag}
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            {COPY.howItWorks.title}
          </h2>
          <p className="text-scale-16 text-muted leading-relaxed">
            {COPY.howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {COPY.howItWorks.steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative p-8 rounded-card bg-surface dark:bg-surface border border-line shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-fraunces text-scale-28 font-bold text-muted/40">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-sand/60 dark:bg-sand/40 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                </div>

                <h3 className="font-fraunces text-scale-20 font-bold text-ink mb-2">
                  {step.title}
                </h3>

                <p className="text-scale-14 text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <span className="text-[11px] font-semibold text-terracotta tracking-wider uppercase">
                  {idx === 0
                    ? "Specimen selection"
                    : idx === 1
                    ? "₹0 No-risk ledger"
                    : "Sustainably unlocked"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
