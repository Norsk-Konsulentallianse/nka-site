// src/app/api/innmelding/medlemmer/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  try {
    const base = process.env.APP_SCRIPT_URL!;
    const key  = process.env.APP_SCRIPT_SECRET!;
    if (!base || !key) {
      console.error("ENV mangler: APP_SCRIPT_URL/APP_SCRIPT_SECRET");
      return NextResponse.json({ members: [] }, { status: 200 });
    }

    const res = await fetch(`${base}?fn=medlemmer&key=${encodeURIComponent(key)}`);
    if (!res.ok) {
      console.error("medlemmer-upstream-status:", res.status);
      return NextResponse.json({ members: [] }, { status: 200 });
    }

    const json = (await res.json().catch(() => ({}))) as unknown;
    const members = Array.isArray((json as { members?: unknown })?.members)
      ? ((json as { members: Record<string, string>[] }).members)
      : [];

    return NextResponse.json({ members });
  } catch (e) {
    console.error("medlemmer-proxy-feil:", e);
    return NextResponse.json({ members: [] }, { status: 200 });
  }
}
