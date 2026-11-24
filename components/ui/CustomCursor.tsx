"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isHoveringSpecimen, setIsHoveringSpecimen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check fine pointer (mouse / trackpad) and not reduced motion
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) {
      return;
    }
    setIsFinePointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = !!target.closest("button, a, input, select, textarea, [role='button']");
      const specimen = !!target.closest(".field-card, .design-card");

      setIsHoveringInteractive(interactive);
      setIsHoveringSpecimen(specimen);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <div
      className="custom-cursor flex items-center justify-center pointer-events-none rounded-full"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: isHoveringSpecimen ? "36px" : isHoveringInteractive ? "28px" : "12px",
        height: isHoveringSpecimen ? "36px" : isHoveringInteractive ? "28px" : "12px",
        backgroundColor: isHoveringSpecimen
          ? "rgba(210, 105, 58, 0.25)"
          : isHoveringInteractive
          ? "rgba(31, 61, 43, 0.2)"
          : "rgba(210, 105, 58, 0.75)",
        backdropFilter: isHoveringInteractive ? "blur(1px)" : "none",
        border: isHoveringInteractive ? "1.5px solid #D2693A" : "none",
      }}
      aria-hidden="true"
    >
      {/* Tiny Paw Icon when hovering specimen */}
      {isHoveringSpecimen && (
        <svg
          className="w-4 h-4 text-terracotta"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="7" cy="8" r="2" />
          <circle cx="12" cy="5.5" r="2" />
          <circle cx="17" cy="8" r="2" />
          <circle cx="12" cy="14" r="3.5" />
        </svg>
      )}
    </div>
  );
}
