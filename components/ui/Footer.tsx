"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KurmiLogo } from "../illustrations/KurmiLogo";
import { COPY } from "@/data/copy";
import { Button } from "./Button";
import { Send, Check, ShieldCheck } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
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
        setIsSubscribed(true);
        setEmail("");
      }
    } catch {}
    setIsSubmitting(false);
  };

  return (
    <footer className="w-full bg-sand/60 dark:bg-sand/30 border-t border-line pt-16 pb-12 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <KurmiLogo size={46} />
            <p className="text-scale-14 text-muted max-w-sm leading-relaxed">
              {COPY.brand.heroSubtitle}
            </p>
            <p className="text-scale-12 text-muted font-medium">
              {COPY.brand.madeIn}
            </p>
            <div className="flex items-center gap-2 text-scale-12 text-forest dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              <span>India DPDP Act Compliant • Zero Scarcity Gimmicks</span>
            </div>
          </div>

          {/* Designs Navigation */}
          <div className="space-y-3">
            <h4 className="font-fraunces font-bold text-scale-16 text-ink">
              Species Field
            </h4>
            <ul className="space-y-2 text-scale-14 text-muted">
              <li><a href="#designs" className="hover:text-terracotta transition-colors">Fox in the Pines</a></li>
              <li><a href="#designs" className="hover:text-terracotta transition-colors">Night Owl Vigil</a></li>
              <li><a href="#designs" className="hover:text-terracotta transition-colors">Humpback Drift</a></li>
              <li><a href="#designs" className="hover:text-terracotta transition-colors">Mountain Hare</a></li>
              <li><a href="#designs" className="hover:text-terracotta transition-colors">Midnight Silk Moth</a></li>
              <li><a href="#vote" className="hover:text-terracotta transition-colors">Vote Next Species</a></li>
            </ul>
          </div>

          {/* Help & Transparent Policies */}
          <div className="space-y-3">
            <h4 className="font-fraunces font-bold text-scale-16 text-ink">
              Pre-Launch Guide
            </h4>
            <ul className="space-y-2 text-scale-14 text-muted">
              <li><a href="#how-it-works" className="hover:text-terracotta transition-colors">{COPY.footer.links.howItWorks}</a></li>
              <li><a href="#faq" className="hover:text-terracotta transition-colors">{COPY.footer.links.faq}</a></li>
              <li><Link href="/privacy" className="hover:text-terracotta transition-colors">{COPY.footer.links.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-terracotta transition-colors">{COPY.footer.links.terms}</Link></li>
              <li>
                <a
                  href="https://wa.me/919876543210?text=Hi%20KURMI%20team,%20I%20have%20a%20question%20about%20the%20drop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta transition-colors"
                >
                  {COPY.footer.links.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Notify Email Form */}
          <div className="space-y-3">
            <h4 className="font-fraunces font-bold text-scale-16 text-ink">
              Stay in the Loop
            </h4>
            <p className="text-scale-12 text-muted leading-relaxed">
              Get notified the moment our 1,000 inquiries goal is unlocked. No spam, ever.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-scale-12 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You're on the launch alert ledger!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-full border border-line bg-surface overflow-hidden p-1 focus-within:border-terracotta">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-3 py-1.5 bg-transparent text-scale-12 text-ink placeholder:text-muted/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 rounded-full bg-forest text-surface font-semibold text-scale-12 hover:bg-forest-hover transition-colors"
                  >
                    {isSubmitting ? "..." : "Join"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Legal Pre-launch Disclaimer Banner */}
        <div className="pt-8 border-t border-line text-scale-12 text-muted flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-ink font-semibold">Pre-launch Demand Notice:</strong> {COPY.footer.disclaimer}
          </p>
          <p className="shrink-0">{COPY.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
