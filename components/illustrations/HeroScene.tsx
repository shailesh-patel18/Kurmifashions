"use client";

import React, { useEffect, useRef, useState } from "react";
import { FoxIllustration } from "./FoxIllustration";

interface HeroSceneProps {
  isDark?: boolean;
}

export function HeroScene({ isDark = false }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Mouse parallax tracking (max 12px)
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 24; // -12px to +12px
      const y = ((e.clientY / innerHeight) - 0.5) * 16; // -8px to +8px
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[540px] md:min-h-[640px] overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1: Sky Gradient & Celestial Body (Sun/Moon) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px, 0)`,
        }}
      >
        {/* Celestial Body: Rising Sun (Day) / Moon with soft corona (Night) */}
        {!isDark ? (
          <div className="absolute top-[18%] left-[62%] md:left-[58%] -translate-x-1/2 animate-sun-rise">
            <div className="w-36 h-36 md:w-52 md:h-52 rounded-full bg-gradient-to-t from-[#F4B476] to-[#FCE6BD] shadow-[0_0_80px_30px_rgba(244,180,118,0.45)]" />
          </div>
        ) : (
          <div className="absolute top-[15%] left-[65%] -translate-x-1/2">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-t from-[#DDE7DC] to-[#FFFDF5] shadow-[0_0_90px_35px_rgba(215,232,215,0.35)] opacity-90" />
            <div className="absolute inset-0 w-28 h-28 md:w-38 md:h-38 rounded-full bg-[#121712] top-2 left-3 opacity-25" />
          </div>
        )}

        {/* Ambient Birds (Day) / Glowing Fireflies (Night) */}
        {!isDark ? (
          <div className="absolute inset-0">
            {/* Drifting Birds */}
            <svg
              className={`absolute top-20 left-[25%] w-10 h-6 text-[#5E665C] opacity-70 ${
                reducedMotion ? "" : "animate-drift-slow"
              }`}
              viewBox="0 0 40 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 14 Q10 2 20 10 Q30 2 38 14" strokeLinecap="round" />
            </svg>
            <svg
              className={`absolute top-32 left-[32%] w-7 h-4 text-[#7C887A] opacity-60 ${
                reducedMotion ? "" : "animate-drift-slow"
              }`}
              style={{ animationDelay: "3s" }}
              viewBox="0 0 40 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 14 Q10 2 20 10 Q30 2 38 14" strokeLinecap="round" />
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Glowing Fireflies */}
            <div
              className={`absolute top-[35%] left-[25%] w-2 h-2 rounded-full bg-[#E8B65A] shadow-[0_0_12px_4px_rgba(232,182,90,0.8)] ${
                reducedMotion ? "" : "animate-drift-slow"
              }`}
            />
            <div
              className={`absolute top-[48%] left-[68%] w-2.5 h-2.5 rounded-full bg-[#C9DF8A] shadow-[0_0_15px_5px_rgba(201,223,138,0.8)] ${
                reducedMotion ? "" : "animate-drift-slow"
              }`}
              style={{ animationDelay: "4s" }}
            />
            <div
              className={`absolute top-[55%] left-[40%] w-2 h-2 rounded-full bg-[#E8855A] shadow-[0_0_10px_3px_rgba(232,133,90,0.7)] ${
                reducedMotion ? "" : "animate-drift-slow"
              }`}
              style={{ animationDelay: "7s" }}
            />
          </div>
        )}
      </div>

      {/* Layer 2: Far Mountain Ridge */}
      <div
        className="absolute bottom-0 w-[110%] -left-[5%] transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.3}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="w-full h-44 md:h-72 opacity-80"
          fill={isDark ? "#1B2C21" : "#8AA089"}
        >
          <path d="M0,220 C200,160 380,240 550,180 C740,120 920,220 1200,170 L1200,400 L0,400 Z" />
        </svg>
      </div>

      {/* Layer 3: Mid Pine Ridges */}
      <div
        className="absolute bottom-0 w-[110%] -left-[5%] transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${mouseOffset.x * 0.65}px, ${mouseOffset.y * 0.5}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1200 350"
          preserveAspectRatio="none"
          className="w-full h-48 md:h-80 opacity-90"
          fill={isDark ? "#243E2E" : "#3F634A"}
        >
          <path d="M0,190 C180,130 360,210 600,160 C820,110 1020,180 1200,140 L1200,350 L0,350 Z" />
        </svg>
      </div>

      {/* Layer 4: Near Foreground Pine Crest & Fox Character */}
      <div
        className="absolute bottom-0 w-full transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `translate3d(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.7}px, 0)`,
        }}
      >
        <div className="relative max-w-6xl mx-auto flex justify-end items-end pr-4 md:pr-16">
          <div className="w-[300px] sm:w-[380px] md:w-[480px] lg:w-[540px]">
            <FoxIllustration animated={!reducedMotion} />
          </div>
        </div>
      </div>
    </div>
  );
}
