import { MetadataRoute } from "next";
import productsData from "@/data/products.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kurmi.fashions";
  const routes = ["", "/privacy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.6,
  }));

  const productRoutes = productsData.map((p) => ({
    url: `${baseUrl}/designs/${p.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}
