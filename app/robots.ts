import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dev/", "/api/admin/"],
    },
    sitemap: "https://kurmi.fashions/sitemap.xml",
  };
}
