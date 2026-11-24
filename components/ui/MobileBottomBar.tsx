"use client";

import React from "react";
import { useKurmi } from "@/lib/context";
import { Sparkles, ShoppingBag } from "lucide-react";

export function MobileBottomBar() {
  const { stats, interestList, setIsDrawerOpen, setIsInquiryModalOpen } = useKurmi();

  const totalItems = interestList.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-surface/95 dark:bg-surface/95 backdrop-blur-md border-t border-line shadow-2xl flex items-center justify-between gap-3">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-terracotta">
          PRE-LAUNCH • ₹0 TODAY
        </span>
        <span className="text-scale-12 font-bold text-ink">
          {stats.totalSupporters} / 1,000 Supporters
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (totalItems > 0) {
            setIsInquiryModalOpen(true);
          } else {
            document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="h-11 px-5 rounded-full bg-forest text-surface font-semibold text-scale-12 flex items-center gap-2 shadow-md hover:bg-forest-hover transition-colors"
      >
        {totalItems > 0 ? (
          <>
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span>Submit Inquiry ({totalItems})</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span>Join First Drop</span>
          </>
        )}
      </button>
    </div>
  );
}
