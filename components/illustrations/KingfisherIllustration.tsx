import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function KingfisherIllustration({ className = "w-full h-auto" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Common kingfisher perched above clear fresh river water"
    >
      <defs>
        <linearGradient id="kingfisherBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#25A2C8" />
          <stop offset="60%" stopColor="#12689B" />
          <stop offset="100%" stopColor="#0B4264" />
        </linearGradient>
        <linearGradient id="kingfisherOrange" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E67540" />
          <stop offset="100%" stopColor="#A84317" />
        </linearGradient>
      </defs>

      {/* Fresh River Reeds & Water */}
      <path d="M0 320 Q180 290 320 310 T600 300 L600 400 L0 400 Z" fill="#204A5E" opacity="0.4" />
      <line x1="80" y1="360" x2="360" y2="240" stroke="#5E4B3C" strokeWidth="10" strokeLinecap="round" />

      {/* Kingfisher Group */}
      <g id="kingfisher-perched" transform="translate(240, 110)">
        {/* Tail Feathers */}
        <polygon points="40,140 55,185 62,185 50,140" fill="#0B4264" />

        {/* Back and Wing */}
        <path
          d="M20 70 C45 75 75 100 65 145 C50 155 35 140 25 110 Z"
          fill="url(#kingfisherBlue)"
        />

        {/* Rich Orange Breast and Belly */}
        <path
          d="M5 80 C-10 110 -5 140 20 155 C35 150 40 130 35 105 Z"
          fill="url(#kingfisherOrange)"
        />

        {/* Head */}
        <path
          d="M-5 50 C-10 30 15 20 30 35 C40 45 35 65 20 70 Z"
          fill="url(#kingfisherBlue)"
        />
        {/* White Ear Covert */}
        <ellipse cx="22" cy="46" rx="6" ry="4" fill="#FFFDF8" />
        {/* Sharp Dagger Beak */}
        <polygon points="5,42 -40,48 5,50" fill="#1B1F1A" />
        {/* Dark Eye */}
        <circle cx="10" cy="42" r="3" fill="#1B1F1A" />
        <circle cx="11" cy="41" r="1" fill="#FFFFFF" />

        {/* Little Red Feet gripping branch */}
        <circle cx="28" cy="155" r="4" fill="#D2693A" />
        <circle cx="36" cy="153" r="4" fill="#D2693A" />
      </g>
    </svg>
  );
}
