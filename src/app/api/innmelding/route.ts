import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // TODO: valider feltene
    console.log("Ny innmelding:", data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Feil i innmelding:", e);
    return NextResponse.json({ ok: false, error: "Bad payload" }, { status: 400 });
  }
}
