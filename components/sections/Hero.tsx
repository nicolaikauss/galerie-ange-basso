"use client";

import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { ARTISTS, GALLERY } from "@/lib/data";
import SplitWords from "@/components/anim/SplitWords";
import Marquee from "@/components/anim/Marquee";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement | null;
    if (el && lenis) lenis.scrollTo(el, { duration: 1.3 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      {/* Parallax backdrop — the real gallery interior */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <Image
          src="/images/gallery-floor.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.55) 38%, var(--color-ink) 100%)",
          }}
        />
      </motion.div>
      <div
        className="glow"
        style={{
          width: 620,
          height: 620,
          left: "-6%",
          top: "12%",
          background: "var(--color-accent)",
          opacity: 0.28,
        }}
        aria-hidden
      />
      <div
        className="glow"
        style={{
          width: 520,
          height: 520,
          right: "-4%",
          bottom: "8%",
          background: "var(--color-accent-3)",
          opacity: 0.22,
        }}
        aria-hidden
      />

      {/* Headline block */}
      <motion.div
        style={{ opacity: fade }}
        className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[var(--color-accent)]" />
          <span className="tag">{GALLERY.since} — est. galerie</span>
        </motion.div>

        <h1 className="font-display uppercase">
          <SplitWords
            as="span"
            className="hero-kicker block text-[var(--color-paper-dim)]"
            text="Contemporary &"
            delay={0.25}
          />
          <span className="reveal-line mt-2">
            <motion.span
              className="hero-giant block text-gradient"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.45,
              }}
            >
              Urban Art
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-md text-balance text-[var(--color-paper-dim)]"
          >
            {GALLERY.introEn}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#artists"
              onClick={go("#artists")}
              className="btn btn--solid"
              data-cursor-hover
            >
              Explore Artists
            </a>
            <a
              href="#shop"
              onClick={go("#shop")}
              className="btn"
              data-cursor-hover
            >
              Visit the Shop
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom strip — artist marquee + scroll cue */}
      <div className="relative border-t border-[var(--color-ink-line)] py-4">
        <Marquee duration={42}>
          {ARTISTS.map((a) => (
            <span
              key={a.slug}
              className="font-display mx-6 text-2xl uppercase text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
            >
              {a.name}
              <span className="mx-6 text-[var(--color-accent)]">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-24 right-6 hidden md:block"
        aria-hidden
      >
        <div className="spin-slow relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path
                id="circlePath"
                d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                fill="none"
              />
            </defs>
            <text className="fill-[var(--color-paper-dim)] font-mono text-[8.5px] uppercase tracking-[0.25em]">
              <textPath href="#circlePath">
                scroll to discover · the collection ·
              </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[var(--color-accent)]">
            ↓
          </span>
        </div>
      </motion.div>
    </section>
  );
}
