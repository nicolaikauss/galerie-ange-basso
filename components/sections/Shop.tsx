"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { PRODUCTS, productUrl, formatEuro, type Product } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";

export default function Shop() {
  const { add } = useCart();

  const onAdd = (p: Product) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(p);
  };

  return (
    <section
      id="shop"
      className="section relative border-t border-[var(--color-ink-line)]"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="tag">(04) — Shop</span>
            <h2 className="font-display display-md mt-5">
              <SplitWords text="Editions & Originals" />
            </h2>
          </div>
          <a
            href="https://www.galerie-angebasso.com/shop/"
            target="_blank"
            rel="noreferrer"
            className="link-underline tag"
            data-cursor-hover
          >
            Browse the full shop →
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const canAdd = !p.soldOut && p.price !== null;
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.07}>
                <article className="group">
                  <a
                    href={productUrl(p.slug)}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block aspect-square overflow-hidden rounded-md bg-[var(--color-ink-soft)]"
                    data-cursor-hover
                  >
                    <Image
                      src={p.img}
                      alt={`${p.title} — ${p.artist}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
                    />
                    <span className="tag absolute left-3 top-3 rounded-full bg-[var(--color-ink)]/60 px-2.5 py-1 backdrop-blur-md">
                      {p.cat}
                    </span>
                    {p.soldOut && (
                      <span className="absolute right-3 top-3 rounded-full bg-[var(--color-accent)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-white">
                        Sold out
                      </span>
                    )}

                    {canAdd ? (
                      <button
                        onClick={onAdd(p)}
                        className="btn btn--solid absolute inset-x-3 bottom-3 translate-y-3 justify-center opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100"
                        data-cursor-hover
                      >
                        Ajouter au panier
                      </button>
                    ) : (
                      <span className="absolute inset-x-3 bottom-3 grid translate-y-3 place-items-center rounded-full border border-[var(--color-paper)]/30 bg-[var(--color-ink)]/50 py-3 font-mono text-[0.7rem] uppercase tracking-widest opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Voir l&apos;œuvre →
                      </span>
                    )}
                  </a>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg leading-tight">
                        {p.title}
                      </p>
                      <p className="tag mt-1.5">{p.artist}</p>
                    </div>
                    <p className="shrink-0 font-mono text-sm">
                      {p.price !== null ? formatEuro(p.price) : "Sur demande"}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
