"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/lib/types";
import { DesignCard } from "../ui/DesignCard";
import { Chip } from "../ui/Chip";
import { COPY } from "@/data/copy";
import { ArrowUpDown, Compass, Trees, LayoutGrid, BookOpen, Table, Sparkles, MapPin, Check, Heart } from "lucide-react";
import { SPECIES_FIELD_RECORDS } from "@/lib/naturalistData";
import { SketchToStitchSlider } from "../ui/SketchToStitchSlider";
import { useKurmi } from "@/lib/context";

interface CatalogSectionProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  activeGenderFilter: "all" | "men" | "women";
  setActiveGenderFilter: (g: "all" | "men" | "women") => void;
  activeGarmentFilter: "all" | "tshirt" | "shirt";
  setActiveGarmentFilter: (g: "all" | "tshirt" | "shirt") => void;
}

export function CatalogSection({
  products,
  onOpenProductDetail,
  activeGenderFilter,
  setActiveGenderFilter,
  activeGarmentFilter,
  setActiveGarmentFilter,
}: CatalogSectionProps) {
  const { addToInterestList, stats } = useKurmi();
  const [sortBy, setSortBy] = useState<"wanted" | "newest">("wanted");
  const [activeBiome, setActiveBiome] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "lookbook" | "ledger">("grid");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const biomes = [
    { id: "all", label: "All Habitats" },
    { id: "Himalayan", label: "Himalayan Foothills" },
    { id: "Oak", label: "Oak Groves" },
    { id: "Arabian Sea", label: "Arabian Sea" },
    { id: "Tundra", label: "Alpine Tundra" },
    { id: "Western Ghats", label: "Western Ghats" },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchGender =
        activeGenderFilter === "all" || p.gender.includes(activeGenderFilter);
      const matchGarment =
        activeGarmentFilter === "all" || p.garment === activeGarmentFilter;
      const matchBiome =
        activeBiome === "all" ||
        p.habitat.toLowerCase().includes(activeBiome.toLowerCase());
      return matchGender && matchGarment && matchBiome;
    });

    if (sortBy === "wanted") {
      list.sort((a, b) => (b.tag === "Most wanted" ? 1 : 0) - (a.tag === "Most wanted" ? 1 : 0));
    }
    return list;
  }, [products, activeGenderFilter, activeGarmentFilter, activeBiome, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToInterestList({
      productId: product.id,
      size: (product.sizes[1] || product.sizes[0] || "M") as any,
      quantity: 1,
      color: product.colors[0]?.name,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const outfitPairings: Record<string, string> = {
    "fox-in-the-pines": "Heavy washed canvas field trousers in Stone Sand, unlined pine chore jacket, and waxed leather trail boots.",
    "night-owl": "Pleated relaxed linen trousers in Charcoal Slate, vintage field compass lanyard, and vulcanized deck shoes.",
    "humpback-drift": "Indigo selvedge denim shorts, washed organic cotton bucket hat, and natural jute espadrilles.",
    "mountain-hare": "Herringbone twill carpenter pants in Bark Brown, thermal waffle base-layer, and wool trail socks.",
    "midnight-moth": "High-density olive ripstop camp shorts, natural linen overshirt, and brass field watch.",
    "tiger-lily": "Natural raw cotton drawstring chinos, botanical linen band-collar shirt, and handcrafted leather sandals.",
  };

  return (
    <section id="designs" className="w-full py-20 bg-sand/20 dark:bg-sand/10 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-terracotta">
              {COPY.catalog.tag}
            </span>
            <h2 className="font-fraunces text-scale-28 sm:text-scale-40 font-bold text-ink">
              {COPY.catalog.title}
            </h2>
            <p className="text-scale-16 text-muted max-w-xl">
              {COPY.catalog.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher (Grid vs Lookbook vs Ledger) */}
            <div className="flex p-1 rounded-full bg-surface dark:bg-surface border border-line shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="Field Grid View"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-scale-12 font-medium transition-all ${
                  viewMode === "grid" ? "bg-forest text-surface shadow-xs" : "text-muted hover:text-ink"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("lookbook")}
                title="Editorial Lookbook View"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-scale-12 font-medium transition-all ${
                  viewMode === "lookbook" ? "bg-forest text-surface shadow-xs" : "text-muted hover:text-ink"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lookbook</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("ledger")}
                title="Specimen Index Table"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-scale-12 font-medium transition-all ${
                  viewMode === "ledger" ? "bg-forest text-surface shadow-xs" : "text-muted hover:text-ink"
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Specimen Index</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-scale-14">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface dark:bg-surface border border-line rounded-input px-3 py-1.5 text-scale-12 font-medium text-ink focus:outline-none focus:border-terracotta"
              >
                <option value="wanted">{COPY.catalog.sortMostWanted}</option>
                <option value="newest">{COPY.catalog.sortNewest}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Filter Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-line">
          <Chip
            variant="filter"
            active={activeGenderFilter === "all" && activeGarmentFilter === "all" && activeBiome === "all"}
            onClick={() => {
              setActiveGenderFilter("all");
              setActiveGarmentFilter("all");
              setActiveBiome("all");
            }}
          >
            {COPY.catalog.filterAll}
          </Chip>

          <Chip
            variant="filter"
            active={activeGenderFilter === "men"}
            onClick={() =>
              setActiveGenderFilter(activeGenderFilter === "men" ? "all" : "men")
            }
          >
            {COPY.catalog.filterMen}
          </Chip>

          <Chip
            variant="filter"
            active={activeGenderFilter === "women"}
            onClick={() =>
              setActiveGenderFilter(activeGenderFilter === "women" ? "all" : "women")
            }
          >
            {COPY.catalog.filterWomen}
          </Chip>

          <div className="h-6 w-px bg-line mx-1" />

          <Chip
            variant="filter"
            active={activeGarmentFilter === "tshirt"}
            onClick={() =>
              setActiveGarmentFilter(activeGarmentFilter === "tshirt" ? "all" : "tshirt")
            }
          >
            {COPY.catalog.filterTshirts}
          </Chip>

          <Chip
            variant="filter"
            active={activeGarmentFilter === "shirt"}
            onClick={() =>
              setActiveGarmentFilter(activeGarmentFilter === "shirt" ? "all" : "shirt")
            }
          >
            {COPY.catalog.filterShirts}
          </Chip>
        </div>

        {/* Habitat Biome Selector */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2 text-[11px]">
          <span className="text-muted font-medium flex items-center gap-1 mr-2">
            <Compass className="w-3.5 h-3.5 text-terracotta" />
            <span>Habitat Biome:</span>
          </span>
          {biomes.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBiome(activeBiome === b.id ? "all" : b.id)}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeBiome === b.id
                  ? "bg-sand text-forest dark:text-ink border-forest font-semibold shadow-xs"
                  : "bg-surface/60 text-muted hover:text-ink border-line/60"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* View Layout Renderers */}
        {filteredProducts.length > 0 ? (
          viewMode === "grid" ? (
            /* Mode 1: Field 4-Col Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <DesignCard
                  key={prod.id}
                  product={prod}
                  onOpenDetail={onOpenProductDetail}
                />
              ))}
            </div>
          ) : viewMode === "lookbook" ? (
            /* Mode 2: Editorial Lookbook View with Outfit Pairings */
            <div className="space-y-12">
              {filteredProducts.map((prod, idx) => {
                const speciesRec = SPECIES_FIELD_RECORDS[prod.id];
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={prod.id}
                    onClick={() => onOpenProductDetail(prod)}
                    className="p-6 md:p-8 rounded-card border border-line bg-surface dark:bg-surface hover:shadow-card-hover transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                  >
                    {/* Visual Media Spread (7 cols) */}
                    <div className={`md:col-span-7 ${isEven ? "" : "md:order-2"}`}>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-sand/30 border border-line">
                        <img
                          src={prod.images.alt || prod.images.flat}
                          alt={prod.altText}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md border border-line text-[11px] font-semibold text-terracotta flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{prod.habitat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content (5 cols) */}
                    <div className={`md:col-span-5 space-y-4 ${isEven ? "" : "md:order-1"}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                          {speciesRec?.binomial || prod.species}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-sand/60 text-[10px] font-bold text-forest dark:text-emerald-400">
                          {speciesRec?.weightGsm || 180} GSM
                        </span>
                      </div>

                      <h3 className="font-fraunces text-scale-28 font-bold text-ink">
                        {prod.name}
                      </h3>

                      <p className="text-scale-14 text-muted leading-relaxed">
                        {prod.story}
                      </p>

                      {/* Wear With Styling Note */}
                      <div className="p-3.5 rounded-xl bg-sand/30 dark:bg-sand/10 border border-line space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block">
                          Naturalist Outfit Pairing:
                        </span>
                        <p className="text-scale-12 text-ink">
                          {outfitPairings[prod.id] || "Pair with washed organic linen trousers and trail footwear."}
                        </p>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-[11px] text-muted block">Expected price</span>
                          <span className="font-fraunces text-scale-20 font-bold text-ink">
                            ₹{prod.expectedPriceINR.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(prod, e)}
                          className="h-10 px-5 rounded-full bg-forest text-surface font-semibold text-scale-12 flex items-center gap-2 hover:bg-forest/90 transition-colors shadow-sm"
                        >
                          {addedIds[prod.id] ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-300" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Reserve (₹0)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Mode 3: Specimen Index Table View */
            <div className="rounded-2xl border border-line bg-surface overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse text-scale-12">
                <thead>
                  <tr className="border-b border-line bg-sand/30 dark:bg-sand/10 text-muted uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Specimen Design</th>
                    <th className="py-3 px-4">Latin Binomial</th>
                    <th className="py-3 px-4">Habitat Biome</th>
                    <th className="py-3 px-4">Conservation</th>
                    <th className="py-3 px-4">Fabrication</th>
                    <th className="py-3 px-4">Expected Price</th>
                    <th className="py-3 px-4 text-right">Pledge Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {filteredProducts.map((prod) => {
                    const speciesRec = SPECIES_FIELD_RECORDS[prod.id];
                    return (
                      <tr
                        key={prod.id}
                        onClick={() => onOpenProductDetail(prod)}
                        className="hover:bg-sand/20 dark:hover:bg-sand/10 cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-ink flex items-center gap-2.5">
                          <img
                            src={prod.images.flat}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-line"
                          />
                          <span>{prod.name}</span>
                        </td>
                        <td className="py-3.5 px-4 italic text-muted font-mono text-[11px]">
                          {speciesRec?.binomial || prod.species}
                        </td>
                        <td className="py-3.5 px-4 text-ink">{prod.habitat.split("&")[0]}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              speciesRec?.iucnStatus === "VU"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            }`}
                          >
                            IUCN {speciesRec?.iucnStatus || "LC"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-muted">
                          {speciesRec?.weightGsm || 180} GSM Organic
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-ink">
                          ₹{prod.expectedPriceINR}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(prod, e)}
                            className="px-3 py-1.5 rounded-full bg-forest text-surface font-semibold text-[11px] hover:bg-forest/90 transition-colors"
                          >
                            {addedIds[prod.id] ? "Added" : "Reserve ₹0"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Empty Filter State */
          <div className="py-20 text-center space-y-4">
            <p className="font-fraunces text-scale-20 text-ink">
              {COPY.catalog.emptyFilterState}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveGenderFilter("all");
                setActiveGarmentFilter("all");
                setActiveBiome("all");
              }}
              className="text-scale-14 font-semibold text-terracotta hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Sketch to Stitch Interactive Section Feature */}
        <div className="pt-8">
          <SketchToStitchSlider />
        </div>
      </div>
    </section>
  );
}
