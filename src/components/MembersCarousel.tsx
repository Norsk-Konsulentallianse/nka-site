"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Member } from "@/lib/data";

interface MembersCarouselProps {
  members: Member[];
}

export function MembersCarousel({ members }: MembersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  const maxIndex = Math.max(0, members.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * (100 / itemsPerView)}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {members.map((member, i) => (
            <div
              key={`${member.company}-${i}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
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

function normalizeUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
