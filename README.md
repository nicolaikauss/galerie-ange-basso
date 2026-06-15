# Galerie Ange Basso — Landing Page (rebuild)

A modern, motion-driven rebuild of [galerie-angebasso.com](https://www.galerie-angebasso.com/) —
the Saint-Germain-des-Prés gallery for **contemporary & urban art** (Banksy, Invader,
Blek le Rat, Conor Harrington, Pure Evil, Mark Jenkins, F2B, Pascal Obispo…).

Built to an awwwards / Dribbble bar: oversized kinetic typography, scroll-reveal
animations, smooth (Lenis) scrolling, a custom cursor, gradient accents, a cursor-tracking
exhibition list, and a working cart — all of the original site's functionality, upgraded.

> **Image policy:** every image is the gallery's own, downloaded from their live site into
> `public/images/`. No stock or third-party imagery is used.

## Stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router, TypeScript) |
| Styling | **Tailwind CSS v4** + bespoke CSS design tokens |
| Animation | **Motion** (`motion/react`) — scroll reveals, parallax, kinetic type |
| Smooth scroll | **Lenis** (`lenis/react`) |
| Fonts | Syne (display) · Inter (body) · Space Mono (labels) |
| Deploy | **Vercel** |

## Sections / functionality

Hero · About + stats · gradient marquee band · **Artists** (all 16, deep-linked) ·
**Exhibitions & Fairs** (hover-preview list) · **Shop** (add-to-cart drawer, sold-out
states) · **Contact** (address, hours, phone, email, newsletter, embedded map) · Footer.
Scroll-aware nav, mobile menu, custom cursor, preloader, JSON-LD + OpenGraph SEO.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Notes

- Artist / event / product cards deep-link back to the live gallery site for the full
  detail pages and real checkout.
- The cart is client-side (localStorage); "Passer commande" hands off to the gallery's
  WooCommerce cart.
- Content lives in [`lib/data.ts`](lib/data.ts). Drop new images in `public/images/` and
  add an entry.

Rebuilt with the [gallery-rebuild playbook](../../_docs/gallery-rebuild-playbook.md).
