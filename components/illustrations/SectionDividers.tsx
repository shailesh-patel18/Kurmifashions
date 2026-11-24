import React from "react";

interface DividerProps {
  className?: string;
  fill?: string;
  flip?: boolean;
}

export function HillsDivider({ className = "w-full h-12 text-bg", flip = false }: DividerProps) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-10 md:h-16 ${className}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

export function WavesDivider({ className = "w-full h-12 text-bg", flip = false }: DividerProps) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-10 md:h-16 ${className}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,45 C150,90 300,10 450,55 C600,100 750,20 900,60 C1050,100 1150,40 1200,50 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

export function PinesDivider({ className = "w-full h-14 text-bg", flip = false }: DividerProps) {
  return (
    <div className={`overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-12 md:h-20 ${className}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0,80 L40,40 L80,80 L120,30 L160,80 L200,45 L240,85 L280,25 L320,80 L360,50 L400,80 L440,35 L480,85 L520,30 L560,80 L600,45 L640,85 L680,20 L720,80 L760,50 L800,80 L840,30 L880,85 L920,40 L960,80 L1000,25 L1040,85 L1080,45 L1120,80 L1160,35 L1200,75 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}
