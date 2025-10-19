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
  const [raw, setRaw] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/innmelding?fn=medlemmer", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = (await res.json().catch(() => ({}))) as ApiResponse;

        const arr = Array.isArray(json?.members) ? (json.members as Row[]) : [];
        const normalized = arr.map(normalizeKeysLowerTrim);
        if (!cancelled) {
          setRaw(normalized);
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

  // Konverter til Member + normaliser boolsk felt
  const members: Member[] = useMemo(() => {
    return raw.map((r) => {
      const m: Member = {
        timestamp: strOrUndef(r["timestamp"]),
        name: strOrUndef(r["name"]),
        email: strOrUndef(r["email"]),
        company: strOrUndef(r["company"]),
        role: strOrUndef(r["role"]),
        notes: strOrUndef(r["notes"]),
        consent: toBool(r["consent"]),
        verified: toBool(r["verified"]),
      };
      return m;
    });
  }, [raw]);

  const totals = useMemo(() => {
    const total = members.length;
    const consented = members.filter((m) => m.consent === true).length;
    const verified = members.filter((m) => m.consent === true && m.verified === true).length;
    return { total, consented, verified };
  }, [members]);

  // vis kun de med consent==true og verified==true
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
      {/* Diagnostikk uten å vise persondata */}
      <p className="mb-2 text-xs text-gray-600">
        Total: {totals.total} · Med samtykke: {totals.consented} · Verifisert: {totals.verified}
      </p>

      {visible.length === 0 ? (
        <div className="rounded border bg-white p-3 text-sm text-gray-700">
          Ingen bekreftede medlemmer er publisert enda.
          <div className="mt-1 text-xs text-gray-600">
            Tips: sett kolonnen <code>verified</code> = TRUE i regnearket for rader som skal publiseres.
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

/* ---------- hjelpere ---------- */

// Normaliserer alle nøkler (lowercase + trim), slik at "Verified ", "VERIFIED" etc. blir "verified"
function normalizeKeysLowerTrim(o: Row): Row {
  const out: Row = {};
  Object.keys(o ?? {}).forEach((k) => {
    const nk = k.toLowerCase().trim();
    const value = (o as Record<string, unknown>)[k]; // <- ikke 'any'
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
    if (s === "true" || s === "1" || s === "ja" || s === "yes" || s === "y" || s === "x" || s === "✓") return true;
    if (s === "paid" || s === "betalt") return true;
    if (s === "false" || s === "0" || s === "nei" || s === "no" || s === "n") return false;
  }
  return false;
}
