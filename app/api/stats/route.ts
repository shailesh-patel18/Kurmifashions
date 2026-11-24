import { NextResponse } from "next/server";
import { getAggregatedStats } from "@/lib/db";

export const revalidate = 60; // Cache 60 seconds

export async function GET() {
  try {
    const stats = await getAggregatedStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        totalSupporters: 0,
        goal: 1000,
        productInterest: {},
        sizeDistribution: {},
        topCities: [],
        genderSplit: { men: 0, women: 0 },
        recentInquiriesTrend: [],
      },
      { status: 500 }
    );
  }
}
