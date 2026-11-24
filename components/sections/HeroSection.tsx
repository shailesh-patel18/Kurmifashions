"use client";

import React, { useState } from "react";
import { ArrowDown, Check, MapPin, Camera } from "lucide-react";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";
import { COPY } from "@/data/copy";
import { useKurmi } from "@/lib/context";

export function HeroSection() {
  const { theme, stats } = useKurmi();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsNotified(true);
        setEmail("");
      }
    } catch {}
    setIsSubmitting(false);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden pt-8 md:pt-14 pb-12">
      {/* Background: Three Majestic Asiatic Lions in Natural Habitat */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img
          src="/images/hero-lions.jpg"
          alt="Three majestic Asiatic lions with calm, alert eyes in natural sanctuary"
          className="w-full h-full object-cover object-[70%_20%] lg:object-[80%_25%] filter brightness-[0.96] dark:brightness-[0.55] contrast-[1.04] transition-all duration-700 ease-out"
        />
        {/* Soft horizontal gradient vignette ensuring WCAG AAA text contrast while keeping the lions visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-transparent lg:w-[62%] dark:from-bg dark:via-bg/95 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />

        {/* Naturalist Field Journal Specimen Tag for the Lions */}
        <div className="hidden md:flex absolute bottom-8 right-8 z-10 items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface/85 dark:bg-surface/80 backdrop-blur-md border border-line shadow-card text-scale-12 pointer-events-auto transition-transform hover:scale-105">
          <div className="w-8 h-8 rounded-full bg-forest text-surface flex items-center justify-center shrink-0">
            <Camera className="w-4 h-4 text-terracotta" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">
                FIELD ARCHIVE • SPECIMEN 00
              </span>
              <span className="text-muted text-[10px]">• Gir Forest</span>
            </div>
            <p className="font-fraunces font-bold text-ink text-scale-14 leading-tight">
              Panthera leo persica (Asiatic Lioness Pride)
            </p>
          </div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          {/* Pre-launch Demand Validation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 dark:bg-surface/85 backdrop-blur-md border border-line text-scale-12 font-semibold text-forest dark:text-emerald-400 shadow-sm animate-in fade-in duration-500">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
            <span>{COPY.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-fraunces text-scale-40 sm:text-5xl lg:text-scale-64 font-bold text-ink tracking-tight leading-[1.08] drop-shadow-xs">
            Wear the wild.
            <br />
            <span className="text-terracotta">Carry the calm.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-scale-16 sm:text-scale-20 text-muted max-w-xl leading-relaxed">
            {COPY.hero.subline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              className="shadow-md"
              onClick={() => {
                document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {COPY.hero.ctaPrimary}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-surface/80 dark:bg-surface/60 backdrop-blur-sm"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {COPY.hero.ctaSecondary}
            </Button>
          </div>

          {/* Supporter Real Counter Progress Pill */}
          <div className="pt-4 max-w-md">
            <div className="p-4 rounded-card bg-surface/90 dark:bg-surface/85 backdrop-blur-md border border-line shadow-card space-y-2">
              <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                <span>{COPY.hero.goalPillPrefix} 1,000 EARLY SUPPORTERS</span>
                <span className="text-terracotta">0 CHARGED TODAY</span>
              </div>
              <ProgressBar current={stats.totalSupporters} goal={1000} showLabels={true} />
            </div>
          </div>

          {/* Quick "Notify Me" Email Form */}
          <div className="max-w-md pt-1">
            {isNotified ? (
              <div className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-scale-12 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{COPY.hero.quickNotifySuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex gap-2">
                <div className="flex-1 rounded-full border border-line bg-surface/90 dark:bg-surface/85 backdrop-blur-sm overflow-hidden px-4 py-2.5 shadow-sm focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={COPY.hero.quickNotifyPlaceholder}
                    className="w-full bg-transparent text-scale-14 text-ink placeholder:text-muted/60 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  isLoading={isSubmitting}
                  className="shadow-sm shrink-0"
                >
                  {COPY.hero.quickNotifyButton}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <div className="relative z-10 w-full flex justify-center pt-8">
        <a
          href="#how-it-works"
          className="p-2 rounded-full bg-surface/80 dark:bg-surface/70 border border-line text-muted hover:text-ink transition-colors animate-bounce shadow-sm"
          aria-label="Scroll down to learn how it works"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
