import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

export default function Carousel({ items, className = "" }: CarouselProps) {
  const [page, setPage] = useState(0);
  const totalPages = items.length;

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages]);

  if (items.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <button
          onClick={prev}
          disabled={page === 0}
          className="hidden sm:flex p-2.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 80, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              {items[page]}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          disabled={page >= totalPages - 1}
          className="hidden sm:flex p-2.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`rounded-full transition-all ${
                i === page
                  ? "bg-amber-500 w-8 h-2.5"
                  : "bg-slate-700 hover:bg-slate-500 w-2.5 h-2.5"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
