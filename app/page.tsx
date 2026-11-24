"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LiveActivityTicker } from "@/components/ui/LiveActivityTicker";
import { HeroSection } from "@/components/sections/HeroSection";
import { MilestoneRoadmap } from "@/components/sections/MilestoneRoadmap";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TransparencySection } from "@/components/sections/TransparencySection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { CatalogSection } from "@/components/sections/CatalogSection";
import { GarmentAnatomy } from "@/components/ui/GarmentAnatomy";
import { VotingSection } from "@/components/sections/VotingSection";
import { SupporterRoster } from "@/components/sections/SupporterRoster";
import { IndiaBackerMap } from "@/components/ui/IndiaBackerMap";
import { SocialStoryCard } from "@/components/ui/SocialStoryCard";
import { InquiryStatusTracker } from "@/components/ui/InquiryStatusTracker";
import { CraftJournalSection } from "@/components/sections/CraftJournalSection";
import { StorySection } from "@/components/sections/StorySection";
import { WhyInquiriesSection } from "@/components/sections/WhyInquiriesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBandSection } from "@/components/sections/CtaBandSection";
import { HillsDivider, WavesDivider, PinesDivider } from "@/components/illustrations/SectionDividers";
import { ProductDetailModal } from "@/components/ui/ProductDetailModal";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";

function KurmiHomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeGender, setActiveGender] = useState<"all" | "men" | "women">("all");
  const [activeGarment, setActiveGarment] = useState<"all" | "tshirt" | "shirt">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = productsData as Product[];

  // Sync state with URL search params on mount or param changes
  useEffect(() => {
    const gParam = searchParams.get("gender");
    const garParam = searchParams.get("garment");

    if (gParam === "men" || gParam === "women") {
      setActiveGender(gParam);
    }
    if (garParam === "tshirt" || garParam === "shirt") {
      setActiveGarment(garParam);
    }
  }, [searchParams]);

  const handleSelectCategory = (gender: "men" | "women", garment: "tshirt" | "shirt") => {
    setActiveGender(gender);
    setActiveGarment(garment);
    router.push(`/?gender=${gender}&garment=${garment}#designs`, { scroll: false });
    document.getElementById("designs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col">
      {/* 0. Live Pre-Launch Activity Ticker */}
      <LiveActivityTicker />

      {/* 1. Hero Section (full viewport with Asiatic lions specimen photography) */}
      <HeroSection />

      {/* 2. Milestone Roadmap (Pledges toward 1,000 backer drop threshold) */}
      <MilestoneRoadmap />

      {/* 3. How it works section */}
      <HowItWorksSection />
      <HillsDivider className="text-sand/30 dark:text-sand/15" />

      {/* 4. Radical Transparency (Cost breakdown drawer, Eco impact receipt, Fiber microscope) */}
      <TransparencySection />

      {/* 5. Category Tiles */}
      <CategoriesSection onSelectCategory={handleSelectCategory} />

      {/* 6. Designs Field Catalog Grid (Grid, Lookbook, Specimen Index & Sketch to Stitch) */}
      <CatalogSection
        products={products}
        onOpenProductDetail={(prod) => setSelectedProduct(prod)}
        activeGenderFilter={activeGender}
        setActiveGenderFilter={setActiveGender}
        activeGarmentFilter={activeGarment}
        setActiveGarmentFilter={setActiveGarment}
      />
      <WavesDivider className="text-sand/20 dark:text-sand/10" />

      {/* 7. Garment Anatomy & Tailoring Science */}
      <section className="py-16 bg-surface dark:bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GarmentAnatomy />
        </div>
      </section>

      {/* 8. Vote The Next Wildlife Design & 1% Conservation Allocation */}
      <VotingSection />

      {/* 9. Supporter Community Wall & India Backer Map */}
      <SupporterRoster />
      <section className="py-16 bg-sand/20 dark:bg-sand/10 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <IndiaBackerMap />
          <SocialStoryCard />
          <InquiryStatusTracker />
        </div>
      </section>

      {/* 10. Behind-the-Scenes Craft Journal & Plantable Packaging */}
      <CraftJournalSection />
      <PinesDivider className="text-sand/20 dark:text-sand/10" />

      {/* 11. Brand Story & Honesty Code */}
      <StorySection />

      {/* 12. Why We Start With Inquiries */}
      <WhyInquiriesSection />

      {/* 13. FAQ Section */}
      <FaqSection />

      {/* 14. CTA Band Section */}
      <CtaBandSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <KurmiHomeContent />
    </Suspense>
  );
}
