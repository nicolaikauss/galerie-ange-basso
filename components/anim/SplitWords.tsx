"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

const container: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

export default function SplitWords({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <motion.span
        style={{ display: "inline" }}
        variants={container}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-10%" }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          >
            <motion.span style={{ display: "inline-block" }} variants={word}>
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
