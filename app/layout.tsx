import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zero7clothing.in"),
  title: {
    default: "ZERO7 — Men's Streetwear from Nagpur | T-Shirts, Shirts, Jeans",
    template: "%s · ZERO7",
  },
  description:
    "ZERO7 is a men's streetwear label from Nagpur. Heavyweight tees, overshirts, baggy denim and layers — cut in small runs, honest prices, PAN India shipping with COD.",
  keywords: [
    "Zero7",
    "streetwear India",
    "men's streetwear Nagpur",
    "oversized t-shirts",
    "baggy jeans India",
    "hoodies India",
    "streetwear brand",
  ],
  openGraph: {
    type: "website",
    title: "ZERO7 — Men's Streetwear from Nagpur",
    description:
      "Heavyweight tees, overshirts, baggy denim and layers. Small runs. Honest prices. PAN India shipping.",
    images: ["/images/hero-01.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#17150F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} pb-[64px] lg:pb-0`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileNav />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "ZERO7",
              description:
                "Men's streetwear label from Nagpur, India — heavyweight tees, overshirts, baggy denim and layers.",
              image: "https://zero7clothing.in/images/hero-01.jpg",
              url: "https://zero7clothing.in",
              areaServed: "IN",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nagpur",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
