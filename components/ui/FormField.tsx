"use client";

import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, BaseFieldProps {}
export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, required, className = "", id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <div className="flex justify-between items-baseline">
          <label htmlFor={inputId} className="text-scale-14 font-medium text-ink">
            {label}
            {required && <span className="text-terracotta ml-1">*</span>}
          </label>
          {hint && <span className="text-scale-12 text-muted">{hint}</span>}
        </div>
        <input
          ref={ref}
          id={inputId}
          className={`h-11 px-3.5 bg-surface dark:bg-surface border ${
            error ? "border-red-500" : "border-line"
          } rounded-input text-scale-14 text-ink placeholder:text-muted/60 transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            role="alert"
            aria-live="polite"
            className="text-scale-12 text-red-600 dark:text-red-400 font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, required, className = "", id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <div className="flex justify-between items-baseline">
          <label htmlFor={textareaId} className="text-scale-14 font-medium text-ink">
            {label}
            {required && <span className="text-terracotta ml-1">*</span>}
          </label>
          {hint && <span className="text-scale-12 text-muted">{hint}</span>}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          rows={3}
          className={`p-3 bg-surface dark:bg-surface border ${
            error ? "border-red-500" : "border-line"
          } rounded-input text-scale-14 text-ink placeholder:text-muted/60 transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta resize-none ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <span
            id={`${textareaId}-error`}
            role="alert"
            aria-live="polite"
            className="text-scale-12 text-red-600 dark:text-red-400 font-medium"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);
TextareaField.displayName = "TextareaField";
