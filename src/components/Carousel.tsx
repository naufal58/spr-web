import { type ReactNode } from "react";
import { motion } from "motion/react";

interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

export default function Carousel({ items, className = "" }: CarouselProps) {
  if (items.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Mobile: carousel horizontal with snap + peek */}
      <div className="md:hidden -mx-4 px-4">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[80%]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                {child}
              </motion.div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <a
              key={i}
              href={`#carousel-${className}-${i}`}
              className="rounded-full transition-all bg-slate-700 hover:bg-slate-500 w-2.5 h-2.5"
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
