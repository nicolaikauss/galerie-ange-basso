// All content sourced from the live galerie-angebasso.com site.
// Images live in /public/images and were downloaded from the gallery's own server.

export const GALLERY = {
  name: "Galerie Ange Basso",
  tagline: "Contemporary & Urban Art",
  taglineFr: "Art contemporain & urbain",
  since: "Saint-Germain-des-Prés · Paris",
  intro:
    "Dédiée à l'art contemporain, la Galerie Ange Basso soutient, encourage et accompagne une sélection d'artistes émergents et confirmés au cœur de Saint-Germain-des-Prés.",
  introEn:
    "A Saint-Germain-des-Prés gallery devoted to contemporary and urban art — championing the pioneers of the street-art movement alongside the next generation.",
  address1: "20–22 rue de Seine",
  address2: "75006 Paris",
  phone: "01 56 81 03 30",
  phoneHref: "tel:+33156810330",
  email: "galerie.angebasso@gmail.com",
  hours: [
    { d: "Mardi — Vendredi", h: "11h — 19h" },
    { d: "Samedi", h: "14h — 19h" },
    { d: "Dimanche — Lundi", h: "Fermé" },
  ],
  instagram: "https://instagram.com/galerieangebasso/",
  facebook:
    "https://www.facebook.com/Galerie-Ange-Basso-145425582173267/timeline/",
  mapsUrl: "https://maps.google.com/?q=20-22+rue+de+Seine+75006+Paris",
  source: "https://www.galerie-angebasso.com/",
};

export type Artist = {
  name: string;
  slug: string;
  tag: string;
  img: string;
};

// Order mirrors the gallery's "Artistes" page, headliners first.
export const ARTISTS: Artist[] = [
  { name: "Banksy", slug: "banksy", tag: "Anonymous · Stencil", img: "/images/artist-banksy.png" },
  { name: "Invader", slug: "invader", tag: "Mosaic · Pixel", img: "/images/artist-invader.jpg" },
  { name: "Blek le Rat", slug: "blek-le-rat", tag: "Stencil · Pioneer", img: "/images/artist-blek-le-rat.jpg" },
  { name: "Conor Harrington", slug: "conor-harrington", tag: "Painting · Motion", img: "/images/artist-conor-harrington.jpg" },
  { name: "Pure Evil", slug: "pure-evil", tag: "Stencil · Portraits", img: "/images/artist-pure-evil.jpg" },
  { name: "Mark Jenkins", slug: "mark-jenkins", tag: "Street Sculpture", img: "/images/artist-mark-jenkins.jpg" },
  { name: "Andréa Ravo Mattoni", slug: "andrea-ravo-mattoni", tag: "Classical · Spray", img: "/images/artist-ravo.jpg" },
  { name: "Miaz Brothers", slug: "miaz-brothers", tag: "Airbrush · Blur", img: "/images/artist-miaz-brothers.jpg" },
  { name: "Pascal Obispo", slug: "pascal-obispo", tag: "Mixed Media", img: "/images/artist-pascal-obispo.jpg" },
  { name: "Juan Ripollès", slug: "juan-ripolles", tag: "Sculpture · Color", img: "/images/artist-juan-ripolles.jpg" },
  { name: "Riccardo Simonutti", slug: "riccardo-simonutti", tag: "Contemporary", img: "/images/artist-riccardo-simonutti.jpg" },
  { name: "Ioye", slug: "ioye", tag: "Urban Art", img: "/images/artist-ioye.jpg" },
  { name: "Guillaume Tissier", slug: "guillaume-tissier", tag: "Contemporary", img: "/images/artist-guillaume-tissier.jpg" },
  { name: "Delhomme", slug: "delhomme", tag: "Illustration", img: "/images/artist-delhomme.jpg" },
  { name: "F2B", slug: "f2b", tag: "Sculpture · Objects", img: "/images/artist-f2b.jpg" },
  { name: "Sino", slug: "sino", tag: "Graffiti", img: "/images/artist-sino.jpg" },
];

export const artistUrl = (slug: string) =>
  `https://www.galerie-angebasso.com/artiste/${slug}/`;

export type Expo = {
  year: string;
  title: string;
  place: string;
  slug: string;
  img?: string;
};

// Selected exhibitions & art fairs, reverse-chronological.
export const EVENTS: Expo[] = [
  { year: "2025", title: "Pascal Obispo", place: "Solo Show · Paris", slug: "pascal-obispo-2025", img: "/images/event-pascal-obispo.jpg" },
  { year: "2024", title: "Andréa Ravo Mattoni", place: "Solo Show · Paris", slug: "andrea-ravo-mattoni-2024", img: "/images/event-ravo.jpg" },
  { year: "2023", title: "Juan Ripollès", place: "Solo Show · Paris", slug: "ripolles", img: "/images/event-ripolles.jpg" },
  { year: "2023", title: "BAD+ Art Fair", place: "Bordeaux", slug: "bad-2023" },
  { year: "2023", title: "Urban Art Fair", place: "Le Carreau du Temple, Paris", slug: "urban-art-fair-2023" },
  { year: "2022", title: "Urban Art Fair", place: "Le Carreau du Temple, Paris", slug: "urban-art-fair-2022" },
  { year: "2021", title: "Art Paris", place: "Grand Palais Éphémère", slug: "art-paris-2021" },
  { year: "2019", title: "Art Élysées", place: "Avenue des Champs-Élysées", slug: "art-elysees-2019-2" },
  { year: "2018", title: "Art Paris", place: "Grand Palais", slug: "art-paris-2018" },
  { year: "2016", title: "Urban Art Fair", place: "Le Carreau du Temple, Paris", slug: "urban-art-fair-2016" },
];

export const eventUrl = (slug: string) =>
  `https://www.galerie-angebasso.com/evenement/${slug}/`;

export type Product = {
  id: string;
  title: string;
  artist: string;
  price: number | null; // null = "Sur demande"
  cat: string;
  img: string;
  slug: string;
  soldOut?: boolean;
};

export const PRODUCTS: Product[] = [
  { id: "p1", title: "Mona Lisa", artist: "Blek le Rat", price: null, cat: "Sérigraphie", img: "/images/art-blr-monalisa.jpg", slug: "monalisa-blek-le-rat" },
  { id: "p2", title: "Castrol Oil Cans", artist: "F2B", price: 3400, cat: "Sculpture", img: "/images/product-castrol.jpg", slug: "castrol-oil-cans-by-f2b" },
  { id: "p3", title: "Diet Coke Cans", artist: "F2B", price: 2400, cat: "Sculpture", img: "/images/product-cocacans.jpg", slug: "diet-coke-cans-by-f2b" },
  { id: "p4", title: "Elf Oil Cans", artist: "F2B", price: 3400, cat: "Sculpture", img: "/images/product-elf.jpg", slug: "elf-oil-cans-by-f2b" },
  { id: "p5", title: "Bubble Print", artist: "Pascal Obispo", price: 400, cat: "Sérigraphie", img: "/images/product-bubble.jpg", slug: "bubble-print-2025", soldOut: true },
  { id: "p6", title: "Réversibilité — Fleurs", artist: "Pascal Obispo", price: 500, cat: "Sérigraphie", img: "/images/product-flowers.jpg", slug: "captain-flower-print-pascal-obispo", soldOut: true },
];

export const productUrl = (slug: string) =>
  `https://www.galerie-angebasso.com/produit/${slug}/`;

export const NAV = [
  { label: "Artistes", href: "#artists" },
  { label: "Évènements", href: "#events" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(n);
