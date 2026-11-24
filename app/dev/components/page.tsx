"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InputField, TextareaField } from "@/components/ui/FormField";
import { Accordion } from "@/components/ui/Accordion";
import { DesignCard } from "@/components/ui/DesignCard";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { InterestItemRow } from "@/components/ui/InterestItemRow";
import { VoteCard } from "@/components/ui/VoteCard";
import { KurmiLogo } from "@/components/illustrations/KurmiLogo";
import { FoxIllustration } from "@/components/illustrations/FoxIllustration";
import { OwlIllustration } from "@/components/illustrations/OwlIllustration";
import { WhaleIllustration } from "@/components/illustrations/WhaleIllustration";
import { HareIllustration } from "@/components/illustrations/HareIllustration";
import { MothIllustration } from "@/components/illustrations/MothIllustration";
import { TigerLilyIllustration } from "@/components/illustrations/TigerLilyIllustration";
import productsData from "@/data/products.json";
import voteCandidatesData from "@/data/vote-candidates.json";
import { useKurmi } from "@/lib/context";
import { Sun, Moon, Sparkles, Check } from "lucide-react";

export default function ComponentLibraryPage() {
  const { theme, toggleTheme } = useKurmi();
  const sampleProduct = productsData[0];
  const sampleCandidate = voteCandidatesData[0];

  const [inputVal, setInputVal] = useState("Aarav Sharma");
  const [btnSuccess, setBtnSuccess] = useState(false);

  return (
    <div className="w-full py-16 bg-bg text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-line gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-sand/60 text-scale-12 font-semibold text-terracotta mb-2">
              INTERNAL DESIGN SYSTEM
            </div>
            <h1 className="font-fraunces text-scale-40 font-bold text-ink">
              KURMI Component Library
            </h1>
            <p className="text-scale-14 text-muted">
              Live token swatches, typography scale, states, and accessibility checks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-scale-12 text-muted">Current Theme: <strong className="text-ink uppercase">{theme}</strong></span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              icon={theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            >
              Toggle Mode
            </Button>
          </div>
        </div>

        {/* 1. Design System Tokens & Swatches */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            1. Color Tokens & WCAG AA Contrast Swatches
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "bg", hex: theme === "light" ? "#F6F1E7" : "#121712", desc: "Canvas background" },
              { name: "surface", hex: theme === "light" ? "#FFFFFF" : "#1B221B", desc: "Card surface" },
              { name: "sand", hex: theme === "light" ? "#EAE2D0" : "#232C23", desc: "Secondary fill" },
              { name: "forest", hex: theme === "light" ? "#1F3D2B" : "#2E5A40", desc: "Brand primary" },
              { name: "terracotta", hex: theme === "light" ? "#D2693A" : "#E8855A", desc: "Warm accent" },
              { name: "ink", hex: theme === "light" ? "#1B1F1A" : "#EEF0E8", desc: "Primary text" },
              { name: "muted", hex: theme === "light" ? "#5E665C" : "#8E988A", desc: "Secondary text" },
              { name: "line", hex: theme === "light" ? "#E3DCCB" : "#283328", desc: "Borders & rules" },
            ].map((token) => (
              <div key={token.name} className="p-3 rounded-card bg-surface border border-line shadow-xs space-y-2">
                <div
                  className="w-full h-16 rounded-lg border border-line shadow-inner"
                  style={{ backgroundColor: token.hex }}
                />
                <div>
                  <span className="font-semibold text-scale-14 text-ink block">--color-{token.name}</span>
                  <span className="font-mono text-scale-12 text-muted uppercase">{token.hex}</span>
                  <span className="text-[11px] text-muted block mt-1">{token.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            2. Fluid Typography Scale
          </h2>
          <div className="p-6 rounded-card bg-surface border border-line space-y-6">
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 64 (Heading 1 • Fraunces 800)</span>
              <p className="font-fraunces text-scale-64 font-bold text-ink">Wear the wild.</p>
            </div>
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 40 (Heading 2 • Fraunces 700)</span>
              <p className="font-fraunces text-scale-40 font-bold text-ink">Field Guide Species Entries</p>
            </div>
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 28 (Heading 3 • Fraunces 600)</span>
              <p className="font-fraunces text-scale-28 font-bold text-ink">Original wildlife illustrations made to order.</p>
            </div>
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 20 (Heading 4 • Fraunces 600)</span>
              <p className="font-fraunces text-scale-20 font-bold text-ink">Zero waste. Made only on genuine demand.</p>
            </div>
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 16 (Body Regular • Inter)</span>
              <p className="text-scale-16 text-muted">A quiet wanderer traversing sunlit pine needles at dawn, alert to every rustling twig.</p>
            </div>
            <div className="border-b border-line pb-4">
              <span className="text-scale-12 text-muted block">Scale 14 (UI / Small • Inter)</span>
              <p className="text-scale-14 text-ink font-medium">100% combed cotton, 180 GSM bio-washed pre-shrunk fabric.</p>
            </div>
            <div>
              <span className="text-scale-12 text-muted block">Scale 12 (Micro / Tags • Inter)</span>
              <p className="text-scale-12 uppercase tracking-widest text-terracotta font-semibold">Field Specimen • No. 01</p>
            </div>
          </div>
        </section>

        {/* 3. Buttons & States */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            3. Buttons & Interactive States
          </h2>
          <div className="p-6 rounded-card bg-surface border border-line space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="lg">Primary LG</Button>
              <Button variant="primary" size="md">Primary MD</Button>
              <Button variant="primary" size="sm">Primary SM</Button>
              <Button variant="secondary" size="md">Secondary (Terracotta)</Button>
              <Button variant="outline" size="md">Outline</Button>
              <Button variant="ghost" size="md">Ghost</Button>
              <Button variant="sand" size="md">Sand</Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-line">
              <Button variant="primary" size="md" isLoading>Loading State</Button>
              <Button variant="primary" size="md" disabled>Disabled State</Button>
              <Button
                variant="primary"
                size="md"
                isSuccess={btnSuccess}
                onClick={() => {
                  setBtnSuccess(true);
                  setTimeout(() => setBtnSuccess(false), 2000);
                }}
              >
                Click to Morph Check
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Chips & Selectors */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            4. Chips & Tags
          </h2>
          <div className="p-6 rounded-card bg-surface border border-line space-y-4">
            <div className="flex flex-wrap gap-2">
              <Chip variant="filter" active={true} count={6}>All Species</Chip>
              <Chip variant="filter" active={false} count={4}>Men</Chip>
              <Chip variant="filter" active={false} count={2}>Women</Chip>
              <Chip variant="tag">Most wanted</Chip>
              <Chip variant="tag">Concept</Chip>
            </div>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s, idx) => (
                <Chip key={s} variant="size" active={idx === 2}>{s}</Chip>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Progress Bars */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            5. Progress Indicators (Goal: 1,000)
          </h2>
          <div className="p-6 rounded-card bg-surface border border-line space-y-6">
            <div>
              <span className="text-scale-12 text-muted block mb-1">0% (Baseline Zero State)</span>
              <ProgressBar current={0} goal={1000} />
            </div>
            <div>
              <span className="text-scale-12 text-muted block mb-1">340 Supporters (34%)</span>
              <ProgressBar current={340} goal={1000} />
            </div>
            <div>
              <span className="text-scale-12 text-muted block mb-1">1,000 Supporters (100% Unlocked)</span>
              <ProgressBar current={1000} goal={1000} />
            </div>
          </div>
        </section>

        {/* 6. Form Fields */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            6. Accessible Form Fields
          </h2>
          <div className="p-6 rounded-card bg-surface border border-line max-w-xl space-y-4">
            <InputField
              label="Supporter Name"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              required
            />
            <InputField
              label="WhatsApp Number"
              placeholder="9876543210"
              error="Please enter a valid 10-digit Indian mobile number starting with 6-9"
              required
            />
            <TextareaField
              label="Field Notes"
              placeholder="Tell our illustrators what fit or creature you love..."
              hint="Max 500 chars"
            />
          </div>
        </section>

        {/* 7. Design Card & Category Tile */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            7. Product Cards & Tiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DesignCard product={sampleProduct as any} />
            <CategoryTile
              id="test"
              label="Men's T-Shirts"
              gender="men"
              garment="tshirt"
              desc="180 GSM bio-washed cotton, relaxed chest, field-ready comfort."
              animal="Himalayan Red Fox"
              onClick={() => {}}
            />
            <VoteCard candidate={sampleCandidate} totalVotes={446} />
          </div>
        </section>

        {/* 8. Wildlife Vector Illustrations */}
        <section className="space-y-6">
          <h2 className="font-fraunces text-scale-28 font-bold text-ink">
            8. Wildlife Vector Kit (Layered SVGs)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <FoxIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Red Fox</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <OwlIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Barn Owl</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <WhaleIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Humpback Whale</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <HareIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Mountain Hare</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <MothIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Moon Moth</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-line text-center space-y-2">
              <div className="aspect-square flex items-center justify-center">
                <TigerLilyIllustration />
              </div>
              <span className="font-semibold text-scale-12 text-ink">Tiger Lily</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
