import { NextRequest, NextResponse } from "next/server";
import { InquiryFormSchema } from "@/lib/validation";
import { insertInquiry, hashIp } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const parsed = InquiryFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Honeypot Spam Check
    if (data.honeypot && data.honeypot.length > 0) {
      // Silently fail for automated spam bots
      return NextResponse.json({ success: true, supporterNumber: 999 }, { status: 200 });
    }

    // 3. IP Hashing (never store raw IP)
    const rawIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const ipHash = hashIp(rawIp);
    const userAgent = req.headers.get("user-agent") || "unknown";

    // 4. Save to Database (Supabase or local persistent store)
    const { inquiry, supporterNumber } = await insertInquiry(data, ipHash, userAgent);

    // 5. Optional Google Sheet Mirroring via Apps Script Webhook
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (sheetWebhook) {
      // Fire-and-forget server-side webhook mirror
      fetch(sheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: inquiry.created_at,
          supporterNumber,
          name: inquiry.name,
          whatsapp: inquiry.whatsapp,
          email: inquiry.email || "",
          city: inquiry.city,
          contactPreference: inquiry.preferred_contact,
          notes: inquiry.message || "",
          items: inquiry.items
            .map((i) => `${i.productId} (${i.size} x ${i.quantity})`)
            .join("; "),
          referralCode: inquiry.referral_code,
        }),
      }).catch((e) => console.error("Sheet mirror failed:", e));
    }

    return NextResponse.json({
      success: true,
      supporterNumber,
      referralCode: inquiry.referral_code,
      id: inquiry.id,
    });
  } catch (error: any) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { error: "Could not register inquiry. Please retry in a few moments." },
      { status: 500 }
    );
  }
}
