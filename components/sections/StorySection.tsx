"use client";

import React from "react";
import { COPY } from "@/data/copy";
import { Check, ShieldX } from "lucide-react";

export function StorySection() {
  return (
    <section id="story" className="w-full py-20 bg-sand/30 dark:bg-sand/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Authentic Wildlife Photography of the Barn Owl */}
          <div className="relative aspect-[4/5] sm:aspect-square max-w-lg mx-auto w-full rounded-3xl overflow-hidden border border-line shadow-card group">
            <img
              src="/images/story-owl-night.jpg"
              alt="Majestic barn owl perched on an oak branch beneath a moonlit nocturnal sky"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Field Specimen Badge Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-surface/90 dark:bg-surface/85 backdrop-blur-md border border-line text-scale-12 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta block">
                FIELD SPECIMEN • TYTO ALBA
              </span>
              <span className="text-ink font-medium">
                Photographed in ancient highland oak canopies
              </span>
            </div>
          </div>

          {/* Right: Brand Story Copy & What We Won't Do */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
                {COPY.story.tag}
              </span>
              <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink mt-2">
                {COPY.story.title}
              </h2>
            </div>

            <p className="text-scale-16 text-muted leading-relaxed">
              {COPY.story.p1}
            </p>
            <p className="text-scale-16 text-muted leading-relaxed">
              {COPY.story.p2}
            </p>

            {/* Founder Note & Quote */}
            <div className="p-5 rounded-card bg-surface dark:bg-surface border-l-4 border-l-terracotta border-line border space-y-2">
              <p className="font-fraunces italic text-scale-16 text-ink">
                {COPY.story.quote}
              </p>
              <p className="text-scale-12 font-semibold text-terracotta">
                {COPY.story.founderPlaceholder}
              </p>
            </div>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {COPY.story.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-1.5 rounded-full bg-sand/60 dark:bg-sand/40 border border-line text-scale-12 font-semibold text-forest dark:text-ink flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-terracotta" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>

            {/* "What We Won't Do" Mini List */}
            <div className="pt-4 border-t border-line space-y-2.5">
              <h4 className="text-scale-12 font-semibold text-muted uppercase tracking-wider">
                Our Pre-Launch Honesty Code (What we won't do):
              </h4>
              <ul className="space-y-1.5 text-scale-14 text-ink">
                {COPY.story.whatWeWontDo.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldX className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
