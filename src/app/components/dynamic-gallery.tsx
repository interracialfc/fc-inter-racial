"use client";

import { useState, useEffect, useCallback } from "react";
import { urlFor } from "@/lib/sanity.image";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"; // Added Loader2
import Image from "next/image";
import { SanityImage } from "@/lib/types";

interface DynamicGalleryProps {
  images: SanityImage | SanityImage[];
  hasContainer?: boolean;
  landscape?: boolean;
}

export default function DynamicGallery({
  images: inputImages,
  hasContainer = false,
  landscape = false,
}: DynamicGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New Loading State

  const images = Array.isArray(inputImages) ? inputImages : [inputImages];

  // Helper to change index and trigger loading
  const changeImage = useCallback((newIndex: number) => {
    setIsLoading(true);
    setSelectedIndex(newIndex);
  }, []);

  const handleNext = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      if (images.length <= 1) return;
      const nextIdx =
        selectedIndex !== null ? (selectedIndex + 1) % images.length : 0;
      changeImage(nextIdx);
    },
    [images.length, selectedIndex, changeImage],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      if (images.length <= 1) return;
      const prevIdx =
        selectedIndex !== null
          ? (selectedIndex - 1 + images.length) % images.length
          : images.length - 1;
      changeImage(prevIdx);
    },
    [images.length, selectedIndex, changeImage],
  );

  const closeLightbox = () => {
    setSelectedIndex(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <>
      <div
        className={`grid grid-cols-2 gap-4 ${hasContainer ? "lg:grid-cols-2" : "md:grid-cols-3 lg:grid-cols-4"}`}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => changeImage(idx)} // Trigger loading on click
            className="group relative cursor-pointer overflow-hidden rounded bg-gray-200 shadow-md transition-all hover:ring-2 hover:ring-black dark:bg-black/20 dark:hover:ring-white"
          >
            <Image
              width={800}
              height={800}
              src={urlFor(img).width(800).height(800).fit("crop").url()}
              alt={`${img?.alt} - image ${idx + 1}`}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${landscape ? "aspect-4/3" : "aspect-square"}`}
              unoptimized
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={closeLightbox}
        >
          {/* Spinner Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-white/50" />
            </div>
          )}

          <button
            className="absolute top-6 right-6 z-60 rounded-full bg-white/10 p-2 text-white hover:bg-white hover:text-black"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 z-60 rounded-full bg-white/10 p-3 text-white hover:bg-white hover:text-black md:left-10"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} />
              </button>
              <button
                className="absolute right-4 z-60 rounded-full bg-white/10 p-3 text-white hover:bg-white hover:text-black md:right-10"
                onClick={handleNext}
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          <div className="relative flex h-full w-full items-center justify-center">
            <img
              src={urlFor(images[selectedIndex]).auto("format").url()}
              className={`max-h-full max-w-full rounded shadow-2xl transition-opacity duration-300 select-none ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              alt="Enlarged view"
              onLoad={() => setIsLoading(false)} // Turn off loading when image is ready
            />

            {!isLoading && images.length > 1 && (
              <div className="absolute -bottom-10 text-sm font-medium tracking-widest text-white/50">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
