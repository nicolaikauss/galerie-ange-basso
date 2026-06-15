"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ab_preloaded")) {
      setShow(false);
      return;
    }
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const start = performance.now();
    const DURATION = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          root.style.overflow = "";
          sessionStorage.setItem("ab_preloaded", "1");
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between"
          style={{ background: "var(--color-ink)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="grain" aria-hidden />
          <div className="container-x flex h-full flex-col justify-between py-10">
            <motion.span
              className="tag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Paris · Saint-Germain-des-Prés
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                className="font-display display-lg"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Ange <span className="text-gradient">Basso</span>
              </motion.h1>
            </div>

            <div className="flex items-end justify-between">
              <span className="tag">Contemporary &amp; Urban Art</span>
              <span className="font-display text-5xl tabular-nums sm:text-7xl">
                {count}
                <span className="text-accent">%</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
