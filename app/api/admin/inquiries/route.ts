import { NextRequest, NextResponse } from "next/server";
import { getAllInquiriesForAdmin, updateInquiryStatus } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET || "kurmi_admin_secret_2026";
  if (!authHeader) return false;
  return authHeader === `Bearer ${adminSecret}` || authHeader === adminSecret;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inqs = await getAllInquiriesForAdmin();
  return NextResponse.json(inqs);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  await updateInquiryStatus(id, status);
  return NextResponse.json({ success: true });
}
