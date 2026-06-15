"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { EVENTS, eventUrl } from "@/lib/data";
import SplitWords from "@/components/anim/SplitWords";

export default function Events() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 250, damping: 28, mass: 0.5 });

  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const current = active !== null ? EVENTS[active] : null;

  return (
    <section
      id="events"
      className="section relative border-t border-[var(--color-ink-line)]"
      onMouseMove={onMove}
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="tag">(03) — Évènements</span>
            <h2 className="font-display display-md mt-5">
              <SplitWords text="Exhibitions & Fairs" />
            </h2>
          </div>
          <a
            href="https://www.galerie-angebasso.com/evenements/"
            target="_blank"
            rel="noreferrer"
            className="link-underline tag"
            data-cursor-hover
          >
            Full archive →
          </a>
        </div>

        <ul className="mt-12 border-t border-[var(--color-ink-line)]">
          {EVENTS.map((ev, i) => (
            <li key={ev.slug} className="border-b border-[var(--color-ink-line)]">
              <a
                href={eventUrl(ev.slug)}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                className="group grid grid-cols-12 items-center gap-3 py-5 md:py-7"
                data-cursor-hover
              >
                <span className="col-span-3 font-mono text-sm text-[var(--color-muted)] md:col-span-2">
                  {ev.year}
                </span>
                <span className="col-span-7 font-display text-2xl transition-all duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-[var(--color-accent)] md:col-span-7 md:text-4xl">
                  {ev.title}
                </span>
                <span className="tag col-span-2 hidden text-[var(--color-paper-dim)] md:block">
                  {ev.place}
                </span>
                <span className="col-span-2 text-right text-[var(--color-accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:col-span-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current?.img && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative h-60 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl"
              initial={{ scale: 0.85, rotate: -4 }}
              animate={{ scale: 1, rotate: -4 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <Image
                src={current.img}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
