import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { motion } from "motion/react";

interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

export default function Carousel({ items, className = "" }: CarouselProps) {
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const totalPages = items.length;

  const extended = [...items, ...items, ...items];
  const centerSet = totalPages;

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    return el.clientWidth * 0.8 + 16;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.8 + 16;
    el.scrollLeft = centerSet * cardWidth;
  }, [centerSet]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || totalPages === 0) return;
    const cardWidth = el.clientWidth * 0.8 + 16;
    const current = el.scrollLeft;
    const boundary = totalPages * cardWidth;

    if (current < boundary * 0.5) {
      el.scrollLeft = current + boundary;
    } else if (current > boundary * 2.5) {
      el.scrollLeft = current - boundary;
    }

    const raw = Math.round((current + (el.clientWidth - el.clientWidth * 0.8) / 2) / cardWidth);
    setPage(((raw % totalPages) + totalPages) % totalPages);
  }, [totalPages]);

  const goTo = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.8 + 16;
    el.scrollTo({ left: (centerSet + i) * cardWidth, behavior: "smooth" });
    setPage(i);
  }, [centerSet]);

  if (items.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Mobile: carousel with snap, peek, and slide */}
      <div className="md:hidden -mx-4 px-4">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {extended.map((child, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0"
              style={{ width: "80%" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="min-h-[300px] h-full"
              >
                {child}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${
                i === page
                  ? "bg-amber-500 w-8 h-2.5"
                  : "bg-slate-700 hover:bg-slate-500 w-2.5 h-2.5"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((child, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="h-full"
          >
            {child}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
