"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  goal?: number;
  showLabels?: boolean;
  className?: string;
}

export function ProgressBar({
  current,
  goal = 1000,
  showLabels = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / goal) * 100));

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex justify-between items-center text-scale-12 font-medium mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span className="text-ink font-semibold">{current.toLocaleString()} Supporters</span>
            <span className="text-muted">(Real Count)</span>
          </div>
          <span className="text-muted">Goal: {goal.toLocaleString()} inquiries</span>
        </div>
      )}

      {/* Progress Track */}
      <div
        className="relative h-3.5 w-full bg-sand/70 dark:bg-surface rounded-full overflow-hidden border border-line"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-label="Pre-launch supporter goal progress"
      >
        {/* Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-forest to-forest-light dark:from-forest-light dark:to-emerald-500 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${Math.max(percentage, 2)}%` }}
        >
          {/* Subtle Shimmer at progress head */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Paw Icon Marker at Current Point */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-1000"
          style={{ left: `${Math.max(percentage, 3)}%` }}
        >
          <svg
            className="w-4 h-4 text-terracotta drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="7" cy="8" r="2.5" />
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="17" cy="8" r="2.5" />
            <circle cx="12" cy="15" r="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
