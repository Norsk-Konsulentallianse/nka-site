import { NextResponse } from "next/server";

export async function GET() {
  // erstatt med Google Sheets senere
  const members = [
    { name: "JProfessionals AS", type: "Selskap", url: "https://jpro.no" },
    { name: "Blank AS", type: "Selskap", url: "https://blank.no" },
    { name: "Compute AS", type: "Selskap" },
    { name: "KodeKari (ENK)", type: "Selvstendig" },
    { name: "DevOla (ENK)", type: "Selvstendig" },
  ];
  return NextResponse.json({ members });
}
