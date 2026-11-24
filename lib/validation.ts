import { z } from "zod";

export const ProductColorSchema = z.object({
  name: z.string(),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
});

export const ProductImageSchema = z.object({
  flat: z.string(),
  alt: z.string(),
  print: z.string(),
});

export const ProductSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  species: z.string().min(2),
  habitat: z.string().min(2),
  story: z.string().max(140, "Story must be max 140 chars"),
  gender: z.array(z.enum(["men", "women"])),
  garment: z.enum(["tshirt", "shirt"]),
  fit: z.enum(["regular", "oversized", "relaxed"]),
  fabric: z.string(),
  colors: z.array(ProductColorSchema),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])),
  expectedPriceINR: z.number().int().positive(),
  tag: z.string(),
  images: ProductImageSchema,
  altText: z.string(),
  status: z.enum(["concept", "voting", "in-production", "archived"]).default("concept"),
});

export const ProductsCatalogSchema = z.array(ProductSchema);

export const InquiryItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
  quantity: z.number().int().min(1).max(10),
  color: z.string().optional(),
});

export const InquiryFormSchema = z.object({
  name: z.string().min(2, "Please enter your name (at least 2 characters)").max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number starting with 6-9"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  city: z.string().min(2, "Please enter your city/town").max(80),
  preferredContact: z.enum(["whatsapp", "email"]).default("whatsapp"),
  message: z.string().max(500, "Message cannot exceed 500 characters").optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to launch updates to submit" }),
  }),
  consentVersion: z.string().default("v1.0-dpdp-compliant"),
  items: z.array(InquiryItemSchema).min(1, "Please select at least one species item"),
  referredBy: z.string().optional().nullable(),
  honeypot: z.string().max(0, "Spam detected").optional().default(""),
});

export const SubscribeFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  honeypot: z.string().max(0, "Spam detected").optional().default(""),
});

export const VoteFormSchema = z.object({
  candidateId: z.string().min(1, "Candidate ID required"),
  deviceHash: z.string().min(8, "Device signature required"),
});
