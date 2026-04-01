import { client } from "@/lib/sanity";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import { formatValueToTitle } from "@/lib/utils";
import { Product } from "@/lib/types";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import { cache } from "react";
import { Metadata } from "next";
import { siteTitle } from "@/lib/seo";
import { notFound } from "next/navigation";

export type ParamsType = {
  params: Promise<{
    category: string;
  }>;
};

// 1. Wrap the fetch call in React's cache function
const getCategory = cache(async (category: string) => {
  const products = await client.fetch(
    `*[_type == "product" && category == $category] | order(date desc)`,
    { category },
    { next: { tags: ["product"] } },
  );

  return products || null;
});

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategory(category);

  return {
    title: `${cat[0]?.category ? `Shop ${formatValueToTitle(cat[0]?.category)}` : "Merch Not Found"} - ${siteTitle}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const products = await getCategory(category);

  if (!products[0]) return notFound();

  return (
    <>
      <Header />
      <main className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
        <div className="mx-auto max-w-6xl">
          {/* 1. Breadcrumb Component */}
          <Breadcrumbs
            parentPage="Shop"
            parentPageLink="/shop"
            currentPage={formatValueToTitle(products[0]?.category)}
          />

          <h2 className="mb-12 text-center text-4xl font-black tracking-tight md:text-6xl">
            {formatValueToTitle(products[0]?.category)}
          </h2>

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
