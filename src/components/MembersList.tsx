// src/components/MembersList.tsx
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

        // Normaliser samtykke til boolean
        const norm: Member[] = arr.map((m) => ({
          ...m,
          consent: normalizeConsent(m?.consent),
          // trim strings defensivt
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

  const visible = useMemo(() => {
    // vis kun med samtykke
    const consented = members.filter((m) => m.consent === true);

    // sortér: company (asc, tomme sist), deretter name (asc)
    return consented.sort((a, b) => {
      const ac = a.company?.toLowerCase() ?? "";
      const bc = b.company?.toLowerCase() ?? "";
      if (ac && bc && ac !== bc) return ac.localeCompare(bc);
      if (!ac && bc) return 1; // tom company nederst
      if (ac && !bc) return -1;

      const an = a.name?.toLowerCase() ?? "";
      const bn = b.name?.toLowerCase() ?? "";
      if (an && bn) return an.localeCompare(bn);
      if (!an && bn) return 1;
      if (an && !bn) return -1;
      return 0;
    });
  }, [members]);

  if (loading) return <p>Laster…</p>;
  if (error) return <p className="text-red-700">Feil: {error}</p>;
  if (visible.length === 0) return <p>Ingen registrerte medlemmer enda.</p>;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {visible.map((m, i) => {
        const title = m.company || m.name || `Medlem #${i + 1}`;
        const secondary = m.company && m.name ? m.name : undefined;
        const role = m.role;
        const notes = m.notes;
        // For å VISE e-post offentlig (ikke anbefalt som default), fjern kommentaren under:
        // const email = m.email;

        return (
          <li key={`${m.company ?? ""}-${m.name ?? ""}-${i}`} className="rounded-lg border p-3">
            <div className="font-medium">{title}</div>
            {secondary && <div className="text-sm text-gray-800">{secondary}</div>}
            {role && <div className="text-sm italic text-gray-700">{role}</div>}
            {/* {email && (
              <a
                href={`mailto:${email}`}
                className="text-sm text-blue-700 hover:underline break-all"
              >
                {email}
              </a>
            )} */}
            {notes && <div className="mt-1 text-xs text-gray-600 break-words">{notes}</div>}
          </li>
        );
      })}
    </ul>
  );
}

/* -------- helpers -------- */

function normalizeConsent(v: Member["consent"]): boolean {
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
