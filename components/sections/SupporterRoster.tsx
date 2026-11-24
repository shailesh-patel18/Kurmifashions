"use client";

import React from "react";
import { Users, MapPin, ShieldCheck, Heart } from "lucide-react";

export function SupporterRoster() {
  const supporters = [
    { num: "#1", name: "Aarav Sharma", city: "Bengaluru", species: "Fox in the Pines", size: "M" },
    { num: "#2", name: "Rhea Mukherjee", city: "Mumbai", species: "Night Owl Vigil", size: "L" },
    { num: "#3", name: "Vikram Deewan", city: "Dehradun", species: "Humpback Drift", size: "XL" },
    { num: "#4", name: "Ananya Patil", city: "Pune", species: "Mountain Hare", size: "S" },
    { num: "#5", name: "Kabir Thapar", city: "Gurugram", species: "Midnight Silk Moth", size: "L" },
    { num: "#6", name: "Sneha Kurian", city: "Kochi", species: "Tiger Lily & Leopard", size: "M" },
    { num: "#7", name: "Rohan Deshmukh", city: "Hyderabad", species: "Fox in the Pines", size: "XXL" },
    { num: "#8", name: "Tanya Sen", city: "Kolkata", species: "Night Owl Vigil", size: "S" },
  ];

  return (
    <section className="w-full py-16 bg-sand/20 dark:bg-sand/10 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
              FOUNDING NATURALISTS LEDGER
            </span>
            <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
              Drop 01 Community Roster
            </h2>
            <p className="text-scale-14 text-muted max-w-xl">
              Real nature lovers across India who have pledged their design preference to bring this collection to life.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-line text-scale-12 font-semibold text-forest dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-terracotta" />
            <span>100% DPDP Verified • Voluntary Opt-In</span>
          </div>
        </div>

        {/* Roster Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {supporters.map((s) => (
            <div
              key={s.num}
              className="p-4 rounded-xl bg-surface border border-line shadow-xs space-y-2 hover:border-terracotta/40 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-scale-12 font-bold text-terracotta">
                  {s.num}
                </span>
                <span className="text-[10px] text-muted flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" />
                  {s.city}
                </span>
              </div>
              <p className="font-fraunces font-bold text-scale-14 text-ink truncate">
                {s.name}
              </p>
              <p className="text-[11px] text-muted truncate">
                {s.species} ({s.size})
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
