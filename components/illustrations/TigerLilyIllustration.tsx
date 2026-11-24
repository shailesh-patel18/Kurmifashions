import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function TigerLilyIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Botanical tiger lily petals framing a Western Ghats leopard silhouette"
    >
      <defs>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E57D3E" />
          <stop offset="60%" stopColor="#CF6127" />
          <stop offset="100%" stopColor="#A83F12" />
        </linearGradient>
      </defs>

      {/* Botanical Stem & Leaves */}
      <g id="stems">
        <path d="M250 420 Q240 300 250 180" stroke="#254734" strokeWidth="8" strokeLinecap="round" />
        <path d="M245 350 C180 320 160 270 170 230 C200 260 230 300 245 350 Z" fill="#2E5A40" />
        <path d="M255 310 C320 280 340 230 330 190 C300 220 270 260 255 310 Z" fill="#3D7453" />
      </g>

      {/* Leopard Silhouette Profile in the Center */}
      <g id="leopard-profile" transform="translate(185, 120)">
        <path
          d="M20 50 C25 30 45 20 65 22 C80 24 95 35 105 45 C115 55 125 70 115 85 C105 95 85 95 70 90 C50 85 25 75 20 50 Z"
          fill="#1F3D2B"
        />
        {/* Rosette spots */}
        <circle cx="50" cy="50" r="3.5" fill="#D2693A" />
        <circle cx="75" cy="58" r="4" fill="#D2693A" />
        <circle cx="90" cy="72" r="3" fill="#D2693A" />
      </g>

      {/* Radiating Tiger Lily Petals */}
      <g id="lily-petals">
        {/* Upper Petals */}
        <path
          d="M250 170 C220 90 200 40 180 20 C210 50 240 110 250 170 Z"
          fill="url(#petalGrad)"
        />
        <path
          d="M250 170 C280 90 300 40 320 20 C290 50 260 110 250 170 Z"
          fill="url(#petalGrad)"
        />

        {/* Side Curved Petals */}
        <path
          d="M250 170 C160 140 100 120 70 120 C110 160 180 180 250 170 Z"
          fill="url(#petalGrad)"
        />
        <path
          d="M250 170 C340 140 400 120 430 120 C390 160 320 180 250 170 Z"
          fill="url(#petalGrad)"
        />

        {/* Leopard Lily Spots on Petals */}
        <circle cx="215" cy="110" r="2.5" fill="#3D1D0E" />
        <circle cx="230" cy="85" r="2.5" fill="#3D1D0E" />
        <circle cx="270" cy="85" r="2.5" fill="#3D1D0E" />
        <circle cx="285" cy="110" r="2.5" fill="#3D1D0E" />
        <circle cx="160" cy="145" r="2.5" fill="#3D1D0E" />
        <circle cx="340" cy="145" r="2.5" fill="#3D1D0E" />
      </g>

      {/* Elegant Stamen Filaments */}
      <g id="stamen" stroke="#C99757" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M250 170 Q210 210 180 230" />
        <path d="M250 170 Q230 220 220 250" />
        <path d="M250 170 Q270 220 280 250" />
        <path d="M250 170 Q290 210 320 230" />
      </g>
      {/* Anthers */}
      <ellipse cx="180" cy="230" rx="6" ry="3" fill="#6B290B" />
      <ellipse cx="220" cy="250" rx="6" ry="3" fill="#6B290B" />
      <ellipse cx="280" cy="250" rx="6" ry="3" fill="#6B290B" />
      <ellipse cx="320" cy="230" rx="6" ry="3" fill="#6B290B" />
    </svg>
  );
}
