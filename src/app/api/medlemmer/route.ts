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
    const res  = await fetch(`${base}?fn=medlemmer&key=${encodeURIComponent(key)}`);
    const json = await res.json().catch(() => ({}));
    const members = Array.isArray(json.members) ? json.members : [];
    return NextResponse.json({ members });
  } catch (e) {
    console.error("medlemmer-proxy-feil:", e);
    return NextResponse.json({ members: [] }, { status: 200 });
  }
}
