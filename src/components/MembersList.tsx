"use client";

import { useEffect, useMemo, useState } from "react";

type Member = {
  timestamp?: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  notes?: string;
  consent?: boolean | string | number;
  verified?: boolean | string | number;
};

type ApiResponse = { members?: unknown };

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/innmelding?fn=medlemmer", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = (await res.json().catch(() => ({}))) as ApiResponse;
        const arr = Array.isArray(json?.members) ? (json.members as Member[]) : [];

        // normaliser felt
        const norm: Member[] = arr.map((m) => ({
          ...m,
          consent: normalizeBool(m?.consent),
          verified: normalizeBool(m?.verified),
          name: trimOrUndefined(m?.name),
          email: trimOrUndefined(m?.email),
          company: trimOrUndefined(m?.company),
          role: trimOrUndefined(m?.role),
          notes: trimOrUndefined(m?.notes),
          timestamp: trimOrUndefined(m?.timestamp),
        }));

        if (!cancelled) {
          setMembers(norm);
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

  // vis kun de med consent==true og verified==true
  const visible = useMemo(() => {
    return members
      .filter((m) => m.consent === true && m.verified === true)
      .sort((a, b) => {
        const ac = a.company?.toLowerCase() ?? "";
        const bc = b.company?.toLowerCase() ?? "";
        if (ac && bc && ac !== bc) return ac.localeCompare(bc);
        if (!ac && bc) return 1;
        if (ac && !bc) return -1;

        const an = a.name?.toLowerCase() ?? "";
        const bn = b.name?.toLowerCase() ?? "";
        return an.localeCompare(bn);
      });
  }, [members]);

  if (loading) return <p>Laster…</p>;
  if (error) return <p className="text-red-700">Feil: {error}</p>;
  if (visible.length === 0)
    return <p>Ingen bekreftede medlemmer er publisert enda.</p>;

  return (
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
              <td className="border px-3 py-2 text-green-700 font-semibold">
                ✅ Bekreftet
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- hjelpere ---------- */

function normalizeBool(v: boolean | string | number | undefined): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "ja" || s === "yes";
  }
  return false;
}

function trimOrUndefined(s: unknown): string | undefined {
  if (typeof s !== "string") return undefined;
  const t = s.trim();
  return t.length ? t : undefined;
}
