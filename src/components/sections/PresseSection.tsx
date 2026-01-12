"use client";

import { useEffect, useMemo, useState } from "react";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";

type PressItem = {
  title: string;
  source: string;
  url: string;
  date: string;
  type: "vår_kilde" | "anbefalt";
  excerpt?: string;
};

type Row = Record<string, unknown>;
type ApiResponse = { presseoppslag?: unknown };

type TabType = "alle" | "vår_kilde" | "anbefalt";

export function PresseSection() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("alle");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/innmelding?fn=presseoppslag", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ApiResponse = (await res.json().catch(() => ({}))) as ApiResponse;
        const normalized = normalizeIncoming(json?.presseoppslag);
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

  const pressItems: PressItem[] = useMemo(() => {
    return rows
      .map((r) => lowerTrimKeys(r))
      .map((o) => ({
        title: strOrEmpty(o["title"]),
        source: strOrEmpty(o["source"]),
        url: strOrEmpty(o["url"]),
        date: strOrEmpty(o["date"]),
        type: (strOrEmpty(o["type"]) as "vår_kilde" | "anbefalt") || "anbefalt",
        excerpt: strOrUndef(o["excerpt"]),
      }))
      .filter((p) => p.title.length > 0 && p.url.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [rows]);

  const filteredItems = useMemo(() => {
    if (activeTab === "alle") return pressItems;
    return pressItems.filter((p) => p.type === activeTab);
  }, [pressItems, activeTab]);

  const tabs: { key: TabType; label: string }[] = [
    { key: "alle", label: "Alle" },
    { key: "vår_kilde", label: "Våre uttalelser" },
    { key: "anbefalt", label: "Anbefalt lesning" },
  ];

  if (loading) {
    return (
      <Section id="presse" theme="white">
        <h2 className="text-3xl font-bold">Presse.</h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Laster presseoppslag…</p>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="presse" theme="white">
        <h2 className="text-3xl font-bold">Presse.</h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-red-700">Kunne ikke laste presseoppslag.</p>
        </div>
      </Section>
    );
  }

  if (pressItems.length === 0) {
    return (
      <Section id="presse" theme="white">
        <h2 className="text-3xl font-bold">Presse.</h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Ingen presseoppslag publisert enda.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="presse" theme="white">
      <h2 className="text-3xl font-bold">Presse.</h2>
      <p className="mt-2 text-gray-600">
        Presseomtale og artikler om konsulentbransjen.
      </p>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Press Items Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, i) => (
          <a
            key={`${item.url}-${i}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-[20px] bg-[#f7f6f5] p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  item.type === "vår_kilde"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.type === "vår_kilde" ? "Vår uttalelse" : "Anbefalt"}
              </span>
              <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
            </div>

            <h3 className="mt-3 font-semibold text-gray-900 group-hover:underline">
              {item.title}
            </h3>

            {item.excerpt && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {item.excerpt}
              </p>
            )}

            <div className="mt-auto pt-4 text-xs text-gray-500">
              <span className="font-medium">{item.source}</span>
              {item.date && (
                <>
                  {" · "}
                  {new Date(item.date).toLocaleDateString("nb-NO", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </>
              )}
            </div>
          </a>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="mt-8 text-center text-gray-500">
          Ingen {activeTab === "vår_kilde" ? "uttalelser" : "anbefalinger"} enda.
        </p>
      )}
    </Section>
  );
}

/* ---------- utils ---------- */

function normalizeIncoming(raw: unknown): Row[] {
  if (!Array.isArray(raw)) return [];
  if (raw.length === 0) return [];
  if (isArrayOfObjects(raw))
    return (raw as Record<string, unknown>[]).map(lowerTrimKeys);
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

function strOrEmpty(v: unknown): string {
  if (typeof v !== "string") return "";
  return v.trim();
}

function strOrUndef(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}
