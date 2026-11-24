import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function FoxIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Red fox resting calmly in a Himalayan pine forest"
    >
      <defs>
        {/* Layer Palettes */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9E8D2" />
          <stop offset="50%" stopColor="#F3D7BD" />
          <stop offset="100%" stopColor="#EAE2D0" />
        </linearGradient>
        <linearGradient id="farHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#879986" />
          <stop offset="100%" stopColor="#5E745E" />
        </linearGradient>
        <linearGradient id="midHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3C644B" />
          <stop offset="100%" stopColor="#254734" />
        </linearGradient>
        <linearGradient id="nearHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#233E2E" />
          <stop offset="100%" stopColor="#16291E" />
        </linearGradient>
        <linearGradient id="foxBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E67540" />
          <stop offset="60%" stopColor="#CF5F2A" />
          <stop offset="100%" stopColor="#A84317" />
        </linearGradient>
        <linearGradient id="foxChestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9F0" />
          <stop offset="100%" stopColor="#EDE1CE" />
        </linearGradient>
      </defs>

      {/* Background Soft Sky Glow */}
      <g id="sky-glow" opacity="0.65">
        <circle cx="300" cy="180" r="140" fill="#FFE2C6" filter="blur(30px)" />
      </g>

      {/* Far Alpine Ridge */}
      <g id="far-hills">
        <path
          d="M0 240 Q150 180 320 220 T600 210 L600 450 L0 450 Z"
          fill="url(#farHillGrad)"
          opacity="0.85"
        />
      </g>

      {/* Himalayan Pine Silhouettes */}
      <g id="pine-trees" opacity="0.9">
        {/* Left Pines */}
        <polygon points="60,260 80,180 100,260" fill="#2D4D3A" />
        <polygon points="50,230 80,150 110,230" fill="#264433" />
        <polygon points="120,270 145,190 170,270" fill="#32543F" />
        {/* Right Pines */}
        <polygon points="480,260 510,170 540,260" fill="#2D4D3A" />
        <polygon points="430,280 455,200 480,280" fill="#385D46" />
      </g>

      {/* Mid Hills */}
      <g id="mid-hills">
        <path
          d="M0 290 Q180 240 380 270 T600 280 L600 450 L0 450 Z"
          fill="url(#midHillGrad)"
        />
      </g>

      {/* Near Foreground Ridge */}
      <g id="near-hills">
        <path
          d="M0 340 Q240 310 420 330 T600 350 L600 450 L0 450 Z"
          fill="url(#nearHillGrad)"
        />
      </g>

      {/* Wild Pine Cone & Plant Silhouettes */}
      <g id="foreground-botanicals">
        <path d="M40 380 Q55 330 70 375 T95 400" stroke="#487258" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M505 385 Q525 340 540 380 T565 410" stroke="#487258" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Fox Character Group */}
      <g id="fox-creature" transform="translate(180, 210)">
        {/* Fox Body & Hind */}
        <path
          id="fox-body"
          d="M60 120 C50 80 90 40 140 45 C180 50 200 90 190 130 C180 150 130 160 80 155 C65 150 62 135 60 120 Z"
          fill="url(#foxBodyGrad)"
        />

        {/* Tail with Swaying Anchor */}
        <g
          id="fox-tail"
          className={animated ? "animate-fox-tail origin-[180px_130px]" : ""}
        >
          {/* Main bushy tail curve */}
          <path
            d="M175 125 C220 135 250 110 240 75 C235 60 215 65 200 80 C185 95 175 110 175 125 Z"
            fill="#CF5F2A"
          />
          {/* White Tail Tip */}
          <path
            d="M240 75 C242 70 238 65 230 65 C222 66 216 72 210 78 C218 80 230 80 240 75 Z"
            fill="url(#foxChestGrad)"
          />
        </g>

        {/* Paws */}
        <g id="fox-paws">
          <ellipse cx="90" cy="155" rx="14" ry="7" fill="#8C3512" />
          <ellipse cx="130" cy="155" rx="16" ry="7" fill="#8C3512" />
        </g>

        {/* White Chest & Belly Fluff */}
        <path
          id="fox-chest"
          d="M85 75 C95 65 115 65 120 85 C125 105 110 135 85 140 C80 125 80 95 85 75 Z"
          fill="url(#foxChestGrad)"
        />

        {/* Fox Head & Muzzle */}
        <g id="fox-head">
          <path
            d="M80 75 C70 65 60 55 45 60 C35 64 30 75 40 82 C55 90 75 92 85 85 Z"
            fill="#E67540"
          />
          {/* White Cheek Patch */}
          <path
            d="M55 72 C48 74 44 80 50 83 C58 85 68 83 72 78 C65 74 58 71 55 72 Z"
            fill="url(#foxChestGrad)"
          />
          {/* Dark Nose Tip */}
          <circle cx="36" cy="67" r="3.5" fill="#1B1F1A" />
          {/* Calm Slanted Eye */}
          <path
            d="M56 66 Q62 63 68 66"
            stroke="#1B1F1A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Ears with Twitching Motion */}
        <g
          id="fox-ears"
          className={animated ? "animate-fox-ear origin-[75px_45px]" : ""}
        >
          {/* Back Ear */}
          <polygon points="80,50 95,20 102,48" fill="#A84317" />
          {/* Front Ear */}
          <polygon points="65,55 76,24 88,52" fill="#CF5F2A" />
          {/* Inner Ear Cream */}
          <polygon points="70,52 77,32 83,50" fill="url(#foxChestGrad)" />
        </g>
      </g>
    </svg>
  );
}
