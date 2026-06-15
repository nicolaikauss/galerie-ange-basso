"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 38, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    document.body.dataset.cursor = "on";
    setReady(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor-hover]"
      ) as HTMLElement | null;
      setHover(!!t);
      setLabel(t?.getAttribute("data-cursor-label") ?? null);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      delete document.body.dataset.cursor;
    };
  }, [x, y]);

  if (!ready) return null;

  return (
    <motion.div
      className="cursor-dot"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <motion.span
        style={{
          display: "grid",
          placeItems: "center",
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: 999,
          border: "1px solid #fff",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#fff",
          background: label ? "rgba(255,59,29,0.9)" : "transparent",
          mixBlendMode: label ? "normal" : "difference",
        }}
        animate={{
          width: label ? 84 : hover ? 52 : 12,
          height: label ? 84 : hover ? 52 : 12,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
