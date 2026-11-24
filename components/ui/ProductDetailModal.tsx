"use client";

import React, { useState } from "react";
import {
  X,
  MapPin,
  Sparkles,
  Check,
  Ruler,
  Share2,
  Volume2,
  VolumeX,
  Download,
  Sun,
  Moon,
  Sunset,
  BookOpen,
  Palette,
  ShieldCheck,
  Award,
  Layers,
} from "lucide-react";
import { Product } from "@/lib/types";
import { useKurmi } from "@/lib/context";
import { Button } from "./Button";
import { Chip } from "./Chip";
import { SPECIES_FIELD_RECORDS } from "@/lib/naturalistData";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToInterestList, setIsSizeGuideOpen } = useKurmi();
  const [activeImage, setActiveImage] = useState<"flat" | "alt" | "print">("flat");
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[1] || product?.sizes[0] || "M");
  const [selectedLength, setSelectedLength] = useState<"regular" | "tall">("regular");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [lightingMode, setLightingMode] = useState<"golden" | "noon" | "moonlight">("noon");
  const [activeTab, setActiveTab] = useState<"garment" | "journal" | "dye">("garment");
  const [selectedModel, setSelectedModel] = useState<"male" | "female">("male");

  if (!product) return null;

  const speciesInfo = SPECIES_FIELD_RECORDS[product.id];

  const handleAdd = () => {
    addToInterestList({
      productId: product.id,
      size: selectedSize as any,
      quantity,
      color: product.colors[0]?.name,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/designs/${product.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePlaySpeciesAudio = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = product.id.includes("whale") ? "sine" : product.id.includes("owl") ? "triangle" : "sawtooth";
      const baseFreq = product.id.includes("whale") ? 80 : product.id.includes("owl") ? 320 : 210;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.3);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2300);
    } catch {}
  };

  const handleDownloadWallpaper = () => {
    const link = document.createElement("a");
    link.href = product.images.print;
    link.download = `kurmi-${product.id}-field-plate.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lightingFilters = {
    noon: "brightness-100 contrast-100",
    golden: "sepia-30 brightness-105 saturate-125 hue-rotate-[-10deg]",
    moonlight: "brightness-85 contrast-115 hue-rotate-[160deg] saturate-75",
  };

  const habitatClimate: Record<string, string> = {
    "fox-in-the-pines": "Himalayan Pines: 14°C • Alpine Mist",
    "night-owl": "Oak Groves: 19°C • Moonlight Breeze",
    "humpback-drift": "Arabian Sea: 27°C • Coastal Drift",
    "mountain-hare": "Spiti Tundra: 6°C • Mountain Gale",
    "midnight-moth": "Western Ghats: 22°C • Shola Humidity",
    "tiger-lily": "Sacred Groves: 21°C • Cloud Canopy Dew",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-surface dark:bg-surface rounded-card border border-line shadow-2xl p-6 md:p-8 z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-sand/60 text-muted hover:text-ink transition-colors"
          aria-label="Close product detail"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Gallery View & Ambient Simulator */}
          <div className="space-y-4">
            <div className="aspect-[4/5] w-full rounded-2xl bg-sand/40 dark:bg-sand/20 border border-line overflow-hidden flex items-center justify-center relative shadow-sm">
              <img
                src={product.images[activeImage]}
                alt={product.altText}
                className={`w-full h-full object-cover transition-all duration-500 ${lightingFilters[lightingMode]}`}
              />

              {/* Habitat Tag & Native Habitat Live Climate Feed */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-line text-[11px] font-semibold text-terracotta">
                <MapPin className="w-3.5 h-3.5" />
                <span>{product.habitat}</span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-sm border border-line text-[10px] font-semibold text-forest dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{habitatClimate[product.id] || "Native Reserve: 24°C • Clear"}</span>
              </div>

              {/* Ambient Sunlight Simulator Bar */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 p-1 rounded-full bg-surface/85 backdrop-blur-md border border-line text-[10px]">
                <button
                  type="button"
                  onClick={() => setLightingMode("noon")}
                  title="Studio Daylight"
                  className={`p-1.5 rounded-full transition-colors ${
                    lightingMode === "noon" ? "bg-forest text-surface" : "text-muted hover:text-ink"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightingMode("golden")}
                  title="Golden Hour Sunset"
                  className={`p-1.5 rounded-full transition-colors ${
                    lightingMode === "golden" ? "bg-amber-600 text-surface" : "text-muted hover:text-ink"
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightingMode("moonlight")}
                  title="Nocturnal Moonlight"
                  className={`p-1.5 rounded-full transition-colors ${
                    lightingMode === "moonlight" ? "bg-indigo-700 text-surface" : "text-muted hover:text-ink"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* High-Res Wallpaper Download Pill */}
              <button
                type="button"
                onClick={handleDownloadWallpaper}
                title="Download 1600px Archival Print Plate"
                className="absolute bottom-3 right-3 p-1.5 rounded-full bg-surface/85 backdrop-blur-md border border-line text-muted hover:text-ink transition-colors flex items-center gap-1 px-2.5 text-[10px] font-semibold"
              >
                <Download className="w-3 h-3 text-terracotta" />
                <span>Field Plate</span>
              </button>
            </div>

            {/* Thumbnail Pickers */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {(["flat", "alt", "print"] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveImage(view)}
                    className={`w-16 h-16 rounded-xl bg-sand/30 border-2 overflow-hidden transition-all ${
                      activeImage === view ? "border-forest dark:border-emerald-400" : "border-line"
                    }`}
                    aria-label={`View ${view} shot`}
                  >
                    <img src={product.images[view]} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Model Sizing Callout Selector */}
              <div className="text-right text-[11px] text-muted space-y-1">
                <span className="block font-semibold text-ink">Field Fit Model:</span>
                <div className="flex gap-1 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedModel("male")}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      selectedModel === "male" ? "bg-forest text-surface" : "bg-sand/60 text-muted"
                    }`}
                  >
                    Kabir (6'1", XL)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedModel("female")}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      selectedModel === "female" ? "bg-forest text-surface" : "bg-sand/60 text-muted"
                    }`}
                  >
                    Ananya (5'7", M)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Specimen Information & Tabs */}
          <div className="space-y-4">
            <div>
              {/* Species Badge & Species Audio Calling Card */}
              <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                    {speciesInfo?.binomial || product.species}
                  </span>
                  {speciesInfo && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        speciesInfo.iucnStatus === "VU"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      }`}
                    >
                      IUCN: {speciesInfo.iucnStatus}
                    </span>
                  )}
                </div>

                {/* Species Calling Card Audio Trigger */}
                <button
                  type="button"
                  onClick={handlePlaySpeciesAudio}
                  className="px-2.5 py-1 rounded-full bg-sand/60 hover:bg-sand border border-line text-[11px] text-forest dark:text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? "animate-bounce text-terracotta" : ""}`} />
                  <span>{isPlayingAudio ? "Calling..." : "Hear Wildlife Sound"}</span>
                </button>
              </div>

              <h1 id="product-modal-title" className="font-fraunces text-scale-28 md:text-scale-36 font-bold text-ink">
                {product.name}
              </h1>
              <p className="mt-1 text-scale-14 text-muted leading-relaxed">
                {product.story}
              </p>
            </div>

            {/* Specimen Detail Tabs */}
            <div className="flex gap-2 border-b border-line pb-2">
              <button
                type="button"
                onClick={() => setActiveTab("garment")}
                className={`text-scale-12 font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "garment" ? "border-forest text-forest dark:text-emerald-400" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                Garment Anatomy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("journal")}
                className={`text-scale-12 font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "journal" ? "border-forest text-forest dark:text-emerald-400" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                Naturalist Journal
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dye")}
                className={`text-scale-12 font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "dye" ? "border-forest text-forest dark:text-emerald-400" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                Botanical Dye Origin
              </button>
            </div>

            {activeTab === "garment" && (
              <div className="p-3.5 rounded-xl bg-sand/40 dark:bg-sand/20 border border-line space-y-2 text-scale-12">
                <div className="flex justify-between">
                  <span className="text-muted">Fabrication:</span>
                  <span className="font-semibold text-ink">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Print Specifications:</span>
                  <span className="font-semibold text-ink">{speciesInfo?.printSpecs.dimensions || "11\" × 14\" Discharge"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Weight & Weave:</span>
                  <span className="font-semibold text-ink">{speciesInfo?.weightGsm || 180} GSM Ring-Spun Jersey</span>
                </div>
              </div>
            )}

            {activeTab === "journal" && (
              <div className="p-3.5 rounded-xl bg-sand/40 dark:bg-sand/20 border border-line space-y-1.5 text-scale-12">
                <span className="font-bold text-ink block">{speciesInfo?.binomial} Field Notes</span>
                <p className="text-[11px] text-muted leading-relaxed">
                  {speciesInfo?.conservationStory || "Documented during Himalayan field transects at high elevation."}
                </p>
                <div className="pt-1 text-[10px] text-terracotta font-semibold">
                  Acoustic Signature: {speciesInfo?.audioNote}
                </div>
              </div>
            )}

            {activeTab === "dye" && (
              <div className="p-3.5 rounded-xl bg-sand/40 dark:bg-sand/20 border border-line space-y-1.5 text-scale-12">
                <span className="font-bold text-ink block">Pigment: {speciesInfo?.dyeOrigin.pigment}</span>
                <p className="text-[11px] text-muted leading-relaxed">
                  Source: {speciesInfo?.dyeOrigin.source}
                </p>
                <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">
                  Process: {speciesInfo?.dyeOrigin.process}
                </p>
              </div>
            )}

            {/* Pricing Section */}
            <div>
              <span className="text-scale-12 text-muted block">Expected launch price</span>
              <div className="flex items-baseline gap-2">
                <span className="font-fraunces text-scale-24 font-bold text-ink">
                  ₹{product.expectedPriceINR.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-terracotta font-medium">
                  (₹0 today • Pay only when drop unlocks)
                </span>
              </div>
            </div>

            {/* Length & Size Selectors */}
            <div className="space-y-3">
              {/* Torso Cut Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase text-muted">Cut:</span>
                <button
                  type="button"
                  onClick={() => setSelectedLength("regular")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    selectedLength === "regular" ? "bg-forest text-surface" : "bg-sand/60 text-muted"
                  }`}
                >
                  Regular Fit
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLength("tall")}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    selectedLength === "tall" ? "bg-forest text-surface" : "bg-sand/60 text-muted"
                  }`}
                >
                  Longline / Tall (+2.5")
                </button>
              </div>

              {/* Size Selector with Size Guide Link */}
              <div className="flex justify-between items-center">
                <label className="text-scale-12 font-semibold text-ink uppercase tracking-wider">
                  Select Size:
                </label>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-scale-12 text-terracotta hover:underline font-medium flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide (Sample)</span>
                </button>
              </div>

              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Chip
                    key={size}
                    variant="size"
                    active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add Action */}
            <div className="pt-2 flex gap-3 items-center">
              <div className="flex items-center gap-2 bg-sand/50 dark:bg-sand/30 rounded-full p-1.5 border border-line">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-surface text-ink font-bold flex items-center justify-center hover:bg-sand"
                >
                  -
                </button>
                <span className="w-8 text-center text-scale-14 font-bold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 rounded-full bg-surface text-ink font-bold flex items-center justify-center hover:bg-sand"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAdd}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>Added to Interest List</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>I want this ({selectedSize} • {selectedLength})</span>
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={handleShare}
                className="w-12 h-12 rounded-full border border-line flex items-center justify-center hover:bg-sand/60 text-muted hover:text-ink transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-5 h-5 text-terracotta" />
              </button>
            </div>
            {copiedLink && (
              <p className="text-scale-12 text-emerald-600 font-medium text-center">
                Species link copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
