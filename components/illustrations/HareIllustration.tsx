import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function HareIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Mountain hare camouflaged among highland tundra moss and lichen"
    >
      <defs>
        <linearGradient id="hareFur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFD5C6" />
          <stop offset="60%" stopColor="#BFAF9B" />
          <stop offset="100%" stopColor="#92816E" />
        </linearGradient>
      </defs>

      {/* Highland Rock Formation */}
      <path
        d="M60 360 C120 310 240 320 320 310 C390 300 460 340 480 380 L20 380 Z"
        fill="#5E665C"
        opacity="0.85"
      />

      {/* Alpine Moss & Berries */}
      <g id="tundra-flora">
        <circle cx="100" cy="335" r="5" fill="#D2693A" />
        <circle cx="112" cy="342" r="4" fill="#D2693A" />
        <circle cx="120" cy="333" r="4.5" fill="#B04E24" />
        <path d="M90 345 Q110 330 130 340" stroke="#385D46" strokeWidth="2.5" fill="none" />

        <circle cx="390" cy="325" r="5" fill="#D2693A" />
        <circle cx="405" cy="320" r="4.5" fill="#D2693A" />
        <path d="M380 335 Q400 320 420 330" stroke="#385D46" strokeWidth="2.5" fill="none" />
      </g>

      {/* Mountain Hare Body */}
      <g id="hare-group" transform="translate(160, 110)">
        {/* Fluffy Tail */}
        <circle cx="195" cy="185" r="16" fill="#F8F4EE" />

        {/* Hindquarters */}
        <ellipse cx="140" cy="170" rx="45" ry="35" fill="url(#hareFur)" />
        <ellipse cx="145" cy="195" rx="30" ry="12" fill="#A89785" />

        {/* Torso & Chest */}
        <path
          d="M80 175 C60 140 75 100 110 110 C140 120 150 160 140 185 Z"
          fill="url(#hareFur)"
        />
        <path
          d="M75 150 C70 130 80 115 95 125 C105 135 100 165 85 175 Z"
          fill="#F7F3EC"
        />

        {/* Paws */}
        <ellipse cx="85" cy="202" rx="14" ry="7" fill="#8C7C6B" />

        {/* Head */}
        <g id="hare-head">
          <ellipse cx="65" cy="105" rx="26" ry="20" fill="url(#hareFur)" />
          {/* Snout */}
          <ellipse cx="45" cy="112" rx="12" ry="9" fill="#E8DEC\-D" />
          <circle cx="40" cy="110" r="2.5" fill="#3D3025" />
          {/* Vigilant Dark Eye */}
          <ellipse cx="68" cy="98" rx="4.5" ry="5.5" fill="#2E2319" />
          <circle cx="69" cy="96" r="1.5" fill="#FFFFFF" />
        </g>

        {/* Tall Alert Ears */}
        <g id="hare-ears">
          {/* Back Ear */}
          <path
            d="M82 90 C85 50 105 15 115 18 C120 22 110 60 95 92 Z"
            fill="#8F7E6C"
          />
          {/* Front Ear */}
          <path
            d="M70 88 C70 45 88 10 98 12 C105 15 95 55 82 90 Z"
            fill="url(#hareFur)"
          />
          {/* Inner Ear Rose Cream */}
          <path
            d="M75 80 C75 52 86 28 92 27 C95 29 88 56 82 82 Z"
            fill="#EAD9CF"
          />
          {/* Dark Ear Tips */}
          <path
            d="M93 12 C98 12 103 16 98 25 C92 23 88 18 93 12 Z"
            fill="#2E2319"
          />
        </g>
      </g>
    </svg>
  );
}
