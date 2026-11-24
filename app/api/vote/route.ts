import { NextRequest, NextResponse } from "next/server";
import { VoteFormSchema } from "@/lib/validation";
import { insertVote } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VoteFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid vote payload" }, { status: 400 });
    }

    const { candidateId, deviceHash } = parsed.data;

    // Check signed cookie if already voted
    const votedCookie = req.cookies.get(`voted_${candidateId}`);
    if (votedCookie) {
      return NextResponse.json({ error: "Already voted for this species on this device" }, { status: 429 });
    }

    const success = await insertVote(candidateId, deviceHash);
    if (!success) {
      return NextResponse.json({ error: "Vote already registered" }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });
    // Set 1-year vote anti-abuse cookie
    res.cookies.set(`voted_${candidateId}`, "1", {
      maxAge: 31536000,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return res;
  } catch (e) {
    return NextResponse.json({ error: "Could not record vote" }, { status: 500 });
  }
}
