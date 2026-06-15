"use client";

import { type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { GALLERY, NAV } from "@/lib/data";

export default function Footer() {
  const lenis = useLenis();

  const toTop = (e: MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement | null;
    if (el && lenis) lenis.scrollTo(el, { duration: 1.2 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-ink-line)] pt-20">
      <div className="container-x">
        <div className="flex flex-col gap-12 pb-16 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="tag">Galerie Ange Basso</p>
            <p className="mt-4 text-[var(--color-paper-dim)]">
              {GALLERY.address1}, {GALLERY.address2}
            </p>
            <a
              href={GALLERY.phoneHref}
              className="link-underline mt-1 block text-[var(--color-paper-dim)]"
              data-cursor-hover
            >
              {GALLERY.phone}
            </a>
            <a
              href={`mailto:${GALLERY.email}`}
              className="link-underline mt-1 block text-[var(--color-paper-dim)]"
              data-cursor-hover
            >
              {GALLERY.email}
            </a>
          </div>

          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <p className="tag mb-1">Menu</p>
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={go(n.href)}
                  className="link-underline text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]"
                  data-cursor-hover
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              <p className="tag mb-1">Suivre</p>
              <a
                href={GALLERY.instagram}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]"
                data-cursor-hover
              >
                Instagram
              </a>
              <a
                href={GALLERY.facebook}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]"
                data-cursor-hover
              >
                Facebook
              </a>
            </nav>
          </div>
        </div>

        {/* Giant wordmark */}
        <a
          href="#top"
          onClick={toTop}
          className="block"
          data-cursor-hover
          data-cursor-label="Top"
          aria-label="Retour en haut"
        >
          <span className="font-display block w-full text-center text-[19vw] leading-[0.8] tracking-tight text-[var(--color-paper)] md:text-[20vw]">
            ANGE&nbsp;<span className="text-gradient">BASSO</span>
          </span>
        </a>

        <div className="flex flex-col gap-3 border-t border-[var(--color-ink-line)] py-7 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Galerie Ange Basso — Paris 6e</span>
          <span className="tag">Contemporary &amp; Urban Art</span>
          <button onClick={toTop} className="link-underline self-start md:self-auto" data-cursor-hover>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
