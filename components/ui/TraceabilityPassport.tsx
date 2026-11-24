"use client";

import React, { useState } from "react";
import { Compass, MapPin, ShieldCheck, CheckCircle2, Hammer, HeartHandshake } from "lucide-react";

export function TraceabilityPassport() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const provenanceSteps = [
    {
      stage: "1. Organic Cotton Cultivation",
      location: "Rajkot & Surendranagar, Gujarat",
      partner: "Kisan Bio-Cotton Collective",
      detail: "Rain-fed non-GMO hybrid Shankar-6 organic cotton cultivated without synthetic pesticides or chemical defoliants.",
      coords: "22.3039° N, 70.8022° E",
      cert: "GOTS (CU 849201)",
    },
    {
      stage: "2. Solar Spinning & Knitting",
      location: "Coimbatore & Tiruppur, Tamil Nadu",
      partner: "Vayu Eco-Spinning Guild",
      detail: "100% solar and wind-powered ring spinning spindles. Combed 32s count jersey bio-washed with natural fruit pectin enzymes.",
      coords: "11.0168° N, 76.9558° E",
      cert: "OEKO-TEX Standard 100",
    },
    {
      stage: "3. Botanical Dye & Screen-Printing",
      location: "Sanganer & Bagru, Rajasthan",
      partner: "Prithvi Artisan Screen Workshop",
      detail: "Hand-aligned multi-screen discharge printing using non-toxic water-permeable pigments and plant tannins. Closed-loop effluent filtration.",
      coords: "26.8206° N, 75.7681° E",
      cert: "Zero Liquid Discharge (ZLD)",
    },
    {
      stage: "4. Quality Inspection & Hub Dispatch",
      location: "Indiranagar, Bengaluru, Karnataka",
      partner: "KURMI Field Lab & Dispatch Hub",
      detail: "Every single piece inspected for seam tolerance, tagged with seed paper, and packed in 100% compostable cassava bags.",
      coords: "12.9716° N, 77.5946° E",
      cert: "DPDP & Fair Craft Verified",
    },
  ];

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Field Provenance Map
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Traceability Passport
          </h3>
          <p className="text-scale-12 text-muted">
            Trace your garment’s journey across India: from organic seed to artisan screen print.
          </p>
        </div>

        {/* Repair Guarantee Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 dark:bg-emerald-950/40 text-forest dark:text-emerald-300 border border-forest/30 text-scale-12 font-semibold">
          <HeartHandshake className="w-4 h-4 text-terracotta" />
          <span>2-Year Stitch Repair Promise</span>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {provenanceSteps.map((step, idx) => (
          <button
            key={step.stage}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStep === idx
                ? "border-forest bg-forest/5 dark:bg-emerald-950/20 ring-1 ring-forest shadow-xs"
                : "border-line bg-surface hover:border-forest/40"
            }`}
          >
            <span className="text-[10px] font-mono text-muted block mb-1">STAGE 0{idx + 1}</span>
            <span className="font-semibold text-scale-12 text-ink block truncate">{step.stage.split(". ")[1]}</span>
            <span className="text-[11px] text-muted block truncate">{step.location.split(",")[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Stage Detailed View */}
      <div className="p-5 rounded-xl bg-sand/30 dark:bg-sand/10 border border-line space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line/60">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta" />
              <h4 className="font-fraunces font-bold text-scale-18 text-ink">
                {provenanceSteps[activeStep].location}
              </h4>
            </div>
            <p className="text-scale-12 font-medium text-forest dark:text-emerald-400 mt-0.5">
              Partner: {provenanceSteps[activeStep].partner}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-muted block">GEOGRAPHIC COORDINATES</span>
            <span className="text-scale-12 font-mono font-semibold text-ink">
              {provenanceSteps[activeStep].coords}
            </span>
          </div>
        </div>

        <p className="text-scale-14 text-ink leading-relaxed">
          {provenanceSteps[activeStep].detail}
        </p>

        <div className="flex items-center justify-between pt-2 text-[11px]">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest dark:text-emerald-400" />
            Certification: {provenanceSteps[activeStep].cert}
          </span>
          <span className="text-muted">100% Audited Supply Chain</span>
        </div>
      </div>

      {/* Repair & Longevity Pledge Banner */}
      <div className="p-4 rounded-xl bg-surface border border-line/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-scale-12">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sand/60 text-forest flex items-center justify-center shrink-0">
            <Hammer className="w-4 h-4 text-terracotta" />
          </div>
          <div>
            <span className="font-semibold text-ink block">Heirloom Craft Warranty</span>
            <span className="text-muted block text-[11px]">
              Every shirt includes extra spare wooden buttons & organic repair thread in the pocket.
            </span>
          </div>
        </div>
        <span className="text-forest dark:text-emerald-400 font-semibold uppercase text-[11px] shrink-0">
          Built for 10+ Years
        </span>
      </div>
    </div>
  );
}
