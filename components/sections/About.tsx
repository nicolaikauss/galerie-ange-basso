"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";
import { GALLERY } from "@/lib/data";

const STATS = [
  { n: "16", l: "Artistes représentés" },
  { n: "20+", l: "Foires & expositions" },
  { n: "2006", l: "Rue de Seine, Paris 6e" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section id="about" className="section relative">
      <div className="container-x grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <span className="tag">(01) — La galerie</span>
          <h2 className="font-display display-md mt-6 max-w-2xl">
            <SplitWords text="A house for the pioneers of urban art — in the heart of Saint-Germain." />
          </h2>
          <Reveal delay={0.1} className="mt-8 max-w-xl text-lg text-[var(--color-paper-dim)]">
            <p>{GALLERY.intro}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[var(--color-ink-line)] pt-8">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08}>
                <p className="font-display text-4xl md:text-5xl">{s.n}</p>
                <p className="tag mt-2">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={ref} className="md:col-span-5">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <motion.div style={{ y }} className="absolute inset-[-9%]">
                <Image
                  src="/images/about.jpg"
                  alt="Galerie Ange Basso — vue intérieure"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute bottom-4 left-4 rounded-full bg-[var(--color-ink)]/70 px-4 py-2 backdrop-blur-md">
                <span className="tag">{GALLERY.address1}, Paris</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
