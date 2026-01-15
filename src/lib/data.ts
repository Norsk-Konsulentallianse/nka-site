// src/lib/data.ts
// Server-side data fetching functions

export type Member = {
  company: string;
  type?: string;
  url?: string;
};

export type PressItem = {
  title: string;
  source: string;
  url: string;
  date: string;
  type: "vår_kilde" | "anbefalt";
  excerpt?: string;
};

const BASE_URL = process.env.APP_SCRIPT_URL;
const SECRET = process.env.APP_SCRIPT_SECRET;

export async function getMembers(): Promise<Member[]> {
  if (!BASE_URL || !SECRET) {
    console.error("ENV mangler: APP_SCRIPT_URL/APP_SCRIPT_SECRET");
    return [];
  }

  try {
    const res = await fetch(
      `${BASE_URL}?fn=medlemmer&key=${encodeURIComponent(SECRET)}`,
      { next: { revalidate: 300 } } // 5 minutes
    );

    if (!res.ok) {
      console.error("medlemmer-fetch-status:", res.status);
      return [];
    }

    const json = await res.json();
    const rawMembers = Array.isArray(json?.members) ? json.members : [];

    return rawMembers
      .map((m: Record<string, unknown>) => ({
        company: String(m.name || ""),
        type: m.type ? String(m.type) : undefined,
        url: m.url ? String(m.url) : undefined,
      }))
      .filter((m: Member) => m.company.length > 0)
      .sort((a: Member, b: Member) =>
        a.company.toLowerCase().localeCompare(b.company.toLowerCase())
      );
  } catch (e) {
    console.error("medlemmer-fetch-error:", e);
    return [];
  }
}

export async function getPressItems(): Promise<PressItem[]> {
  if (!BASE_URL || !SECRET) {
    console.error("ENV mangler: APP_SCRIPT_URL/APP_SCRIPT_SECRET");
    return [];
  }

  try {
    const res = await fetch(
      `${BASE_URL}?fn=presseoppslag&key=${encodeURIComponent(SECRET)}`,
      { next: { revalidate: 300 } } // 5 minutes
    );

    if (!res.ok) {
      console.error("presseoppslag-fetch-status:", res.status);
      return [];
    }

    const json = await res.json();
    const rawItems = Array.isArray(json?.presseoppslag) ? json.presseoppslag : [];

    return rawItems
      .map((p: Record<string, unknown>) => ({
        title: String(p.title || ""),
        source: String(p.source || ""),
        url: String(p.url || ""),
        date: String(p.date || ""),
        type: (String(p.type || "anbefalt") as "vår_kilde" | "anbefalt"),
        excerpt: p.excerpt ? String(p.excerpt) : undefined,
      }))
      .filter((p: PressItem) => p.title.length > 0 && p.url.length > 0)
      .sort((a: PressItem, b: PressItem) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  } catch (e) {
    console.error("presseoppslag-fetch-error:", e);
    return [];
  }
}
