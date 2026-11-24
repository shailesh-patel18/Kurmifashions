"use client";

import React from "react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: "filter" | "tag" | "size";
  count?: number;
}

export function Chip({
  children,
  className = "",
  active = false,
  variant = "filter",
  count,
  ...props
}: ChipProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-150 select-none rounded-full text-scale-12 focus-visible:outline-2 focus-visible:outline-terracotta";

  const variants = {
    filter: active
      ? "bg-forest text-surface shadow-sm font-semibold px-4 py-2"
      : "bg-surface/80 dark:bg-sand/40 text-muted hover:text-ink hover:bg-sand border border-line px-4 py-2",
    tag: "bg-sand/60 dark:bg-sand/80 text-forest dark:text-ink font-semibold tracking-wider text-[11px] uppercase px-3 py-1 border border-line/60",
    size: active
      ? "w-10 h-10 bg-forest text-surface font-semibold shadow-sm"
      : "w-10 h-10 bg-surface dark:bg-surface text-ink hover:bg-sand border border-line",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
            active ? "bg-surface/25 text-surface" : "bg-sand text-muted"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
