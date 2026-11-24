"use client";

import React from "react";
import { CheckCircle2, Lock, Gift, Sparkles, Sprout, Stamp } from "lucide-react";
import { useKurmi } from "@/lib/context";

export function MilestoneRoadmap() {
  const { stats } = useKurmi();
  const currentCount = stats.totalSupporters;

  const milestones = [
    {
      target: 250,
      title: "Founding 250 Milestone",
      reward: "Plantable Wildflower Seed Tags",
      desc: "Every garment tag embedded with non-GMO Indian marigold & basil seeds ready to plant.",
      icon: <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      achieved: currentCount >= 250,
    },
    {
      target: 500,
      title: "Halfway Community Unlock",
      reward: "Signed Archival Art Postcard Pack",
      desc: "A collector's 6-piece wildlife art print set on 300 GSM textured archival paper included free.",
      icon: <Gift className="w-5 h-5 text-terracotta" />,
      achieved: currentCount >= 500,
    },
    {
      target: 750,
      title: "75% Threshold Milestone",
      reward: "Embroidered Sleeve Heritage Patch",
      desc: "Exclusive woven sleeve crest marking the garment as a verified Drop 01 founding piece.",
      icon: <Stamp className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      achieved: currentCount >= 750,
    },
    {
      target: 1000,
      title: "1,000 Unlocks Manufacturing",
      reward: "Batch 01 Production Commences!",
      desc: "Looms and organic cotton dye baths are booked; supporters get first reserved batch access.",
      icon: <Sparkles className="w-5 h-5 text-forest dark:text-emerald-300" />,
      achieved: currentCount >= 1000,
    },
  ];

  return (
    <section className="w-full py-16 bg-surface/50 dark:bg-sand/10 border-y border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            COMMUNITY UNLOCK ROADMAP
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            Milestone Perks for Early Supporters
          </h2>
          <p className="text-scale-16 text-muted">
            The more wildlife enthusiasts pledge their inquiries, the more exclusive sustainable upgrades are unlocked for the entire community.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div
              key={m.target}
              className={`p-6 rounded-card border transition-all duration-300 relative flex flex-col justify-between ${
                m.achieved
                  ? "bg-surface dark:bg-surface border-forest ring-1 ring-forest/30 shadow-card"
                  : "bg-surface/60 dark:bg-surface/40 border-line/80 opacity-90"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-sand/80 text-[11px] font-bold text-ink">
                    {m.target} Supporters
                  </span>
                  <div className="w-10 h-10 rounded-full bg-sand/60 flex items-center justify-center">
                    {m.icon}
                  </div>
                </div>

                <h3 className="font-fraunces font-bold text-scale-18 text-ink mb-1">
                  {m.reward}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2">
                  {m.title}
                </p>
                <p className="text-scale-12 text-muted leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-scale-12">
                <span className="font-medium text-ink">
                  {m.achieved ? "Unlocked!" : `${Math.max(0, m.target - currentCount)} to unlock`}
                </span>
                {m.achieved ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-muted font-medium">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
