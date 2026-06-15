"use client";

import Marquee from "@/components/anim/Marquee";

const WORDS = ["Contemporary", "Urban", "Art", "Paris"];

export default function MarqueeBand() {
  return (
    <section
      className="relative border-y border-[var(--color-ink-line)] py-8"
      aria-hidden
    >
      <Marquee duration={32}>
        {WORDS.map((w, i) => (
          <span
            key={i}
            className="font-display display-md mx-8 uppercase text-[var(--color-paper)]"
          >
            {w}
            <span className="mx-8 text-gradient">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
