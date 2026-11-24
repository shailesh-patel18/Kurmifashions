"use client";

import React, { useState } from "react";
import { Sparkles, Share2, Download, Copy, ShieldCheck, Award } from "lucide-react";
import { useKurmi } from "@/lib/context";

export function SocialStoryCard() {
  const { stats, supporterNumber } = useKurmi();
  const [copied, setCopied] = useState(false);

  const passNumber = supporterNumber || 142;
  const referralCode = `KURMI-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const handleCopy = () => {
    const text = `I just joined as Supporter #${passNumber} for KURMI.FASHIONS first wildlife apparel drop! Reserve your size at ₹0: https://kurmi.fashions?ref=${referralCode}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Social Field Pass • 9:16 Story
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Share Your Digital Field Pass
          </h3>
          <p className="text-scale-12 text-muted">
            Share your serialized backer badge on Instagram, WhatsApp Stories, or X to unlock priority manufacturing tiers.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="h-10 px-4 rounded-full bg-forest text-surface font-semibold text-scale-12 flex items-center gap-2 hover:bg-forest/90 transition-colors shadow-sm self-start md:self-auto"
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? "Story Link Copied!" : "Copy Story Text"}</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
        {/* 9:16 Mobile Story Preview Card */}
        <div className="relative w-64 aspect-[9/16] rounded-3xl bg-gradient-to-b from-forest via-[#16291D] to-ink p-5 text-surface border-4 border-sand/40 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Top Logo & Pass Header */}
          <div className="space-y-3 z-10">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-surface/30">
                <img src="/images/kurmi-logo.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-surface/20 text-surface text-[10px] font-mono font-bold backdrop-blur-xs">
                DROP 01 • SPECIMEN
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-widest text-amber-200 block font-semibold">
                Official Backer Field Pass
              </span>
              <h4 className="font-fraunces text-scale-24 font-bold leading-tight">
                Supporter #{passNumber}
              </h4>
            </div>
          </div>

          {/* Center Graphic: Lion Specimen */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-surface/20 shadow-lg my-auto">
            <img
              src="/images/hero-lions.jpg"
              alt="Kurmi Asiatic Lion Specimen"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-ink/80 backdrop-blur-xs text-[9px] font-semibold text-amber-200">
              Gir Forest • Specimen 00
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="space-y-2 z-10 pt-2 border-t border-surface/20 text-center">
            <p className="text-[10px] text-surface/80">
              "Wear the wild. Carry the calm."
            </p>
            <div className="p-2 rounded-xl bg-surface/15 backdrop-blur-xs text-[10px] font-mono flex justify-between items-center">
              <span>INVITE: {referralCode}</span>
              <span className="font-bold text-amber-300">₹0 TO RESERVE</span>
            </div>
            <span className="text-[9px] text-surface/60 block">
              kurmi.fashions • 100% Demand-Validated
            </span>
          </div>

          {/* Subtle Ambient Background Grain */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-terracotta/20 blur-3xl pointer-events-none" />
        </div>

        {/* Perks & Referral Milestones Explanation */}
        <div className="max-w-md space-y-4">
          <div className="p-4 rounded-xl bg-sand/30 dark:bg-sand/15 border border-line space-y-2 text-scale-12">
            <span className="font-bold text-ink block flex items-center gap-1.5">
              <Award className="w-4 h-4 text-terracotta" />
              Why Share Your Pass?
            </span>
            <p className="text-muted leading-relaxed text-[11px]">
              Every friend who enters your code reserves their size at ₹0 and counts toward our 1,000 community milestone. When they join, your priority dispatch queue moves up automatically.
            </p>
          </div>

          <div className="space-y-2 text-scale-12">
            <div className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center">
              <span className="font-medium text-ink">1 Friend Referred:</span>
              <span className="text-forest dark:text-emerald-400 font-semibold text-[11px]">Priority Dispatch Batch</span>
            </div>
            <div className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center">
              <span className="font-medium text-ink">3 Friends Referred:</span>
              <span className="text-forest dark:text-emerald-400 font-semibold text-[11px]">Complimentary Organic Field Tote</span>
            </div>
            <div className="p-3 rounded-lg bg-surface border border-line flex justify-between items-center">
              <span className="font-medium text-ink">5 Friends Referred:</span>
              <span className="text-forest dark:text-emerald-400 font-semibold text-[11px]">Signed Archival Art Print</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
