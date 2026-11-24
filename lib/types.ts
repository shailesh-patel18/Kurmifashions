import { z } from "zod";
import {
  ProductSchema,
  InquiryItemSchema,
  InquiryFormSchema,
  SubscribeFormSchema,
  VoteFormSchema,
} from "./validation";

export type Product = z.infer<typeof ProductSchema>;
export type InquiryItem = z.infer<typeof InquiryItemSchema>;
export type InquiryFormValues = z.infer<typeof InquiryFormSchema>;
export type SubscribeFormValues = z.infer<typeof SubscribeFormSchema>;
export type VoteFormValues = z.infer<typeof VoteFormSchema>;

export interface VoteCandidate {
  id: string;
  name: string;
  species: string;
  habitat: string;
  story: string;
  expectedGarment: string;
  palette: string;
  image?: string;
  votesCount: number;
}

export interface InquiryRecord {
  id: string;
  created_at: string;
  name: string;
  whatsapp: string;
  email?: string | null;
  city: string;
  preferred_contact: "whatsapp" | "email";
  message?: string | null;
  consent_at: string;
  consent_text_version: string;
  referral_code: string;
  referred_by?: string | null;
  status: "new" | "contacted" | "converted";
  source?: string | null;
  items: InquiryItem[];
  supporterNumber: number;
}

export interface AggregatedStats {
  totalSupporters: number;
  goal: number;
  productInterest: Record<string, number>;
  sizeDistribution: Record<string, number>;
  topCities: { city: string; count: number }[];
  genderSplit: { men: number; women: number };
  recentInquiriesTrend: { date: string; count: number }[];
}
