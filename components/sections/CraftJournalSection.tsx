"use client";

import React, { useState } from "react";
import { Trees, Sparkles, Sprout, Heart, ShieldCheck, UserCheck } from "lucide-react";

export function CraftJournalSection() {
  const [activePartner, setActivePartner] = useState<number>(0);

  const partners = [
    {
      name: "Murugesan & The Coimbatore Weaving Guild",
      role: "Circular Loom Master • 28 Years of Craft",
      location: "Coimbatore, Tamil Nadu",
      story: "Operating 100% solar-assisted circular knitting frames. Murugesan’s team monitors yarn tension to ensure perfect zero-torque tubular knits that never twist after washing.",
      image: "/products/owl/flat.jpg",
      quote: "When cotton is spun slow and steady with solar power, the yarn keeps its natural breath.",
    },
    {
      name: "Ramprasad & Sanganer Artisan Printmakers",
      role: "Lead Master Screen Puller • Bagru Heritage",
      location: "Bagru & Sanganer, Rajasthan",
      story: "Specialists in multi-screen water-permeable discharge printing. Using wooden squeegees, they hand-pull pigment directly into organic cotton cellulose rather than coating it in plastic.",
      image: "/products/fox/flat.jpg",
      quote: "A true print should breathe with your chest, not stick like melted rubber.",
    },
    {
      name: "Devjibhai & Saurashtra Bio-Farmers",
      role: "Regenerative Organic Farmer • 14 Acres",
      location: "Surendranagar, Gujarat",
      story: "Cultivating rain-fed organic Shankar-6 cotton with indigenous cow dung compost and neem seed extract. Zero synthetic chemical pesticides touch their soil.",
      image: "/products/hare/flat.jpg",
      quote: "Healthy living soil gives soft, resilient fibers that outlast fast-fashion.",
    },
  ];

  return (
    <section className="py-20 bg-surface dark:bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-scale-12 font-semibold uppercase tracking-widest text-terracotta flex items-center justify-center gap-1.5">
            <Trees className="w-4 h-4 text-forest dark:text-emerald-400" />
            Human Hands Behind The Wild
          </span>
          <h2 className="font-fraunces text-scale-28 md:text-scale-40 font-bold text-ink">
            Craft Journal & Artisan Spotlights
          </h2>
          <p className="text-scale-16 text-muted">
            Meet the master weavers, screen pullers, and regenerative farmers building Drop 01 with dignity and living wages.
          </p>
        </div>

        {/* Partner Spotlight Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-2xl border border-line bg-sand/20 dark:bg-sand/10 p-6 md:p-8">
          {/* Partner Photo & Quote (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand/30 border border-line shadow-sm">
              <img
                src={partners[activePartner].image}
                alt={partners[activePartner].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-xs text-[11px] font-semibold text-terracotta border border-line">
                {partners[activePartner].location}
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-surface border border-line italic text-scale-14 text-ink font-serif leading-relaxed">
              "{partners[activePartner].quote}"
            </blockquote>
          </div>

          {/* Partner Details & Selector (6 cols) */}
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-forest dark:text-emerald-400 block">
                {partners[activePartner].role}
              </span>
              <h3 className="font-fraunces text-scale-24 font-bold text-ink">
                {partners[activePartner].name}
              </h3>
              <p className="text-scale-14 text-muted leading-relaxed">
                {partners[activePartner].story}
              </p>
            </div>

            {/* Fair Wage Guarantee */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <div className="text-scale-12 text-emerald-900 dark:text-emerald-200">
                <span className="font-bold block">2.4× Living Wage Standard</span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">
                  All partners receive healthcare, overtime protection, and clean solar-powered facilities.
                </span>
              </div>
            </div>

            {/* Partner Switcher Tabs */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase text-muted block">
                Meet More Craft Custodians:
              </span>
              <div className="flex flex-wrap gap-2">
                {partners.map((p, idx) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setActivePartner(idx)}
                    className={`px-3 py-1.5 rounded-lg text-scale-12 font-medium transition-all ${
                      activePartner === idx
                        ? "bg-forest text-surface font-semibold shadow-xs"
                        : "bg-surface border border-line text-muted hover:text-ink"
                    }`}
                  >
                    {p.name.split(" ")[0]} ({p.location.split(",")[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sustainable Packaging & Unboxing Preview */}
        <div className="p-6 md:p-8 rounded-2xl border border-line bg-surface dark:bg-surface space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5" />
                Zero-Virgin-Plastic Unboxing
              </span>
              <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
                Packaging You Can Plant In Soil
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-scale-12 font-bold self-start md:self-auto">
              100% Home Compostable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-scale-12">
            <div className="p-4 rounded-xl border border-line bg-sand/30 dark:bg-sand/15 space-y-1.5">
              <span className="font-bold text-ink block">1. Plantable Seed-Paper Hangtag</span>
              <p className="text-muted leading-relaxed text-[11px]">
                Embedded with non-invasive Indian wild marigold seeds. Moisten and plant in a pot to bloom flowers for local pollinators.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-line bg-sand/30 dark:bg-sand/15 space-y-1.5">
              <span className="font-bold text-ink block">2. Cassava Starch Mailer Bag</span>
              <p className="text-muted leading-relaxed text-[11px]">
                Made from plant tapioca and vegetable oils. Dissolves in hot water within 3 minutes or composts in garden soil in 90 days.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-line bg-sand/30 dark:bg-sand/15 space-y-1.5">
              <span className="font-bold text-ink block">3. Organic Cotton Twine & Seal</span>
              <p className="text-muted leading-relaxed text-[11px]">
                Tied with raw unbleached cotton cord and sealed with natural water-activated kraft paper tape. Zero microplastic films.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
