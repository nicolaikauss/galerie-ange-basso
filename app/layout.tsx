import type { Metadata, Viewport } from "next";
import { Syne, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { GALLERY } from "@/lib/data";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://galerie-ange-basso.vercel.app"),
  title: {
    default: "Galerie Ange Basso — Contemporary & Urban Art · Paris",
    template: "%s — Galerie Ange Basso",
  },
  description:
    "Galerie Ange Basso — contemporary & urban art in Saint-Germain-des-Prés, Paris. Banksy, Invader, Blek le Rat, Conor Harrington, Pure Evil, Mark Jenkins and more. 20–22 rue de Seine.",
  keywords: [
    "Galerie Ange Basso",
    "urban art Paris",
    "street art gallery",
    "contemporary art",
    "Banksy",
    "Invader",
    "Blek le Rat",
    "Saint-Germain-des-Prés",
    "rue de Seine",
  ],
  authors: [{ name: "Galerie Ange Basso" }],
  openGraph: {
    title: "Galerie Ange Basso — Contemporary & Urban Art",
    description:
      "Contemporary & urban art in the heart of Saint-Germain-des-Prés, Paris.",
    type: "website",
    locale: "fr_FR",
    siteName: "Galerie Ange Basso",
    images: [{ url: "/images/gallery-floor.jpg", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie Ange Basso — Contemporary & Urban Art",
    description: "Contemporary & urban art · Saint-Germain-des-Prés, Paris.",
    images: ["/images/gallery-floor.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  name: GALLERY.name,
  description: GALLERY.introEn,
  address: {
    "@type": "PostalAddress",
    streetAddress: GALLERY.address1,
    postalCode: "75006",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  telephone: "+33156810330",
  email: GALLERY.email,
  sameAs: [GALLERY.instagram, GALLERY.facebook],
  url: "https://galerie-ange-basso.vercel.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Preloader />
          <Cursor />
          <div className="grain" aria-hidden />
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
