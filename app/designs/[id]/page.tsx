import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, ShieldCheck, Ruler } from "lucide-react";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";
import { ProductDetailView } from "./ProductDetailView";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const products = productsData as Product[];
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = (productsData as Product[]).find((p) => p.id === params.id);
  if (!product) return {};

  return {
    title: `${product.name} | KURMI.FASHIONS Field Design`,
    description: `${product.story} Habitat: ${product.habitat}. Pre-launch inquiry at ₹0. 100% combed cotton.`,
    openGraph: {
      title: `${product.name} • KURMI.FASHIONS`,
      description: product.story,
      images: [{ url: product.images.flat, width: 800, height: 1000, alt: product.altText }],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = (productsData as Product[]).find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#designs"
          className="inline-flex items-center gap-2 text-scale-14 font-semibold text-muted hover:text-terracotta mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to field designs</span>
        </Link>

        <ProductDetailView product={product} />
      </div>
    </div>
  );
}
