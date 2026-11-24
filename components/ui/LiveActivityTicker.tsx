"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, MapPin } from "lucide-react";

interface ActivityItem {
  id: string;
  name: string;
  city: string;
  species: string;
  size: string;
  timeAgo: string;
}

const sampleActivities: ActivityItem[] = [
  { id: "1", name: "Aarav S.", city: "Bengaluru", species: "Fox in the Pines", size: "L", timeAgo: "3m ago" },
  { id: "2", name: "Rhea M.", city: "Mumbai", species: "Night Owl Vigil", size: "M", timeAgo: "7m ago" },
  { id: "3", name: "Vikram D.", city: "Dehradun", species: "Humpback Drift", size: "XL", timeAgo: "12m ago" },
  { id: "4", name: "Ananya P.", city: "Pune", species: "Mountain Hare", size: "S", timeAgo: "16m ago" },
  { id: "5", name: "Kabir T.", city: "Delhi NCR", species: "Midnight Silk Moth", size: "M", timeAgo: "22m ago" },
  { id: "6", name: "Sneha K.", city: "Kochi", species: "Tiger Lily & Leopard", size: "M", timeAgo: "28m ago" },
];

export function LiveActivityTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % sampleActivities.length);
        setVisible(true);
      }, 500);
    }, 6500);

    return () => clearInterval(interval);
  }, [closed]);

  if (closed) return null;

  const current = sampleActivities[index];

  return (
    <aside
      aria-label="Recent community pledge activity"
      className={`fixed bottom-20 left-4 z-30 max-w-sm transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 p-3 pr-4 rounded-2xl bg-surface/95 dark:bg-surface/90 backdrop-blur-md border border-line shadow-floating text-scale-12">
        <div className="w-8 h-8 rounded-full bg-forest text-surface flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-300" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-ink truncate">{current.name}</span>
            <span className="text-[10px] text-muted flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-terracotta" />
              {current.city}
            </span>
          </div>
          <p className="text-muted text-[11px] truncate">
            Pledged <strong className="text-forest dark:text-emerald-400 font-medium">{current.species}</strong> ({current.size}) • {current.timeAgo}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setClosed(true)}
          className="p-1 rounded-full text-muted hover:text-ink hover:bg-sand/60 transition-colors"
          aria-label="Dismiss recent activity ticker"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
