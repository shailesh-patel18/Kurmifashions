"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { InquiryItem, Product } from "./types";
import productsData from "@/data/products.json";

interface KurmiContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  interestList: InquiryItem[];
  addToInterestList: (item: InquiryItem) => void;
  removeFromInterestList: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearInterestList: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  votedCandidates: string[];
  castVote: (candidateId: string) => Promise<boolean>;
  stats: {
    totalSupporters: number;
    goal: number;
    productInterest: Record<string, number>;
  };
  refreshStats: () => Promise<void>;
  supporterNumber: number | null;
  setSupporterNumber: (num: number | null) => void;
}

const KurmiContext = createContext<KurmiContextType | undefined>(undefined);

export function KurmiProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [interestList, setInterestList] = useState<InquiryItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [votedCandidates, setVotedCandidates] = useState<string[]>([]);
  const [supporterNumber, setSupporterNumber] = useState<number | null>(null);

  const [stats, setStats] = useState({
    totalSupporters: 0,
    goal: 1000,
    productInterest: {
      "fox-in-the-pines": 0,
      "night-owl": 0,
      "humpback-drift": 0,
      "mountain-hare": 0,
      "midnight-moth": 0,
      "tiger-lily": 0,
    } as Record<string, number>,
  });

  // Load theme from localStorage / system preference on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("kurmi_theme") as "light" | "dark" | null;
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = prefersDark ? "dark" : "light";
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
      }

      // Load interest list from localStorage
      const storedList = localStorage.getItem("kurmi_interest_list");
      if (storedList) {
        setInterestList(JSON.parse(storedList));
      }

      // Load votes from localStorage
      const storedVotes = localStorage.getItem("kurmi_user_votes");
      if (storedVotes) {
        setVotedCandidates(JSON.parse(storedVotes));
      }
    } catch (e) {
      console.warn("Storage access restricted or unavailable:", e);
    }

    refreshStats();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    const applyTheme = () => {
      setTheme(nextTheme);
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        try {
          localStorage.setItem("kurmi_theme", nextTheme);
        } catch {}
      }
    };

    if (typeof document !== "undefined" && "startViewTransition" in (document as any)) {
      (document as any).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  const addToInterestList = (newItem: InquiryItem) => {
    setInterestList((prev) => {
      // Merge duplicates (same design and size)
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.size === newItem.size
      );
      let updated: InquiryItem[];
      if (existingIndex > -1) {
        updated = [...prev];
        const newQty = Math.min(10, updated[existingIndex].quantity + newItem.quantity);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
      } else {
        updated = [...prev, newItem];
      }
      try {
        localStorage.setItem("kurmi_interest_list", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setIsDrawerOpen(true);
  };

  const removeFromInterestList = (productId: string, size: string) => {
    setInterestList((prev) => {
      const updated = prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      try {
        localStorage.setItem("kurmi_interest_list", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity < 1 || quantity > 10) return;
    setInterestList((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId && item.size === size ? { ...item, quantity } : item
      );
      try {
        localStorage.setItem("kurmi_interest_list", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearInterestList = () => {
    setInterestList([]);
    try {
      localStorage.removeItem("kurmi_interest_list");
    } catch {}
  };

  const castVote = async (candidateId: string): Promise<boolean> => {
    if (votedCandidates.includes(candidateId)) return false;

    // Generate lightweight device fingerprint hash
    const fp = `${navigator.userAgent}-${screen.width}x${screen.height}-${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    let hash = 0;
    for (let i = 0; i < fp.length; i++) {
      hash = (hash << 5) - hash + fp.charCodeAt(i);
      hash |= 0;
    }
    const deviceHash = Math.abs(hash).toString(36);

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId, deviceHash }),
      });

      if (res.ok) {
        const nextVotes = [...votedCandidates, candidateId];
        setVotedCandidates(nextVotes);
        try {
          localStorage.setItem("kurmi_user_votes", JSON.stringify(nextVotes));
        } catch {}
        refreshStats();
        return true;
      }
    } catch (e) {
      console.error("Vote failed:", e);
    }
    return false;
  };

  const refreshStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.warn("Could not fetch latest stats, using cached/initial baseline:", e);
    }
  };

  return (
    <KurmiContext.Provider
      value={{
        theme,
        toggleTheme,
        interestList,
        addToInterestList,
        removeFromInterestList,
        updateQuantity,
        clearInterestList,
        isDrawerOpen,
        setIsDrawerOpen,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        votedCandidates,
        castVote,
        stats,
        refreshStats,
        supporterNumber,
        setSupporterNumber,
      }}
    >
      {children}
    </KurmiContext.Provider>
  );
}

export function useKurmi() {
  const context = useContext(KurmiContext);
  if (!context) {
    throw new Error("useKurmi must be used within a KurmiProvider");
  }
  return context;
}
