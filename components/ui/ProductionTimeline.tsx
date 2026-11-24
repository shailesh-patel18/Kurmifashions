import React from "react";
import { Clock, Scissors, Paintbrush, Truck } from "lucide-react";

export function ProductionTimeline() {
  const steps = [
    {
      num: "Stage 01",
      title: "Demand Validation",
      timeline: "Current Phase",
      desc: "Gathering 1,000 genuine supporter inquiries at ₹0 commitment. Verifying demand to eliminate dead inventory.",
      active: true,
      icon: <Clock className="w-4 h-4 text-terracotta" />,
    },
    {
      num: "Stage 02",
      title: "Organic Cotton Milling",
      timeline: "Weeks 1–2",
      desc: "Sourcing GOTS-certified 180 GSM combed cotton from ethical organic growers in Tamil Nadu.",
      active: false,
      icon: <Scissors className="w-4 h-4 text-muted" />,
    },
    {
      num: "Stage 03",
      title: "Botanical Screen Printing",
      timeline: "Weeks 3–4",
      desc: "Hand screen-printing our original wildlife artwork with water-based eco-reactive inks.",
      active: false,
      icon: <Paintbrush className="w-4 h-4 text-muted" />,
    },
    {
      num: "Stage 04",
      title: "Eco Packaging & Dispatch",
      timeline: "Weeks 5–6",
      desc: "Packaging in plastic-free recycled Kraft mailers with plantable seed tags directly to your door.",
      active: false,
      icon: <Truck className="w-4 h-4 text-muted" />,
    },
  ];

  return (
    <div className="p-6 rounded-card bg-surface dark:bg-surface border border-line shadow-xs space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta block">
            MANUFACTURING ARCHITECTURE
          </span>
          <h3 className="font-fraunces font-bold text-scale-20 text-ink">
            Production & Delivery Roadmap
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-forest text-surface text-[11px] font-semibold">
          Stage 01 Active (₹0 Now)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((st, idx) => (
          <div
            key={st.num}
            className={`p-4 rounded-xl border transition-all ${
              st.active
                ? "bg-sand/40 border-forest ring-1 ring-forest/20"
                : "bg-surface/50 border-line/70"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-muted uppercase font-bold">
                {st.num}
              </span>
              <div className="w-7 h-7 rounded-full bg-sand/60 flex items-center justify-center">
                {st.icon}
              </div>
            </div>
            <p className="font-fraunces font-bold text-scale-14 text-ink">
              {st.title}
            </p>
            <span className="text-[11px] font-semibold text-terracotta block my-1">
              {st.timeline}
            </span>
            <p className="text-[11px] text-muted leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
