"use client";

import React, { useState } from "react";
import { Search, ShieldCheck, CheckCircle2, Clock, Sparkles, AlertCircle, Package } from "lucide-react";
import { useKurmi } from "@/lib/context";

export function InquiryStatusTracker() {
  const { stats } = useKurmi();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Simulate inquiry lookup with authentic data state
    setSearched(true);
    setResult({
      supporterNumber: 142,
      name: query.length === 10 ? "Verified Naturalist Backer" : query.toUpperCase(),
      code: query.startsWith("KURMI") ? query.toUpperCase() : "KURMI-8X92",
      stage: "Stage 01: Community Demand Validation",
      unlockedPct: Math.round((stats.totalSupporters / stats.goal) * 100),
      items: [
        { design: "Fox in the Pines", size: "L", cut: "Regular Fit", qty: 1 },
      ],
      estimatedLoomWindow: "Within 14 days of reaching 1,000 backer goal",
    });
  };

  const stages = [
    { name: "1. Demand Validation", status: "in-progress", desc: "Currently active: 550+ of 1,000 inquiries reached." },
    { name: "2. GOTS Yarn Sourcing", status: "pending", desc: "Triggered instantly upon backer 1,000 milestone." },
    { name: "3. Circular Loom Weaving", status: "pending", desc: "32/1 combed ring-spun jersey knitting in Coimbatore." },
    { name: "4. Botanical Screen Print", status: "pending", desc: "4-pass discharge printing in Jaipur workshop." },
    { name: "5. Direct Dispatch", status: "pending", desc: "Zero plastic packaging via carbon-neutral courier." },
  ];

  return (
    <div className="rounded-2xl border border-line bg-surface dark:bg-surface p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Loom & Production Tracking
          </span>
          <h3 className="font-fraunces text-scale-24 font-bold text-ink mt-1">
            Check Your Inquiry Status
          </h3>
          <p className="text-scale-12 text-muted">
            Enter your WhatsApp number or Pass Code to view your queue rank and real-time drop milestones.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand/60 text-[11px] font-semibold text-muted border border-line">
          <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
          <span>DPDP Act Encrypted Query</span>
        </div>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2 max-w-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter 10-digit mobile or pass code (e.g. KURMI-X84)"
            className="w-full h-11 pl-10 pr-4 rounded-full border border-line bg-surface text-scale-14 text-ink focus:outline-none focus:border-forest"
          />
        </div>
        <button
          type="submit"
          className="h-11 px-6 rounded-full bg-forest text-surface font-semibold text-scale-12 hover:bg-forest/90 transition-colors shadow-sm"
        >
          Track Queue
        </button>
      </form>

      {/* Result Card */}
      {searched && result && (
        <div className="p-6 rounded-2xl bg-sand/30 dark:bg-sand/15 border border-line space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-line/60">
            <div>
              <span className="text-[10px] font-mono uppercase text-muted">OFFICIAL PASS #{result.supporterNumber}</span>
              <h4 className="font-fraunces font-bold text-scale-18 text-ink">
                {result.name}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-forest text-surface font-semibold text-[11px] self-start sm:self-auto">
              {result.stage}
            </span>
          </div>

          {/* 5-Step Progress Timeline */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted block">
              Manufacturing Stage Sequence:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {stages.map((stg, i) => (
                <div
                  key={stg.name}
                  className={`p-2.5 rounded-xl border text-[11px] ${
                    stg.status === "in-progress"
                      ? "border-forest bg-forest/10 dark:bg-emerald-950/30 text-ink font-semibold ring-1 ring-forest"
                      : "border-line bg-surface/80 text-muted"
                  }`}
                >
                  <span className="block font-bold text-[10px] text-terracotta">
                    {stg.status === "in-progress" ? "● ACTIVE" : `○ STEP 0${i + 1}`}
                  </span>
                  <span className="block font-semibold mt-0.5">{stg.name.split(". ")[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted pt-2 border-t border-line/60 gap-2">
            <span>Reserved Specimen: Fox in the Pines (Size L)</span>
            <span className="font-semibold text-terracotta">Amount Billed Today: ₹0.00</span>
          </div>
        </div>
      )}
    </div>
  );
}
