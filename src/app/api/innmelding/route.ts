// src/app/api/innmelding/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

/**
 * GET /api/innmelding?fn=medlemmer
 * Proxier til Apps Script for å hente medlemmer.
 */
export async function GET(req: Request) {
  try {
    const urlObj = new URL(req.url);
    const fn = urlObj.searchParams.get("fn");

    if (fn !== "medlemmer") {
      return NextResponse.json({ ok: false, error: "unknown_fn" }, { status: 400 });
    }

    const base = process.env.APP_SCRIPT_URL!;
    const key  = process.env.APP_SCRIPT_SECRET!;
    if (!base || !key) {
      console.error("ENV mangler: APP_SCRIPT_URL/APP_SCRIPT_SECRET");
      return NextResponse.json({ members: [] }, { status: 200 });
    }

    const upstream = await fetch(`${base}?fn=medlemmer&key=${encodeURIComponent(key)}`);
    if (!upstream.ok) {
      console.error("medlemmer-upstream-status:", upstream.status);
      return NextResponse.json({ members: [] }, { status: 200 });
    }

    const json: unknown = await upstream.json().catch(() => ({}));
    const members = Array.isArray((json as { members?: unknown })?.members)
      ? ((json as { members: Record<string, string>[] }).members)
      : [];

    return NextResponse.json({ members });
  } catch (e) {
    console.error("medlemmer-proxy-feil:", e);
    return NextResponse.json({ members: [] }, { status: 200 });
  }
}

/**
 * POST /api/innmelding
 * Tar imot innmelding og proxier til Apps Script.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // må ha navn, e-post og samtykke
    if (!data?.name || !data?.email || data?.consent !== true) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    const url = process.env.APP_SCRIPT_URL!;
    const key = process.env.APP_SCRIPT_SECRET!;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, key }),
    });

    const json = await res.json().catch(() => ({} as { ok?: boolean }));
    if (!res.ok || !json?.ok) {
      console.error("innmelding-upstream-feil:", res.status, json);
      return NextResponse.json({ ok: false, error: "upstream_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("innmelding-proxy-feil:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
