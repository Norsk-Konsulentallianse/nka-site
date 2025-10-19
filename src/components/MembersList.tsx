// src/components/MembersList.tsx
"use client";

import { useEffect, useState } from "react";

type Member = Record<string, string>;

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
        const json: unknown = await res.json();
        const arr = Array.isArray((json as { members?: unknown })?.members)
          ? ((json as { members: Member[] }).members)
          : [];
        if (!cancelled) {
          setMembers(arr);
          setLoading(false);
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) {
          setError(message);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p>Laster…</p>;
  if (error) return <p className="text-red-700">Feil: {error}</p>;
  if (members.length === 0) return <p>Ingen registrerte medlemmer enda.</p>;

  const nameKeys = ["Navn", "Name", "Selskap", "Company", "Bedrift"];
  const urlKeys = ["Nettsted", "Website", "URL", "Link", "Hjemmeside"];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {members.map((m, i) => {
        const name = pickFirst(m, nameKeys) ?? `Medlem #${i + 1}`;
        const site = normalizeUrl(pickFirst(m, urlKeys));
        return (
          <li key={i} className="rounded-lg border p-3">
            <div className="font-medium">{name}</div>
            {site ? (
              <a
                href={site}
                className="text-sm text-blue-700 hover:underline break-all"
                target="_blank"
                rel="noreferrer"
              >
                {site}
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function pickFirst(obj: Record<string, string>, keys: string[]) {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return null;
}

function normalizeUrl(url: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}
