import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function DeerIllustration({ className = "w-full h-auto" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Chital Axis deer standing proud in a teak glade"
    >
      <defs>
        <linearGradient id="deerCoat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DF934B" />
          <stop offset="100%" stopColor="#9C591F" />
        </linearGradient>
      </defs>

      {/* Forest Meadow */}
      <path d="M20 370 Q160 330 320 350 T480 360 L480 400 L20 400 Z" fill="#2E5A40" />

      {/* Deer Group */}
      <g id="deer-group" transform="translate(180, 80)">
        {/* Slender Legs */}
        <line x1="75" y1="210" x2="70" y2="280" stroke="#8C4F1B" strokeWidth="6" strokeLinecap="round" />
        <line x1="95" y1="210" x2="90" y2="280" stroke="#6D3D14" strokeWidth="6" strokeLinecap="round" />
        <line x1="145" y1="200" x2="150" y2="280" stroke="#8C4F1B" strokeWidth="6" strokeLinecap="round" />
        <line x1="165" y1="200" x2="168" y2="280" stroke="#6D3D14" strokeWidth="6" strokeLinecap="round" />

        {/* Body */}
        <path
          d="M60 170 C70 140 120 140 160 150 C180 160 185 190 170 210 C150 220 80 220 60 170 Z"
          fill="url(#deerCoat)"
        />

        {/* White Chital Spots */}
        <circle cx="105" cy="165" r="2.5" fill="#FFFDF8" />
        <circle cx="120" cy="160" r="2.5" fill="#FFFDF8" />
        <circle cx="135" cy="168" r="2.5" fill="#FFFDF8" />
        <circle cx="115" cy="178" r="2.5" fill="#FFFDF8" />
        <circle cx="130" cy="182" r="2.5" fill="#FFFDF8" />
        <circle cx="145" cy="176" r="2.5" fill="#FFFDF8" />

        {/* Slender Neck & Head */}
        <path
          d="M60 170 C55 130 50 90 40 60 C50 60 65 80 75 110 C85 140 85 165 75 180 Z"
          fill="url(#deerCoat)"
        />
        {/* Head */}
        <ellipse cx="35" cy="55" rx="16" ry="11" fill="url(#deerCoat)" />
        <circle cx="24" cy="55" r="2.5" fill="#1B1F1A" />
        {/* Ear */}
        <path d="M45 48 C55 40 65 42 62 52 C58 58 48 54 45 48 Z" fill="#9C591F" />

        {/* Graceful Antlers */}
        <g id="antlers" stroke="#5E4228" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M40 45 Q45 20 30 -5 Q20 5 15 -15" />
          <path d="M36 25 Q20 15 15 22" />
          <path d="M42 45 Q55 20 50 -10 Q60 -5 68 -20" />
          <path d="M48 25 Q65 18 68 25" />
        </g>
      </g>
    </svg>
  );
}
