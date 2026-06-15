"use client";

import Image from "next/image";
import { ARTISTS, artistUrl } from "@/lib/data";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";

export default function Artists() {
  return (
    <section
      id="artists"
      className="section relative border-t border-[var(--color-ink-line)]"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="tag">(02) — Artistes</span>
            <h2 className="font-display display-md mt-5">
              <SplitWords text="Selected Artists" />
            </h2>
          </div>
          <Reveal delay={0.1} className="max-w-xs text-[var(--color-paper-dim)]">
            <p>
              From the godfathers of stencil to today&apos;s rule-breakers —
              sixteen voices shaping contemporary &amp; urban art.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {ARTISTS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 0.06}>
              <a
                href={artistUrl(a.slug)}
                target="_blank"
                rel="noreferrer"
                className="group block"
                data-cursor-hover
                data-cursor-label="View"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[var(--color-ink-soft)]">
                  <Image
                    src={a.img}
                    alt={a.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute left-3 top-3 font-mono text-xs text-[var(--color-paper-dim)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                    <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="font-display text-base leading-none md:text-lg">
                        {a.name}
                      </p>
                      <p className="tag mt-1.5">{a.tag}</p>
                    </div>
                    <span className="shrink-0 translate-y-2 text-[var(--color-accent)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <a
            href="https://www.galerie-angebasso.com/artistes/"
            target="_blank"
            rel="noreferrer"
            className="btn"
            data-cursor-hover
          >
            View all artists
          </a>
        </Reveal>
      </div>
    </section>
  );
}
