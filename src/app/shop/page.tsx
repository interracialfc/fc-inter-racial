import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";
import { siteTitle } from "@/lib/seo";
import { client } from "@/lib/sanity";
import { Link } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import { Product } from "@/lib/types";
import Image from "next/image";
import { formatValueToTitle } from "@/lib/utils";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata: Metadata = {
  title: `Shop - ${siteTitle}`,
};

export default async function ShopPage() {
  const products = await client.fetch<Product[]>(
    `*[_type == "product"] | order(date desc)`,
    {},
    { next: { tags: ["product"] } },
  );

  return (
    <>
      <Header />
      <main className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
        <div className="mx-auto max-w-6xl text-center">
          {/* 1. Breadcrumb Component (from your 1st image) */}
          <Breadcrumbs currentPage="Shop" />

          <h2 className="mb-8 text-4xl font-black tracking-tight md:text-6xl">
            Shop
          </h2>

          <p className="mb-16 text-xl">The 2026 Collection is arriving soon.</p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product: Product) => (
              <a
                key={product._id}
                href={`/shop/${product.category}/${product.slug.current}`}
                className="group block"
              >
                <div className="dark:ring-irOrange relative aspect-4/5 overflow-hidden rounded-lg bg-gray-200 ring-black transition-all hover:ring-2">
                  <Image
                    src={urlFor(product.mainImage).width(600).url()}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-black px-5 py-2 text-sm text-white">
                    {formatValueToTitle(product.status)}
                  </div>
                </div>
                <h3 className="mt-4 font-bold">{product.name}</h3>
                <p>₱{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
