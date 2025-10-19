// src/components/MembersList.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Row = Record<string, unknown>;

type Member = {
  company: string;  // mappes fra name
  type?: string;
  url?: string;
};

type ApiResponse = { members?: unknown };

export default function MembersList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Leser publiserte medlemmer fra Next-proxy (Apps Script -> "Medlemmer"-fanen)
        const res = await fetch("/api/innmelding?fn=medlemmer", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = (await res.json().catch(() => ({}))) as ApiResponse;
        const normalized = normalizeIncoming(json?.members);
        if (!cancelled) {
          setRows(normalized);
          setLoading(false);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!cancelled) {
          setError(msg);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const members: Member[] = useMemo(() => {
    // Map fra { name, type, url } => Member
    return rows
      .map((r) => lowerTrimKeys(r))
      .map((o) => ({
        company: strOrUndef(o["name"]) ?? "",
        type: strOrUndef(o["type"]),
        url: strOrUndef(o["url"]),
      }))
      .filter((m) => m.company.length > 0);
  }, [rows]);

  // Sorter alfabetisk på selskap
  const sorted = useMemo(
    () =>
      members.sort((a, b) => a.company.toLowerCase().localeCompare(b.company.toLowerCase())),
    [members]
  );

  if (loading) return <p>Laster…</p>;
  if (error) return <p className="text-red-700">Feil: {error}</p>;
  if (sorted.length === 0) return <p>Ingen medlemmer publisert enda.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-3 py-2 text-left">Selskap</th>
            <th className="border px-3 py-2 text-left">Type</th>
            <th className="border px-3 py-2 text-left">Nettsted</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m, i) => (
            <tr key={`${m.company}-${i}`}>
              <td className="border px-3 py-2 font-medium">{m.company}</td>
              <td className="border px-3 py-2">{m.type ?? "–"}</td>
              <td className="border px-3 py-2">
                {m.url ? (
                  <a
                    href={normalizeUrl(m.url)}
                    className="text-blue-700 hover:underline break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {normalizeUrl(m.url)}
                  </a>
                ) : (
                  "–"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- utils ---------- */

// Støtter to formater: array av objekter ELLER [headers, ...rows]
function normalizeIncoming(raw: unknown): Row[] {
  if (!Array.isArray(raw)) return [];
  if (raw.length === 0) return [];
  if (isArrayOfObjects(raw)) return (raw as Record<string, unknown>[]).map(lowerTrimKeys);
  if (isArrayOfArrays(raw)) {
    const rows = raw as unknown[][];
    if (rows.length < 2) return [];
    const headerRaw = rows[0] ?? [];
    const headers = (headerRaw as unknown[])
      .map((h) => (typeof h === "string" ? h : String(h ?? "")))
      .map((h) => h.toLowerCase().trim());
    return rows.slice(1).map((vals) => {
      const rec: Row = {};
      headers.forEach((h, i) => {
        rec[h] = (vals as unknown[])[i];
      });
      return rec;
    });
  }
  return [];
}

function isArrayOfObjects(a: unknown[]): boolean {
  return a.every((x) => !!x && typeof x === "object" && !Array.isArray(x));
}
function isArrayOfArrays(a: unknown[]): boolean {
  return a.every((x) => Array.isArray(x));
}

function lowerTrimKeys(o: Row): Row {
  const out: Row = {};
  Object.keys(o ?? {}).forEach((k) => {
    const nk = k.toLowerCase().trim();
    const value = (o as Record<string, unknown>)[k];
    out[nk] = value;
  });
  return out;
}

function strOrUndef(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function normalizeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
