"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-5">
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full flex justify-between items-center text-left gap-4 font-fraunces text-scale-16 md:text-scale-20 font-semibold text-ink hover:text-terracotta transition-colors group"
              >
                <span>{item.question}</span>
                <span
                  className={`w-8 h-8 rounded-full bg-sand/60 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-forest text-surface" : "text-muted group-hover:text-ink"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              hidden={!isOpen}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "pt-3 opacity-100 max-h-96" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-scale-14 text-muted leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
