import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "mark";
  size?: number;
}

export function KurmiLogo({ className = "", variant = "full", size = 48 }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Actual Brand Logo Image provided by user */}
      <div
        className="relative overflow-hidden rounded-xl border border-line/60 shadow-xs shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          src="/images/kurmi-logo.jpg"
          alt="KURMI FASHIONS Brand Logo: Wildcat and Botanical Branch Seal"
          className="w-full h-full object-cover"
        />
      </div>

      {variant === "full" && (
        <div className="flex flex-col">
          <span className="font-fraunces font-bold tracking-[0.2em] text-scale-20 text-forest dark:text-ink leading-tight">
            KURMI
          </span>
          <span className="font-inter text-[10px] tracking-[0.38em] font-semibold text-terracotta uppercase leading-none">
            FASHIONS
          </span>
        </div>
      )}
    </div>
  );
}
