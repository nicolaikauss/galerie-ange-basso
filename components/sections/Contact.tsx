"use client";

import { useState, type FormEvent } from "react";
import { GALLERY } from "@/lib/data";
import Reveal from "@/components/anim/Reveal";
import SplitWords from "@/components/anim/SplitWords";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="section relative border-t border-[var(--color-ink-line)]"
    >
      <div className="container-x grid gap-14 md:grid-cols-2">
        <div>
          <span className="tag">(05) — Contact</span>
          <h2 className="font-display display-md mt-5 max-w-md">
            <SplitWords text="Visit the gallery" />
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <Reveal>
              <p className="tag mb-2">Adresse</p>
              <a
                href={GALLERY.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-lg"
                data-cursor-hover
              >
                {GALLERY.address1}
                <br />
                {GALLERY.address2}
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="tag mb-2">Horaires</p>
              <ul className="space-y-1 text-[var(--color-paper-dim)]">
                {GALLERY.hours.map((h) => (
                  <li key={h.d} className="flex justify-between gap-4">
                    <span>{h.d}</span>
                    <span className="text-[var(--color-paper)]">{h.h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="tag mb-2">Téléphone</p>
              <a
                href={GALLERY.phoneHref}
                className="link-underline text-lg"
                data-cursor-hover
              >
                {GALLERY.phone}
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="tag mb-2">Email</p>
              <a
                href={`mailto:${GALLERY.email}`}
                className="link-underline break-all text-lg"
                data-cursor-hover
              >
                {GALLERY.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-12">
            <p className="tag mb-3">Newsletter</p>
            {sent ? (
              <p className="text-[var(--color-accent)]">
                Merci — vous êtes inscrit·e. À bientôt à la galerie.
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="flex max-w-md items-center gap-3 border-b border-[var(--color-ink-line)] pb-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-[var(--color-muted)]"
                  aria-label="Adresse email"
                />
                <button
                  type="submit"
                  className="shrink-0 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]"
                  data-cursor-hover
                >
                  S&apos;inscrire →
                </button>
              </form>
            )}
          </Reveal>

          <div className="mt-10 flex gap-6">
            <a
              href={GALLERY.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
              data-cursor-hover
            >
              Instagram
            </a>
            <a
              href={GALLERY.facebook}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
              data-cursor-hover
            >
              Facebook
            </a>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-lg border border-[var(--color-ink-line)]">
            <iframe
              title="Galerie Ange Basso — 20-22 rue de Seine, Paris"
              src="https://maps.google.com/maps?q=20-22%20rue%20de%20Seine%2075006%20Paris&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full grayscale invert-[0.92] hue-rotate-180"
              style={{ border: 0, minHeight: "26rem" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
