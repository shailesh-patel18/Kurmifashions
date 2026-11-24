import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function OwlIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Barn owl on an oak branch beneath a glowing moon"
    >
      <defs>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEA" />
          <stop offset="70%" stopColor="#E9DEC2" />
          <stop offset="100%" stopColor="#C9BBA0" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="owlBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7E6C58" />
          <stop offset="60%" stopColor="#554638" />
          <stop offset="100%" stopColor="#372D24" />
        </linearGradient>
        <linearGradient id="owlChest" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#E3D7C5" />
        </linearGradient>
      </defs>

      {/* Moon Halo */}
      <circle cx="250" cy="160" r="130" fill="url(#moonGlow)" />
      <circle cx="260" cy="150" r="100" fill="#121712" opacity="0.15" />

      {/* Star Constellations / Night Specks */}
      <g id="stars" opacity="0.6">
        <circle cx="80" cy="90" r="2" fill="#EAE2D0" />
        <circle cx="140" cy="60" r="1.5" fill="#EAE2D0" />
        <circle cx="410" cy="80" r="2.5" fill="#EAE2D0" />
        <circle cx="360" cy="120" r="1.5" fill="#EAE2D0" />
        <circle cx="440" cy="160" r="2" fill="#EAE2D0" />
      </g>

      {/* Oak Branch with Botanical Leaves */}
      <g id="branch">
        <path
          d="M40 330 Q180 320 280 340 T480 325"
          stroke="#42352B"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M280 340 Q320 370 380 380"
          stroke="#342921"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Oak Leaves */}
        <path d="M120 310 C100 290 110 270 135 285 C145 295 130 315 120 310 Z" fill="#2E5A40" />
        <path d="M350 330 C375 310 395 320 385 345 C375 355 350 345 350 330 Z" fill="#3D7453" />
        <path d="M410 335 C435 325 450 340 440 360 C430 370 415 350 410 335 Z" fill="#2E5A40" />
      </g>

      {/* Perched Barn Owl */}
      <g id="owl-perched" transform="translate(190, 160)">
        {/* Wing Layers */}
        <path
          id="owl-wing-back"
          d="M85 70 C105 100 115 140 100 170 C90 185 80 180 75 160 Z"
          fill="#3E3228"
        />

        {/* Body Base */}
        <path
          id="owl-body"
          d="M45 60 C35 100 35 150 45 180 C55 190 75 190 85 175 C95 150 95 100 85 60 Z"
          fill="url(#owlBody)"
        />

        {/* Heart-Shaped Chest Breast */}
        <path
          id="owl-chest"
          d="M50 75 C45 100 48 140 65 165 C80 140 85 100 80 75 C72 85 58 85 50 75 Z"
          fill="url(#owlChest)"
        />
        {/* Plumage Dots */}
        <circle cx="60" cy="110" r="1.5" fill="#8B7B6A" />
        <circle cx="68" cy="125" r="1.5" fill="#8B7B6A" />
        <circle cx="58" cy="138" r="1.5" fill="#8B7B6A" />

        {/* Owl Talons Gripping Branch */}
        <g id="talons">
          <ellipse cx="50" cy="182" rx="6" ry="3.5" fill="#D2693A" />
          <ellipse cx="78" cy="182" rx="6" ry="3.5" fill="#D2693A" />
        </g>

        {/* Barn Owl Heart Face & Mask */}
        <g id="owl-head">
          <path
            d="M38 45 C35 25 50 15 65 25 C80 15 95 25 92 45 C90 60 75 70 65 70 C55 70 40 60 38 45 Z"
            fill="#FFFDF7"
          />
          {/* Mask Rim */}
          <path
            d="M38 45 C35 25 50 15 65 25 C80 15 95 25 92 45 C90 60 75 70 65 70 C55 70 40 60 38 45 Z"
            stroke="#9E876F"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Amber Vigil Eyes */}
          <circle cx="53" cy="42" r="5" fill="#121712" />
          <circle cx="54" cy="40" r="1.5" fill="#FFFFFF" />
          <circle cx="77" cy="42" r="5" fill="#121712" />
          <circle cx="78" cy="40" r="1.5" fill="#FFFFFF" />
          {/* Beak */}
          <polygon points="63,46 67,46 65,56" fill="#D2693A" />
        </g>
      </g>
    </svg>
  );
}
