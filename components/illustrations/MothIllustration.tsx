import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function MothIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Indian moon moth with delicate swallowtail ribbons and fern leaves"
    >
      <defs>
        <linearGradient id="mothWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4DFCB" />
          <stop offset="50%" stopColor="#8FBA9B" />
          <stop offset="100%" stopColor="#5B8E6A" />
        </linearGradient>
      </defs>

      {/* Tropical Fern Fronds */}
      <g id="fern-backdrop" opacity="0.4">
        <path d="M60 400 Q150 280 200 120" stroke="#2E5A40" strokeWidth="3" fill="none" />
        <path d="M440 400 Q350 280 300 120" stroke="#2E5A40" strokeWidth="3" fill="none" />
      </g>

      {/* Symmetrical Moon Moth Group */}
      <g id="moth-specimen" transform="translate(250, 210)">
        {/* Left Forewing */}
        <path
          d="M0 -10 C-50 -80 -150 -130 -190 -110 C-210 -80 -170 10 -90 40 C-30 50 -10 10 0 -10 Z"
          fill="url(#mothWingGrad)"
        />
        {/* Right Forewing */}
        <path
          d="M0 -10 C50 -80 150 -130 190 -110 C210 -80 170 10 90 40 C30 50 10 10 0 -10 Z"
          fill="url(#mothWingGrad)"
        />

        {/* Forewing Margin Brown Stripe */}
        <path
          d="M-190 -110 C-145 -130 -50 -80 0 -10 C50 -80 145 -130 190 -110"
          stroke="#684A33"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Hindwing with Long Trailing Ribbon Tail */}
        <path
          d="M0 20 C-60 50 -110 80 -100 120 C-90 150 -60 170 -65 210 C-68 230 -85 240 -80 250 C-70 255 -50 220 -40 180 C-30 130 -10 70 0 20 Z"
          fill="url(#mothWingGrad)"
        />
        {/* Right Hindwing with Trailing Ribbon */}
        <path
          d="M0 20 C60 50 110 80 100 120 C90 150 60 170 65 210 C68 230 85 240 80 250 C70 255 50 220 40 180 C30 130 10 70 0 20 Z"
          fill="url(#mothWingGrad)"
        />

        {/* Eyespots (Ocelli) */}
        <circle cx="-70" cy="-20" r="10" fill="#EFE9DC" />
        <circle cx="-70" cy="-20" r="6" fill="#D2693A" />
        <circle cx="-70" cy="-20" r="3" fill="#1B1F1A" />

        <circle cx="70" cy="-20" r="10" fill="#EFE9DC" />
        <circle cx="70" cy="-20" r="6" fill="#D2693A" />
        <circle cx="70" cy="-20" r="3" fill="#1B1F1A" />

        {/* Fuzzy White Body */}
        <ellipse cx="0" cy="15" rx="12" ry="38" fill="#FBF8EE" />

        {/* Feathery Antennae */}
        <path d="M-4 -20 Q-25 -50 -45 -65" stroke="#C9A364" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M4 -20 Q25 -50 45 -65" stroke="#C9A364" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
