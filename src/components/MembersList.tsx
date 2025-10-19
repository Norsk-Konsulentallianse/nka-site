// src/components/MembersList.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type Row = Record<string, unknown>;
type Member = {
  timestamp?: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  notes?: string;
  consent?: boolean;
  verified?: boolean;
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
        const res = await fetch("/api/innmelding?fn=medlemmer", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = (await res.json().catch(() => ({}))) as ApiResponse;

        const raw = json?.members;
        const normalizedRows = normalizeIncoming(raw);

        if (!cancelled) {
          setRows(normalizedRows);
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

  // map til Member og normaliser booleans + trim
  const members: Member[] = useMemo(() => {
    return rows.map((r) => {
      const obj = lowerTrimKeys(r);
      return {
        timestamp: strOrUndef(obj["timestamp"]),
        name: strOrUndef(obj["name"]),
        email: strOrUndef(obj["email"]),
        company: strOrUndef(obj["company"]),
        role: strOrUndef(obj["role"]),
        notes: strOrUndef(obj["notes"]),
        consent: toBool(obj["consent"]),
        verified: toBool(obj["verified"]),
      };
    });
  }, [rows]);

  const totals = useMemo(() => {
    const total = members.length;
    const consented = members.filter((m) => m.consent === true).length;
    const verified = members.filter((m) => m.consent === true && m.verified === true).length;
    return { total, consented, verified };
  }, [members]);

  const visible = useMemo(() => {
    return members
      .filter((m) => m.consent === true && m.verified === true)
      .sort((a, b) => {
        const ac = (a.company ?? "").toLowerCase();
        const bc = (b.company ?? "").toLowerCase();
        if (ac && bc && ac !== bc) return ac.localeCompare(bc);
        if (!ac && bc) return 1;
        if (ac && !bc) return -1;
        const an = (a.name ?? "").toLowerCase();
        const bn = (b.name ?? "").toLowerCase();
        return an.localeCompare(bn);
      });
  }, [members]);

  if (loading) return <p>Laster…</p>;
  if (error) return <p className="text-red-700">Feil: {error}</p>;

  return (
    <>
      {/* Diagnostikk uten persondata */}
      <p className="mb-2 text-xs text-gray-600">
        Total: {totals.total} · Med samtykke: {totals.consented} · Verifisert: {totals.verified}
      </p>

      {visible.length === 0 ? (
        <div className="rounded border bg-white p-3 text-sm text-gray-700">
          Ingen bekreftede medlemmer er publisert enda.
          <div className="mt-2 rounded bg-gray-50 p-2 text-xs text-gray-600">
            <strong>Diagnostikk</strong> (maskert): Vi mottok {members.length} rad(er). Nøkler oppdaget:&nbsp;
            {listAllKeys(rows).join(", ") || "ingen"}
            <div className="mt-1">
              Eksempel 1:&nbsp;
              <code className="break-words">{maskRow(rows[0])}</code>
            </div>
            {rows[1] ? (
              <div className="mt-1">
                Eksempel 2:&nbsp;
                <code className="break-words">{maskRow(rows[1])}</code>
              </div>
            ) : null}
            <div className="mt-1">
              Tips: sett <code>verified</code> = TRUE og <code>consent</code> = TRUE i datakilden (Apps Script/ark).
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-3 py-2 text-left">Selskap</th>
                <th className="border px-3 py-2 text-left">Kontaktperson</th>
                <th className="border px-3 py-2 text-left">Rolle</th>
                <th className="border px-3 py-2 text-left">Merknad</th>
                <th className="border px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((m, i) => (
                <tr key={`${m.company ?? ""}-${m.name ?? ""}-${i}`}>
                  <td className="border px-3 py-2 font-medium">{m.company ?? "–"}</td>
                  <td className="border px-3 py-2">{m.name ?? "–"}</td>
                  <td className="border px-3 py-2">{m.role ?? "–"}</td>
                  <td className="border px-3 py-2 text-gray-700">{m.notes ?? ""}</td>
                  <td className="border px-3 py-2 text-green-700 font-semibold">✅ Bekreftet</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ---------- normalisering & hjelpefunksjoner ---------- */

// Tar høyde for to formater fra API:
// 1) array av objekter (key: value)
// 2) array av arrays, der første rad er headere
function normalizeIncoming(raw: unknown): Row[] {
  if (!Array.isArray(raw)) return [];
  if (raw.length === 0) return [];

  // kasus: array av objekter
  if (isArrayOfObjects(raw)) {
    return (raw as Record<string, unknown>[]).map(lowerTrimKeys);
  }

  // kasus: array av arrays [headers, ...rows]
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

  // ukjent format → prøv å stringify og gi tom liste
  return [];
}

function isArrayOfObjects(a: unknown[]): boolean {
  return a.every((x) => !!x && typeof x === "object" && !Array.isArray(x));
}
function isArrayOfArrays(a: unknown[]): boolean {
  return a.every((x) => Array.isArray(x));
}

// lower+trim keys
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

// Tåler TRUE/FALSE, 1/0, JA/NEI, YES/NO, Y/N, X, ✓, PAID/BETALT
function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true", "1", "ja", "yes", "y", "x", "✓", "paid", "betalt"].includes(s)) return true;
    if (["false", "0", "nei", "no", "n"].includes(s)) return false;
  }
  return false;
}

// Samle alle nøkler vi har sett, til diagnostikk
function listAllKeys(rs: Row[]): string[] {
  const keys = new Set<string>();
  rs.forEach((r) => Object.keys(r ?? {}).forEach((k) => keys.add(k)));
  return [...keys].sort();
}

// Masker e-post og korter verdier for trygg visning
function maskRow(r?: Row): string {
  if (!r) return "{}";
  const safe: Record<string, unknown> = {};
  Object.entries(r).forEach(([k, v]) => {
    if (k.toLowerCase().includes("email") && typeof v === "string") {
      const at = v.indexOf("@");
      if (at > 1) {
        const masked = v.slice(0, Math.min(2, at)) + "…" + v.slice(at - 1);
        safe[k] = masked;
      } else {
        safe[k] = "…@…";
      }
    } else {
      safe[k] = v;
    }
  });
  return JSON.stringify(safe);
}
