"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  y = 26,
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
