import { NextRequest, NextResponse } from "next/server";
import { getAllInquiriesForAdmin } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const secret = req.nextUrl.searchParams.get("token") || req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET || "kurmi_admin_secret_2026";
  return secret === adminSecret || secret === `Bearer ${adminSecret}`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const inquiries = await getAllInquiriesForAdmin();

  // CSV Headers
  const headers = [
    "Supporter#",
    "Created At",
    "Name",
    "WhatsApp",
    "Email",
    "City",
    "Preferred Contact",
    "Status",
    "Product ID",
    "Size",
    "Quantity",
    "Referral Code",
    "Message",
  ];

  const rows: string[] = [headers.join(",")];

  inquiries.forEach((inq) => {
    inq.items.forEach((item) => {
      const escape = (val: any) => `"${String(val || "").replace(/"/g, '""')}"`;
      rows.push(
        [
          inq.supporterNumber,
          escape(inq.created_at),
          escape(inq.name),
          escape(inq.whatsapp),
          escape(inq.email),
          escape(inq.city),
          escape(inq.preferred_contact),
          escape(inq.status),
          escape(item.productId),
          escape(item.size),
          item.quantity,
          escape(inq.referral_code),
          escape(inq.message),
        ].join(",")
      );
    });
  });

  const csvContent = rows.join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=kurmi-inquiries-${new Date().toISOString().slice(0, 10)}.csv`,
    },
  });
}
