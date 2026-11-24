"use client";

import React from "react";
import { COPY } from "@/data/copy";
import { ShieldCheck, Leaf, Coins } from "lucide-react";

export function WhyInquiriesSection() {
  const icons = [
    <Leaf key="1" className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    <ShieldCheck key="2" className="w-6 h-6 text-forest dark:text-emerald-400" />,
    <Coins key="3" className="w-6 h-6 text-terracotta" />,
  ];

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            {COPY.whyInquiries.tag}
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            {COPY.whyInquiries.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.whyInquiries.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-8 rounded-card bg-surface dark:bg-surface border border-line shadow-card hover:shadow-card-hover transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-sand/60 dark:bg-sand/30 flex items-center justify-center">
                {icons[idx]}
              </div>
              <h3 className="font-fraunces text-scale-20 font-bold text-ink">
                {pillar.title}
              </h3>
              <p className="text-scale-14 text-muted leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
