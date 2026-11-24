"use client";

import React from "react";
import { Accordion } from "../ui/Accordion";
import faqData from "@/data/faq.json";

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 bg-sand/20 dark:bg-sand/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
            TRANSPARENCY FIRST
          </span>
          <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
            Frequently Asked Questions
          </h2>
          <p className="text-scale-14 text-muted">
            Everything you need to know about our pre-launch model, zero-risk pledge, and data use.
          </p>
        </div>

        <Accordion items={faqData} />
      </div>
    </section>
  );
}
