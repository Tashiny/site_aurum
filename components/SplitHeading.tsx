"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Заголовок с построчным раскрытием: каждая строка выезжает из-под маски. */
export default function SplitHeading({ lines, className = "" }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? undefined : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.05, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
