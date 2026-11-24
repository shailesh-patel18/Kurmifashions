"use client";

import React, { useState } from "react";
import { MapPin, Users, Sparkles, Compass } from "lucide-react";
import { useKurmi } from "@/lib/context";

interface CityHub {
  city: string;
  state: string;
  supporters: number;
  favSpecies: string;
  x: number; // percentage
  y: number; // percentage
}

export function IndiaBackerMap() {
  const { stats } = useKurmi();
  const [selectedHub, setSelectedHub] = useState<CityHub | null>(null);

  const hubs: CityHub[] = [
    { city: "Bengaluru", state: "Karnataka", supporters: 142, favSpecies: "Humpback Drift", x: 42, y: 78 },
    { city: "Mumbai", state: "Maharashtra", supporters: 98, favSpecies: "Midnight Moth", x: 28, y: 58 },
    { city: "Delhi NCR", state: "Delhi", supporters: 112, favSpecies: "Fox in the Pines", x: 40, y: 32 },
    { city: "Pune", state: "Maharashtra", supporters: 64, favSpecies: "Tiger Lily", x: 30, y: 62 },
    { city: "Jaipur", state: "Rajasthan", supporters: 45, favSpecies: "Fox in the Pines", x: 32, y: 38 },
    { city: "Coimbatore", state: "Tamil Nadu", supporters: 38, favSpecies: "Night Owl", x: 40, y: 84 },
    { city: "Kolkata", state: "West Bengal", supporters: 29, favSpecies: "Midnight Moth", x: 74, y: 48 },
    { city: "Shimla", state: "Himachal Pradesh", supporters: 22, favSpecies: "Mountain Hare", x: 42, y: 24 },
  ];

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Live Geographic Ledger
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Supporter Hubs Across India
          </h3>
          <p className="text-scale-12 text-muted">
            Tap a hub to see genuine community demand clusters backing our first zero-waste drop.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 dark:bg-emerald-950/40 text-forest dark:text-emerald-400 border border-forest/30 text-scale-12 font-semibold">
          <Users className="w-4 h-4 text-terracotta" />
          <span>8 Active City Corridors</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Map Stage (7 cols) */}
        <div className="md:col-span-7 relative aspect-[4/5] sm:aspect-square rounded-2xl bg-sand/30 dark:bg-sand/15 border border-line flex items-center justify-center p-4 overflow-hidden">
          {/* Stylized SVG Map of India Outline */}
          <svg
            className="w-full h-full text-sand/60 dark:text-sand/25 stroke-line"
            viewBox="0 0 400 450"
            fill="currentColor"
            strokeWidth="1.5"
          >
            {/* India simplified silhouette polygon */}
            <path d="M 170,30 L 210,50 L 240,90 L 220,120 L 250,150 L 320,170 L 360,160 L 370,180 L 320,200 L 290,200 L 280,240 L 240,280 L 210,340 L 190,420 L 170,410 L 150,330 L 120,280 L 100,240 L 90,210 L 110,180 L 140,150 L 130,110 L 160,70 Z" />
          </svg>

          {/* Interactive City Hub Markers */}
          {hubs.map((hub) => (
            <button
              key={hub.city}
              type="button"
              onClick={() => setSelectedHub(hub)}
              style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
              title={`${hub.city}: ${hub.supporters} supporters`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
            >
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-forest border-2 border-surface dark:border-ink shadow-sm" />
              </span>
              <span className="absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-xs border border-line text-[10px] font-bold text-ink whitespace-nowrap shadow-xs group-hover:scale-110 transition-transform">
                {hub.city}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Hub Detail Card (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-sand/40 dark:bg-sand/20 border border-line space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-line/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-terracotta" />
                <div>
                  <h4 className="font-fraunces font-bold text-scale-20 text-ink">
                    {selectedHub ? selectedHub.city : "Pan-India Corridor"}
                  </h4>
                  <span className="text-[11px] text-muted block">
                    {selectedHub ? selectedHub.state : "Top Supporter Clusters"}
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-forest text-surface font-fraunces font-bold text-scale-16">
                {selectedHub ? `${selectedHub.supporters} Backers` : "550+ Pledged"}
              </span>
            </div>

            <div className="space-y-2 text-scale-12">
              <div className="flex justify-between">
                <span className="text-muted">Most Inquired Specimen:</span>
                <span className="font-semibold text-ink">
                  {selectedHub ? selectedHub.favSpecies : "Fox in the Pines"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Drop Delivery Priority:</span>
                <span className="font-semibold text-forest dark:text-emerald-400">Direct Courier Corridor</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Pledge Cost:</span>
                <span className="font-semibold text-terracotta">₹0 Pre-order</span>
              </div>
            </div>

            <p className="text-[11px] text-muted leading-relaxed pt-2 border-t border-line/60">
              {selectedHub
                ? `Supporters from ${selectedHub.city} have pledged interest in sustainable wildlife apparel. When the 1,000 national goal unlocks, your reserved size is batch-produced first.`
                : "Select any glowing hub on the map to inspect regional wildlife design preferences."}
            </p>
          </div>

          {/* Quick Hub Quick-Select List */}
          <div className="flex flex-wrap gap-1.5">
            {hubs.slice(0, 5).map((h) => (
              <button
                key={h.city}
                type="button"
                onClick={() => setSelectedHub(h)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  selectedHub?.city === h.city
                    ? "bg-forest text-surface font-semibold"
                    : "bg-surface border border-line text-muted hover:text-ink"
                }`}
              >
                {h.city} ({h.supporters})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
