import { NextResponse } from "next/server";
export const runtime = "nodejs";

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

    const json = await res.json().catch(() => ({}));
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
