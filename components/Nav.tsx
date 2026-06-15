"use client";

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { NAV, GALLERY } from "@/lib/data";
import { useCart } from "./cart/CartProvider";

export default function Nav() {
  const { count, open } = useCart();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);
  const lenis = useLenis();

  useLenis((l) => {
    const y = l.scroll;
    setScrolled(y > 40);
    if (y > last.current && y > 360) setHidden(true);
    else setHidden(false);
    last.current = y;
  });

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const toTop = (e: MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-[var(--color-ink-line)] bg-[var(--color-ink)]/80 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <nav className="container-x flex items-center justify-between py-4">
            <a
              href="#top"
              onClick={toTop}
              className="group flex items-center gap-2"
              data-cursor-hover
              aria-label="Galerie Ange Basso — accueil"
            >
              <span className="font-display text-lg tracking-tight">
                ANGE BASSO
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] transition-transform duration-500 group-hover:scale-150" />
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={go(n.href)}
                  className="link-underline text-sm text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
                >
                  {n.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={open}
                className="relative flex items-center gap-2 text-sm"
                data-cursor-hover
                aria-label={`Panier, ${count} article(s)`}
              >
                <span className="hidden sm:inline">Panier</span>
                <span className="grid h-7 min-w-7 place-items-center rounded-full border border-[var(--color-ink-line)] px-1.5 font-mono text-xs tabular-nums">
                  {count}
                </span>
              </button>

              <button
                onClick={() => setMenu((m) => !m)}
                className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-label="Menu"
                data-cursor-hover
              >
                <span
                  className={`h-px w-6 bg-current transition-transform duration-300 ${
                    menu ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-6 bg-current transition-transform duration-300 ${
                    menu ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-between bg-[var(--color-ink)] px-6 pb-10 pt-24 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          >
            <ul className="space-y-2">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                >
                  <a
                    href={n.href}
                    onClick={go(n.href)}
                    className="font-display block text-5xl"
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="tag space-y-1">
              <p>{GALLERY.address1}</p>
              <p>{GALLERY.address2}</p>
              <a href={GALLERY.phoneHref} className="block text-[var(--color-accent)]">
                {GALLERY.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
