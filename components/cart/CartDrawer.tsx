"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "./CartProvider";
import { formatEuro } from "@/lib/data";

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            className="fixed right-0 top-0 z-[121] flex h-full w-full max-w-[28rem] flex-col border-l border-[var(--color-ink-line)] bg-[var(--color-ink-soft)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Panier"
          >
            <header className="flex items-center justify-between border-b border-[var(--color-ink-line)] px-6 py-5">
              <span className="tag">Panier · {count}</span>
              <button
                onClick={close}
                className="link-underline text-sm"
                aria-label="Fermer le panier"
              >
                Fermer ✕
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <p className="py-16 text-center text-[var(--color-muted)]">
                  Votre panier est vide.
                </p>
              ) : (
                <ul className="divide-y divide-[var(--color-ink-line)]">
                  {lines.map((l) => (
                    <li key={l.product.id} className="flex gap-4 py-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-black/30">
                        <Image
                          src={l.product.img}
                          alt={l.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="font-medium leading-tight">
                          {l.product.title}
                        </p>
                        <p className="tag mt-0.5">{l.product.artist}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <button
                              onClick={() => setQty(l.product.id, l.qty - 1)}
                              className="h-6 w-6 rounded-full border border-[var(--color-ink-line)]"
                              aria-label="Diminuer"
                            >
                              −
                            </button>
                            <span className="tabular-nums">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.product.id, l.qty + 1)}
                              className="h-6 w-6 rounded-full border border-[var(--color-ink-line)]"
                              aria-label="Augmenter"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-sm">
                            {l.product.price
                              ? formatEuro(l.product.price * l.qty)
                              : "Sur demande"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(l.product.id)}
                        className="self-start text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                        aria-label="Retirer"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-[var(--color-ink-line)] px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="tag">Total</span>
                <span className="font-display text-2xl">
                  {formatEuro(total)}
                </span>
              </div>
              <a
                href="https://www.galerie-angebasso.com/panier/"
                target="_blank"
                rel="noreferrer"
                className="btn btn--solid w-full justify-center"
                data-cursor-hover
              >
                Passer commande
              </a>
              <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
                Paiement sécurisé via la galerie
              </p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
