import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, ArrowLink } from "@/components/ui";
import { ProductGallery, BuyBox } from "@/components/product-detail";
import { ProductGrid } from "@/components/product-card";
import { products, getProduct, relatedProducts, categoryLabel } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.blurb} ${product.fit} fit, ${product.fabric}. PAN India shipping with COD.`,
    openGraph: { images: [product.images[0]] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = relatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => `https://zero7clothing.in${i}`),
    description: `${product.blurb} ${product.fit} fit, ${product.fabric}.`,
    brand: { "@type": "Brand", name: "ZERO7" },
    category: categoryLabel(product.category),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-32 sm:pt-36" />
      <Container>
        <nav className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-stone">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <Link href={`/shop?c=${product.category}`} className="hover:text-ink">
            {categoryLabel(product.category)}
          </Link>
        </nav>
      </Container>

      <section className="mt-6 pb-16 sm:pb-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <BuyBox product={product} />
        </Container>
      </section>

      {/* Fit note strip */}
      <section className="border-y border-line bg-paper2 py-12">
        <Container className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="label">The fit</span>
            <p className="mt-3 font-display text-2xl tracking-tight">{product.fit}</p>
            <p className="mt-1 text-sm text-ink2">
              Sized for a {product.fit.toLowerCase()} drape. Between sizes? Size up and let it hang.
            </p>
          </div>
          <div>
            <span className="label">The fabric</span>
            <p className="mt-3 font-display text-2xl tracking-tight">
              {product.fabric.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="mt-1 text-sm text-ink2">
              Chosen for weight and durability — built to survive real wear.
            </p>
          </div>
          <div>
            <span className="label">The delivery</span>
            <p className="mt-3 font-display text-2xl tracking-tight">Nagpur → India</p>
            <p className="mt-1 text-sm text-ink2">
              Dispatched in 24–48 hrs. Free shipping over ₹1,499, COD available.
            </p>
          </div>
        </Container>
      </section>

      <section className="cv-auto py-16 sm:py-24">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
              Complete the fit
            </h2>
            <ArrowLink href="/shop">Shop all</ArrowLink>
          </div>
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </Container>
      </section>
    </>
  );
}
