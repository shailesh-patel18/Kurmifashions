"use client";

import React, { useState } from "react";
import { Scissors, Ruler, Sparkles, ShieldCheck, Check, Layers, Sliders } from "lucide-react";

export function GarmentAnatomy() {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [inputChest, setInputChest] = useState<number>(20); // inches flat width
  const [inputLength, setInputLength] = useState<number>(28); // inches length
  const [selectedGsm, setSelectedGsm] = useState<180 | 200 | 240>(180);

  const hotspots = [
    {
      title: "1×1 Lycra Ribbed Collar",
      subtitle: "Anti-Roll Construction",
      desc: "Blended with 3% natural rubber elasticity. Holds its sharp, flat profile wash after wash with zero unsightly baconing or neck sag.",
      x: "50%",
      y: "14%",
    },
    {
      title: "Herringbone Back Neck Tape",
      subtitle: "Zero Friction Seam",
      desc: "Clean-finished twill tape encases raw shoulder and collar seams, eliminating collar itch and anchoring neck drape against stretching.",
      x: "50%",
      y: "22%",
    },
    {
      title: "Seamless Tubular Knit Torso",
      subtitle: "Zero Side-Seam Chafing",
      desc: "Woven on vintage circular knitting looms. Seamless sides mean zero twisting after washing and absolute freedom of movement.",
      x: "72%",
      y: "55%",
    },
    {
      title: "Double-Needle Blind Hem",
      subtitle: "Industrial Reinforcement",
      desc: "4-thread lockstitch with high-tensile core-spun organic thread. Will not unravel even after years of rugged outdoor wear.",
      x: "50%",
      y: "90%",
    },
    {
      title: "Bio-Polished Ring-Spun Cotton",
      subtitle: "100% GOTS Organic Cellulose",
      desc: "Treated with natural cellulase enzymes to dissolve stray micro-fuzz. Leaves a silky, cool handfeel that breathes naturally in summer heat.",
      x: "30%",
      y: "45%",
    },
  ];

  // Sizing comparison calculator
  const calculateRecommendedSize = (chest: number) => {
    if (chest <= 18.5) return "XS (36\" chest)";
    if (chest <= 19.5) return "S (38\" chest)";
    if (chest <= 20.75) return "M (40\" chest)";
    if (chest <= 22) return "L (42\" chest)";
    if (chest <= 23.5) return "XL (44\" chest)";
    return "XXL (46\" chest)";
  };

  const gsmDetails = {
    180: {
      label: "180 GSM Midweight",
      feel: "Silky, breathable everyday drape. Ideal for warm Indian summers and all-day outdoor comfort.",
      bestFor: "Day-to-day exploring, travel, and warm climates",
    },
    200: {
      label: "200 GSM Heavy-Knit",
      feel: "Substantial, structured vintage handfeel. Holds an architectural boxy silhouette with zero sheer.",
      bestFor: "Oversized styling, cool monsoon evenings, and layering",
    },
    240: {
      label: "240 GSM Field Jersey",
      feel: "Ultra-heavyweight winter-grade knit. Bulletproof durability built for rugged high-altitude trails.",
      bestFor: "High-altitude treks, winter field expeditions, and heavy chore shirts",
    },
  };

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5" />
            Naturalist Tailoring Science
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Garment Anatomy & Perfect Fit Engine
          </h3>
          <p className="text-scale-12 text-muted">
            Inspect every stitch, compare with your favorite t-shirt, and understand true heirloom textile engineering.
          </p>
        </div>

        {/* Pre-Shrunk Assurance Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/60 border border-line text-scale-12 font-semibold text-forest dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-terracotta" />
          <span>Pre-Shrunk &lt;1.2% Loss Guaranteed</span>
        </div>
      </div>

      {/* Part 1: Interactive Garment Anatomy Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Diagram Area with Interactive Hotspots (6 cols) */}
        <div className="md:col-span-6 relative aspect-[4/5] rounded-2xl bg-sand/30 dark:bg-sand/15 border border-line flex items-center justify-center p-6 overflow-hidden">
          {/* T-Shirt Silhouette Outline */}
          <svg
            className="w-full h-full text-sand/80 dark:text-sand/30 filter drop-shadow-sm"
            viewBox="0 0 200 240"
            fill="currentColor"
          >
            <path d="M 60,10 C 75,30 125,30 140,10 L 190,50 L 165,85 L 145,70 L 145,225 L 55,225 L 55,70 L 35,85 L 10,50 Z" />
          </svg>

          {/* Interactive Hotspot Buttons */}
          {hotspots.map((spot, idx) => (
            <button
              key={spot.title}
              type="button"
              onClick={() => setActiveHotspot(idx)}
              style={{ left: spot.x, top: spot.y }}
              aria-label={`Inspect ${spot.title}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                activeHotspot === idx
                  ? "bg-forest text-surface ring-4 ring-forest/30 scale-125 z-10 shadow-lg"
                  : "bg-surface text-ink border-2 border-forest hover:scale-110"
              }`}
            >
              <span className="text-[11px] font-bold font-mono">0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Hotspot Detailed Callout Card (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-sand/40 dark:bg-sand/20 border-2 border-forest/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-terracotta uppercase tracking-widest">
                ANATOMY SPEC #0{activeHotspot + 1}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-forest text-surface text-[10px] font-bold">
                Master Craft
              </span>
            </div>

            <h4 className="font-fraunces text-scale-20 font-bold text-ink">
              {hotspots[activeHotspot].title}
            </h4>
            <p className="text-scale-12 font-medium text-forest dark:text-emerald-400">
              {hotspots[activeHotspot].subtitle}
            </p>
            <p className="text-scale-14 text-muted leading-relaxed">
              {hotspots[activeHotspot].desc}
            </p>
          </div>

          {/* Hotspot Switcher Buttons */}
          <div className="flex flex-wrap gap-2">
            {hotspots.map((spot, idx) => (
              <button
                key={spot.title}
                type="button"
                onClick={() => setActiveHotspot(idx)}
                className={`px-3 py-1.5 rounded-lg text-scale-12 font-medium transition-all ${
                  activeHotspot === idx
                    ? "bg-forest text-surface"
                    : "bg-sand/40 text-muted hover:text-ink border border-line"
                }`}
              >
                0{idx + 1}. {spot.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: "Compare with Your Favorite Tee" & GSM Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-line">
        {/* Compare Your Favorite Tee */}
        <div className="p-5 rounded-xl border border-line bg-sand/20 dark:bg-sand/10 space-y-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-terracotta" />
            <h4 className="font-fraunces font-bold text-scale-16 text-ink">
              Compare With Your Favorite Tee
            </h4>
          </div>
          <p className="text-[11px] text-muted">
            Lay your favorite t-shirt flat on a table and measure armpit-to-armpit in inches:
          </p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-scale-12 mb-1">
                <span className="font-medium text-ink">Flat Chest Width:</span>
                <span className="font-mono font-bold text-forest dark:text-emerald-400">{inputChest} inches</span>
              </div>
              <input
                type="range"
                min="17"
                max="26"
                step="0.5"
                value={inputChest}
                onChange={(e) => setInputChest(Number(e.target.value))}
                className="w-full accent-forest cursor-pointer"
              />
            </div>

            {/* Calculated Match */}
            <div className="p-3 rounded-lg bg-surface border border-line flex items-center justify-between">
              <span className="text-scale-12 text-muted">Your Perfect KURMI Match:</span>
              <span className="font-fraunces font-bold text-scale-16 text-terracotta">
                {calculateRecommendedSize(inputChest)}
              </span>
            </div>
          </div>
        </div>

        {/* GSM Gauge Selector */}
        <div className="p-5 rounded-xl border border-line bg-sand/20 dark:bg-sand/10 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-forest dark:text-emerald-400" />
            <h4 className="font-fraunces font-bold text-scale-16 text-ink">
              Textile Weight & GSM Gauge
            </h4>
          </div>

          <div className="flex gap-2">
            {([180, 200, 240] as const).map((gsm) => (
              <button
                key={gsm}
                type="button"
                onClick={() => setSelectedGsm(gsm)}
                className={`flex-1 py-1.5 rounded-lg text-scale-12 font-bold font-mono transition-all ${
                  selectedGsm === gsm
                    ? "bg-forest text-surface ring-2 ring-forest/30"
                    : "bg-surface border border-line text-muted hover:text-ink"
                }`}
              >
                {gsm} GSM
              </button>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-surface border border-line space-y-1 text-scale-12">
            <span className="font-bold text-ink block">{gsmDetails[selectedGsm].label}</span>
            <p className="text-[11px] text-muted">{gsmDetails[selectedGsm].feel}</p>
            <span className="text-[10px] text-forest dark:text-emerald-400 font-semibold block pt-1">
              Best for: {gsmDetails[selectedGsm].bestFor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
