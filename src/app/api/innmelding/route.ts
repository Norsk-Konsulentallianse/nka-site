// src/app/api/innmelding/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

/**
 * GET /api/innmelding?fn=medlemmer|presseoppslag
 * Proxier til Apps Script for å hente data.
 */
export async function GET(req: Request) {
  try {
    const urlObj = new URL(req.url);
    const fn = urlObj.searchParams.get("fn");

    const base = process.env.APP_SCRIPT_URL!;
    const key  = process.env.APP_SCRIPT_SECRET!;
    if (!base || !key) {
      console.error("ENV mangler: APP_SCRIPT_URL/APP_SCRIPT_SECRET");
      if (fn === "medlemmer") return NextResponse.json({ members: [] }, { status: 200 });
      if (fn === "presseoppslag") return NextResponse.json({ presseoppslag: [] }, { status: 200 });
      return NextResponse.json({ ok: false, error: "unknown_fn" }, { status: 400 });
    }

    // Håndter medlemmer
    if (fn === "medlemmer") {
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
    }

    // Håndter presseoppslag
    if (fn === "presseoppslag") {
      const upstreamUrl = `${base}?fn=presseoppslag&key=${encodeURIComponent(key)}`;
      console.log("[presseoppslag] Fetching from Apps Script...");

      const upstream = await fetch(upstreamUrl);
      console.log("[presseoppslag] Upstream status:", upstream.status);

      if (!upstream.ok) {
        console.error("[presseoppslag] Upstream failed:", upstream.status);
        return NextResponse.json({ presseoppslag: [] }, { status: 200 });
      }

      const rawText = await upstream.text();
      console.log("[presseoppslag] Raw response:", rawText.substring(0, 500));

      let json: unknown;
      try {
        json = JSON.parse(rawText);
      } catch {
        console.error("[presseoppslag] JSON parse failed");
        return NextResponse.json({ presseoppslag: [] }, { status: 200 });
      }

      console.log("[presseoppslag] Parsed JSON keys:", Object.keys(json as object));

      const presseoppslag = Array.isArray((json as { presseoppslag?: unknown })?.presseoppslag)
        ? ((json as { presseoppslag: Record<string, string>[] }).presseoppslag)
        : [];

      console.log("[presseoppslag] Returning", presseoppslag.length, "items");
      return NextResponse.json({ presseoppslag });
    }

    return NextResponse.json({ ok: false, error: "unknown_fn" }, { status: 400 });
  } catch (e) {
    console.error("proxy-feil:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
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
