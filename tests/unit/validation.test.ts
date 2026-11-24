import { describe, it, expect } from "vitest";
import productsData from "@/data/products.json";
import { ProductsCatalogSchema, InquiryFormSchema, VoteFormSchema } from "@/lib/validation";

describe("Product Catalog Schema Validation", () => {
  it("validates all products in products.json against Zod schema", () => {
    const result = ProductsCatalogSchema.safeParse(productsData);
    if (!result.success) {
      console.error(result.error.format());
    }
    expect(result.success).toBe(true);
  });

  it("ensures each product has required species information, sizes, and images", () => {
    productsData.forEach((p) => {
      expect(p.id).toBeDefined();
      expect(p.name).toBeDefined();
      expect(p.species).toBeDefined();
      expect(p.habitat).toBeDefined();
      expect(p.story.length).toBeLessThanOrEqual(140);
      expect(p.sizes.length).toBeGreaterThanOrEqual(4);
      expect(p.images.flat).toBeDefined();
      expect(p.images.alt).toBeDefined();
      expect(p.images.print).toBeDefined();
    });
  });
});

describe("Inquiry Form Validation", () => {
  it("accepts valid Indian phone numbers (10 digits starting with 6-9)", () => {
    const validData = {
      name: "Aarav Sharma",
      whatsapp: "9876543210",
      email: "aarav@example.com",
      city: "Bengaluru",
      preferredContact: "whatsapp",
      message: "Please include eco-friendly packaging",
      consent: true,
      consentVersion: "v1.0-dpdp-compliant",
      items: [{ productId: "fox-in-the-pines", size: "M", quantity: 1 }],
      honeypot: "",
    };
    const res = InquiryFormSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    const invalidPhone = {
      name: "Aarav Sharma",
      whatsapp: "1234567890", // Does not start with 6-9
      city: "Bengaluru",
      consent: true,
      items: [{ productId: "fox-in-the-pines", size: "M", quantity: 1 }],
    };
    const res = InquiryFormSchema.safeParse(invalidPhone);
    expect(res.success).toBe(false);
  });

  it("requires consent to be checked", () => {
    const noConsent = {
      name: "Aarav Sharma",
      whatsapp: "9876543210",
      city: "Bengaluru",
      consent: false,
      items: [{ productId: "fox-in-the-pines", size: "M", quantity: 1 }],
    };
    const res = InquiryFormSchema.safeParse(noConsent);
    expect(res.success).toBe(false);
  });
});
