"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Row = Record<string, unknown>;

type Member = {
  company: string;
  type?: string;
  url?: string;
};

type ApiResponse = { members?: unknown };

export function MembersCarousel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/innmelding?fn=medlemmer", {
          cache: "no-store",
        });
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

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const members: Member[] = useMemo(() => {
    return rows
      .map((r) => lowerTrimKeys(r))
      .map((o) => ({
        company: strOrUndef(o["name"]) ?? "",
        type: strOrUndef(o["type"]),
        url: strOrUndef(o["url"]),
      }))
      .filter((m) => m.company.length > 0)
      .sort((a, b) =>
        a.company.toLowerCase().localeCompare(b.company.toLowerCase())
      );
  }, [rows]);

  const maxIndex = Math.max(0, members.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Laster medlemmer…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-700">Feil: {error}</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Ingen medlemmer publisert enda.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      {members.length > itemsPerView && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50"
            aria-label="Forrige"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 translate-x-4 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50"
            aria-label="Neste"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Carousel Track */}
      <div className="overflow-hidden px-2">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${currentIndex * (100 / itemsPerView + 2)}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {members.map((member, i) => (
            <div
              key={`${member.company}-${i}`}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - 1.5rem)` }}
            >
              <div className="flex h-48 flex-col items-center justify-center rounded-[20px] bg-[#f7f6f5] p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.company}
                </h3>
                {member.type && (
                  <p className="mt-1 text-sm text-gray-600">{member.type}</p>
                )}
                {member.url && (
                  <Button asChild variant="pill-dark" size="sm" className="mt-4">
                    <a
                      href={normalizeUrl(member.url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Nettsted
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation Arrows (for mobile) */}
      {members.length > itemsPerView && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
            aria-label="Forrige"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {maxIndex + 1}
          </span>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
            aria-label="Neste"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
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

function strOrUndef(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function normalizeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
