"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import { Check, Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "sand";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isSuccess?: boolean;
  successText?: string;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      isSuccess = false,
      successText,
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium select-none rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

    const sizeStyles = {
      sm: "h-9 px-4 text-scale-12 gap-1.5",
      md: "h-11 px-6 text-scale-14 gap-2",
      lg: "h-14 px-8 text-scale-16 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-forest text-surface hover:bg-forest-hover shadow-sm hover:shadow-card hover:-translate-y-0.5 focus-visible:outline-forest",
      secondary:
        "bg-terracotta text-surface hover:bg-terracotta-hover shadow-sm hover:shadow-card hover:-translate-y-0.5 focus-visible:outline-terracotta",
      outline:
        "border border-line bg-transparent text-ink hover:bg-sand/60 hover:border-forest/40 focus-visible:outline-forest",
      ghost:
        "bg-transparent text-ink hover:bg-sand/50 active:bg-sand/70 focus-visible:outline-terracotta",
      sand:
        "bg-sand text-ink hover:bg-sand/80 shadow-sm focus-visible:outline-forest",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Processing...</span>
          </>
        ) : isSuccess ? (
          <>
            <Check className="w-4 h-4 text-emerald-300 animate-in zoom-in-50 duration-200" aria-hidden="true" />
            <span>{successText || "Added!"}</span>
          </>
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
