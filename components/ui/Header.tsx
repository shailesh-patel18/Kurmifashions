"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useKurmi } from "@/lib/context";
import { KurmiLogo } from "../illustrations/KurmiLogo";
import { NatureAudioToggle } from "./NatureAudioToggle";
import { COPY } from "@/data/copy";
import { Button } from "./Button";

export function Header() {
  const { theme, toggleTheme, interestList, setIsDrawerOpen, setIsInquiryModalOpen } = useKurmi();
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementPaused, setIsAnnouncementPaused] = useState(false);

  // Announcement Bar rotation every 3.5s
  useEffect(() => {
    if (isAnnouncementPaused) return;
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % COPY.announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAnnouncementPaused]);

  // Scroll detection for header backdrop blur & shadow after 40px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItemsCount = interestList.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* 1. Announcement Bar */}
      <div
        onMouseEnter={() => setIsAnnouncementPaused(true)}
        onMouseLeave={() => setIsAnnouncementPaused(false)}
        onFocus={() => setIsAnnouncementPaused(true)}
        onBlur={() => setIsAnnouncementPaused(false)}
        tabIndex={0}
        className="w-full bg-forest dark:bg-sand text-surface dark:text-ink py-2 px-4 text-center text-scale-12 font-medium tracking-wide transition-colors relative"
        role="region"
        aria-label="Pre-launch announcements"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0 animate-ping" />
          <span className="truncate">{COPY.announcements[announcementIdx]}</span>
        </div>
      </div>

      {/* 2. Main Sticky Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-bg/90 dark:bg-bg/90 backdrop-blur-md shadow-card border-b border-line"
            : "bg-transparent border-b border-line/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with Wildcat Botanical Seal */}
          <Link href="/" className="flex items-center gap-3" aria-label="KURMI.FASHIONS Homepage">
            <KurmiLogo size={42} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 font-medium text-scale-14 text-ink">
            <a href="#designs" className="hover:text-terracotta transition-colors">
              Designs
            </a>
            <a href="#categories" className="hover:text-terracotta transition-colors">
              Collections
            </a>
            <a href="#how-it-works" className="hover:text-terracotta transition-colors">
              How it works
            </a>
            <a href="#vote" className="hover:text-terracotta transition-colors">
              Vote species
            </a>
            <a href="#story" className="hover:text-terracotta transition-colors">
              Our story
            </a>
            <a href="#faq" className="hover:text-terracotta transition-colors">
              FAQ
            </a>
          </div>

          {/* Scrolled Mini Milestone Pill */}
          {isScrolled && (
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-sand/60 dark:bg-sand/30 border border-line text-[11px] animate-in fade-in duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-ink">{useKurmi().stats.totalSupporters} / 1,000</span>
              <span className="text-muted">Pledged</span>
            </div>
          )}

          {/* Right Action Icons: Theme Toggle, Interest List, CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Ambient Nature Soundscape Toggle */}
            <NatureAudioToggle />

            {/* Theme Toggle with Circular Reveal transition */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:bg-sand/60 transition-colors shrink-0"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-forest" />
              ) : (
                <Sun className="w-4 h-4 text-terracotta" />
              )}
            </button>

            {/* Interest List Drawer Trigger Button with Real Count Badge */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative h-10 px-4 rounded-full border border-line flex items-center gap-2 text-ink hover:bg-sand/60 transition-colors font-medium text-scale-14"
              aria-label={`Open interest list, ${totalItemsCount} items selected`}
            >
              <ShoppingBag className="w-4 h-4 text-terracotta" />
              <span className="hidden sm:inline">Interest list</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-forest text-surface text-[11px] font-bold flex items-center justify-center animate-in zoom-in-50">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* "Join the first drop" CTA */}
            <Button
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
              onClick={() => {
                if (interestList.length > 0) {
                  setIsInquiryModalOpen(true);
                } else {
                  // Smooth scroll to designs
                  document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Join the first drop
            </Button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-ink hover:bg-sand/60 rounded-full"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-surface dark:bg-surface border-b border-line p-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 font-fraunces text-scale-16 font-semibold text-ink">
              <a
                href="#designs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                Designs
              </a>
              <a
                href="#categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                Collections
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                How it works
              </a>
              <a
                href="#vote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                Vote species
              </a>
              <a
                href="#story"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                Our story
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-terracotta"
              >
                FAQ
              </a>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (interestList.length > 0) {
                  setIsInquiryModalOpen(true);
                } else {
                  document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Join the first drop
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
