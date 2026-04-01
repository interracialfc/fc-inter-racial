"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import { Product } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";
import { formatValueToTitle } from "@/lib/utils";

export default function ProductDetails({ product }: { product: Product }) {
  // 1. Combine images into a single array
  const allImages = [product.mainImage, ...(product.images || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const isMessageToOrder = product.button?.toLowerCase().includes("message");
  const orderLink = `/contact?subject=Order&product=${encodeURIComponent(product.name)}`;
  const buttonLink = isMessageToOrder ? orderLink : product.buttonLink;
  const hasButtonLink = Boolean(buttonLink);

  // 2. Loop Logic for Arrows
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // 3. Swipe Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    // Threshold of 50px to trigger swipe
    if (distance > 50) nextImage(); // Swipe Left -> Next
    if (distance < -50) prevImage(); // Swipe Right -> Prev
    setTouchStart(null);
  };

  return (
    <div className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* 1. Breadcrumb Component (from your 1st image) */}
        <Breadcrumbs
          parentPage="Shop"
          parentPageLink="/shop"
          parentPage2={formatValueToTitle(product.category)}
          parentPageLink2={`/shop/${product.category}`}
          currentPage={product.name}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* 1. Main Image Gallery (Order 1 on mobile) */}
          <div
            className="group relative overflow-hidden bg-gray-100 md:order-2 md:col-span-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={urlFor(allImages[currentIndex]).width(800).url()}
                alt={product.name}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-6 bottom-6 flex space-x-2">
              <button
                onClick={prevImage}
                className="rounded-full bg-white p-3 text-black shadow-md transition-transform hover:bg-gray-100 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="rounded-full bg-white p-3 text-black shadow-md transition-transform hover:bg-gray-100 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 2. Thumbnail Section (Row on mobile, Sidebar on Tablet/MD+) */}
          <div className="flex flex-row space-x-3 overflow-x-auto p-2 md:order-1 md:col-span-1 md:flex md:flex-col md:space-y-3 md:space-x-0 md:overflow-visible md:p-0">
            {allImages.map((img, i) => (
              <div
                key={img.asset._ref || i}
                onClick={() => setCurrentIndex(i)}
                className={`aspect-square w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-sm bg-gray-100 transition-all md:w-full ${
                  currentIndex === i
                    ? "dark:ring-irOrange ring-2 ring-black"
                    : "ring-gray-400 hover:ring-1"
                }`}
              >
                <Image
                  src={urlFor(img).width(100).height(100).fit("crop").url()}
                  alt={`${product.name} thumb ${i}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* 3. Product Info (Order 3 on mobile/tablet) */}
          <div className="flex flex-col md:order-3 md:col-span-5">
            <span className="text-irOrange text-sm font-medium">
              {formatValueToTitle(product.status)}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-600">
              Inter Racial {formatValueToTitle(product.category)}
            </p>
            <p className="mt-4 text-xl font-bold">₱{product.price}</p>

            {/* Description */}
            <div className="mt-8 space-y-6 leading-relaxed text-gray-800 dark:text-gray-300">
              <p className="text-sm">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <a
                href={buttonLink || "#"}
                className={`dark:bg-irOrange dark:hover:bg-irOrange/80 block w-full rounded-md bg-black py-5 text-center text-lg font-bold text-white transition-colors hover:bg-zinc-800 ${hasButtonLink ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {product.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
