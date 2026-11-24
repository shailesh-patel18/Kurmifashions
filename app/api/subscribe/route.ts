import { NextRequest, NextResponse } from "next/server";
import { SubscribeFormSchema } from "@/lib/validation";
import { insertSubscriber } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SubscribeFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    await insertSubscriber(parsed.data.email);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
  }
}
