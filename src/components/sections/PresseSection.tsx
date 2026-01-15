"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import type { PressItem } from "@/lib/data";

type TabType = "alle" | "vår_kilde" | "anbefalt";

interface PresseSectionProps {
  items: PressItem[];
}

export function PresseSection({ items }: PresseSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("alle");

  const filteredItems = useMemo(() => {
    if (activeTab === "alle") return items;
    return items.filter((p) => p.type === activeTab);
  }, [items, activeTab]);

  const tabs: { key: TabType; label: string }[] = [
    { key: "alle", label: "Alle" },
    { key: "vår_kilde", label: "Våre uttalelser" },
    { key: "anbefalt", label: "Anbefalt lesning" },
  ];

  if (items.length === 0) {
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
