import React from "react";

export function GrainFilter() {
  return (
    <svg className="grain-overlay" aria-hidden="true">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.1   0 0 0 0 0.1   0 0 0 0 0.1  0 0 0 0.25 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
