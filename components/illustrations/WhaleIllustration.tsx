import React from "react";

interface IllustrationProps {
  className?: string;
  animated?: boolean;
}

export function WhaleIllustration({ className = "w-full h-auto", animated = true }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Humpback whale gliding gracefully through Arabian Sea oceanic currents"
    >
      <defs>
        <linearGradient id="oceanBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#254B5F" />
          <stop offset="100%" stopColor="#122733" />
        </linearGradient>
        <linearGradient id="whaleSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A758C" />
          <stop offset="60%" stopColor="#284859" />
          <stop offset="100%" stopColor="#1B323E" />
        </linearGradient>
        <linearGradient id="whaleBelly" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EAF1F5" />
          <stop offset="100%" stopColor="#BDD1DC" />
        </linearGradient>
      </defs>

      {/* Flowing Water Currents */}
      <g id="ocean-currents" opacity="0.3">
        <path d="M-20 180 Q140 120 300 190 T620 160" stroke="#87B3C7" strokeWidth="2.5" fill="none" strokeDasharray="6 8" />
        <path d="M-10 240 Q160 190 340 260 T610 230" stroke="#87B3C7" strokeWidth="2" fill="none" strokeDasharray="4 6" />
      </g>

      {/* Floating Sea Bubbles */}
      <g id="bubbles" opacity="0.6">
        <circle cx="120" cy="130" r="4" fill="#C2E2EF" />
        <circle cx="135" cy="115" r="2.5" fill="#C2E2EF" />
        <circle cx="150" cy="140" r="3" fill="#C2E2EF" />
        <circle cx="480" cy="190" r="3.5" fill="#C2E2EF" />
        <circle cx="495" cy="175" r="2" fill="#C2E2EF" />
      </g>

      {/* Whale Group */}
      <g id="whale-body-group" transform="translate(60, 80)">
        {/* Pectoral Fin - Far */}
        <path
          d="M260 170 C310 210 340 250 330 265 C320 270 295 240 260 190 Z"
          fill="#1C3440"
        />

        {/* Main Humpback Body Curve */}
        <path
          d="M80 140 C140 80 280 85 360 125 C420 155 450 170 480 165 C470 175 440 185 380 180 C300 175 190 200 110 185 C80 180 60 165 80 140 Z"
          fill="url(#whaleSkin)"
        />

        {/* Pleated Belly Grooves */}
        <path
          d="M95 155 C150 165 240 180 320 175 C280 185 190 195 115 183 C100 175 92 165 95 155 Z"
          fill="url(#whaleBelly)"
        />
        <path d="M110 168 Q180 176 270 176" stroke="#9BB8C7" strokeWidth="1.5" fill="none" />
        <path d="M125 176 Q190 183 260 182" stroke="#9BB8C7" strokeWidth="1.5" fill="none" />

        {/* Head Knobs (Tubercles) */}
        <circle cx="95" cy="138" r="2" fill="#182E38" />
        <circle cx="115" cy="128" r="2.5" fill="#182E38" />
        <circle cx="140" cy="118" r="2.5" fill="#182E38" />

        {/* Peaceful Eye */}
        <ellipse cx="155" cy="140" rx="3" ry="2" fill="#0E1D24" />

        {/* Pectoral Long Wing Fin - Near */}
        <path
          d="M220 160 C260 210 280 270 270 285 C255 290 235 250 210 185 Z"
          fill="#3B6377"
        />

        {/* Whale Fluke (Tail) */}
        <g id="whale-tail" className={animated ? "animate-drift-slow" : ""}>
          <path
            d="M475 167 C500 145 525 125 540 130 C535 150 515 165 488 172 C515 180 535 195 540 215 C525 220 500 200 475 178 Z"
            fill="url(#whaleSkin)"
          />
        </g>
      </g>
    </svg>
  );
}
