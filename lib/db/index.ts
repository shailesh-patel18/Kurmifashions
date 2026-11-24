import fs from "fs";
import path from "path";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { InquiryFormValues, InquiryRecord, AggregatedStats } from "../types";

// Check if real Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// Local persistent file store fallback
const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

interface LocalDbSchema {
  inquiries: InquiryRecord[];
  subscribers: { id: string; email: string; created_at: string; consent_at: string }[];
  votes: { id: string; candidate_id: string; device_hash: string; created_at: string }[];
}

function getLocalDb(): LocalDbSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial: LocalDbSchema = {
      inquiries: [],
      subscribers: [],
      votes: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { inquiries: [], subscribers: [], votes: [] };
  }
}

function saveLocalDb(data: LocalDbSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip + (process.env.HASH_SALT || "kurmi_salt_2026")).digest("hex");
}

export async function insertInquiry(
  form: InquiryFormValues,
  ipHash: string,
  userAgent: string
): Promise<{ inquiry: InquiryRecord; supporterNumber: number }> {
  const referralCode = `KURMI-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const now = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    // 1. Insert into Supabase
    const { data: inquiryData, error: inqErr } = await supabase
      .from("inquiries")
      .insert({
        name: form.name,
        whatsapp: form.whatsapp,
        email: form.email || null,
        city: form.city,
        preferred_contact: form.preferredContact,
        message: form.message || null,
        consent_at: now,
        consent_text_version: form.consentVersion,
        referral_code: referralCode,
        referred_by: form.referredBy || null,
        status: "new",
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select("id")
      .single();

    if (inqErr) throw inqErr;

    // 2. Insert inquiry items
    const itemsToInsert = form.items.map((i) => ({
      inquiry_id: inquiryData.id,
      product_id: i.productId,
      size: i.size,
      quantity: i.quantity,
    }));
    await supabase.from("inquiry_items").insert(itemsToInsert);

    // 3. Count total inquiries
    const { count } = await supabase.from("inquiries").select("*", { count: "exact", head: true });
    const supporterNumber = count || 1;

    const record: InquiryRecord = {
      id: inquiryData.id,
      created_at: now,
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      city: form.city,
      preferred_contact: form.preferredContact,
      message: form.message,
      consent_at: now,
      consent_text_version: form.consentVersion,
      referral_code: referralCode,
      referred_by: form.referredBy,
      status: "new",
      items: form.items,
      supporterNumber,
    };

    return { inquiry: record, supporterNumber };
  }

  // Fallback to local persistent store
  const db = getLocalDb();
  const supporterNumber = db.inquiries.length + 1;

  const newRecord: InquiryRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: now,
    name: form.name,
    whatsapp: form.whatsapp,
    email: form.email,
    city: form.city,
    preferred_contact: form.preferredContact,
    message: form.message,
    consent_at: now,
    consent_text_version: form.consentVersion,
    referral_code: referralCode,
    referred_by: form.referredBy,
    status: "new",
    items: form.items,
    supporterNumber,
  };

  db.inquiries.unshift(newRecord);
  saveLocalDb(db);

  return { inquiry: newRecord, supporterNumber };
}

export async function insertSubscriber(email: string): Promise<void> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    await supabase.from("subscribers").insert({ email, created_at: now, consent_at: now });
    return;
  }
  const db = getLocalDb();
  if (!db.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    db.subscribers.push({
      id: `sub_${Date.now()}`,
      email,
      created_at: now,
      consent_at: now,
    });
    saveLocalDb(db);
  }
}

export async function insertVote(candidateId: string, deviceHash: string): Promise<boolean> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("votes").insert({
      candidate_id: candidateId,
      device_hash: deviceHash,
      created_at: now,
    });
    return !error;
  }
  const db = getLocalDb();
  const alreadyVoted = db.votes.some(
    (v) => v.candidate_id === candidateId && v.device_hash === deviceHash
  );
  if (alreadyVoted) return false;

  db.votes.push({
    id: `vote_${Date.now()}`,
    candidate_id: candidateId,
    device_hash: deviceHash,
    created_at: now,
  });
  saveLocalDb(db);
  return true;
}

export async function getAggregatedStats(): Promise<AggregatedStats> {
  if (isSupabaseConfigured && supabase) {
    const { count } = await supabase.from("inquiries").select("*", { count: "exact", head: true });
    const { data: items } = await supabase.from("inquiry_items").select("product_id, size, quantity");
    const { data: inquiries } = await supabase.from("inquiries").select("city, created_at");

    const productInterest: Record<string, number> = {};
    const sizeDistribution: Record<string, number> = {};
    let menCount = 0;
    let womenCount = 0;

    (items || []).forEach((it: any) => {
      productInterest[it.product_id] = (productInterest[it.product_id] || 0) + (it.quantity || 1);
      sizeDistribution[it.size] = (sizeDistribution[it.size] || 0) + (it.quantity || 1);
      if (it.product_id.includes("whale") || it.product_id.includes("moth")) {
        menCount += it.quantity;
      } else {
        womenCount += it.quantity;
      }
    });

    const cityMap: Record<string, number> = {};
    (inquiries || []).forEach((inq: any) => {
      const c = inq.city?.trim();
      if (c) cityMap[c] = (cityMap[c] || 0) + 1;
    });

    const topCities = Object.entries(cityMap)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalSupporters: count || 0,
      goal: 1000,
      productInterest,
      sizeDistribution,
      topCities,
      genderSplit: { men: menCount, women: womenCount },
      recentInquiriesTrend: [],
    };
  }

  // Local fallback
  const db = getLocalDb();
  const productInterest: Record<string, number> = {
    "fox-in-the-pines": 0,
    "night-owl": 0,
    "humpback-drift": 0,
    "mountain-hare": 0,
    "midnight-moth": 0,
    "tiger-lily": 0,
  };
  const sizeDistribution: Record<string, number> = {};
  const cityMap: Record<string, number> = {};
  let menCount = 0;
  let womenCount = 0;

  db.inquiries.forEach((inq) => {
    const c = inq.city?.trim();
    if (c) cityMap[c] = (cityMap[c] || 0) + 1;

    inq.items.forEach((item) => {
      productInterest[item.productId] = (productInterest[item.productId] || 0) + item.quantity;
      sizeDistribution[item.size] = (sizeDistribution[item.size] || 0) + item.quantity;
      if (item.productId.includes("whale") || item.productId.includes("fox")) {
        menCount += item.quantity;
      } else {
        womenCount += item.quantity;
      }
    });
  });

  const topCities = Object.entries(cityMap)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalSupporters: db.inquiries.length,
    goal: 1000,
    productInterest,
    sizeDistribution,
    topCities,
    genderSplit: { men: menCount, women: womenCount },
    recentInquiriesTrend: [
      { date: "Day 1", count: 12 },
      { date: "Day 2", count: 28 },
      { date: "Day 3", count: 45 },
      { date: "Day 4", count: db.inquiries.length },
    ],
  };
}

export async function getAllInquiriesForAdmin(): Promise<InquiryRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data: inqs } = await supabase
      .from("inquiries")
      .select("*, inquiry_items(*)")
      .order("created_at", { ascending: false });

    return (inqs || []).map((row: any, idx: number) => ({
      id: row.id,
      created_at: row.created_at,
      name: row.name,
      whatsapp: row.whatsapp,
      email: row.email,
      city: row.city,
      preferred_contact: row.preferred_contact,
      message: row.message,
      consent_at: row.consent_at,
      consent_text_version: row.consent_text_version,
      referral_code: row.referral_code,
      referred_by: row.referred_by,
      status: row.status,
      items: (row.inquiry_items || []).map((i: any) => ({
        productId: i.product_id,
        size: i.size,
        quantity: i.quantity,
      })),
      supporterNumber: (inqs?.length || 0) - idx,
    }));
  }

  const db = getLocalDb();
  return db.inquiries;
}

export async function updateInquiryStatus(
  id: string,
  status: "new" | "contacted" | "converted"
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    return;
  }
  const db = getLocalDb();
  const inq = db.inquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    saveLocalDb(db);
  }
}
