"use client";

import { useState, useEffect, useCallback } from "react";
import { urlFor } from "@/lib/sanity.image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { SanityImage } from "@/lib/types";

// Accept either a single image object or an array of image objects from Sanity
interface DynamicGalleryProps {
  images: SanityImage | SanityImage[];
}

export default function DynamicGallery({
  images: inputImages,
}: DynamicGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Normalize input: Ensure we are always working with an array
  const images = Array.isArray(inputImages) ? inputImages : [inputImages];

  const handleNext = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : 0,
      );
    },
    [images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null
          ? (prev - 1 + images.length) % images.length
          : images.length - 1,
      );
    },
    [images.length],
  );

  const closeLightbox = () => setSelectedIndex(null);

  // Swipe & Keyboard Logic
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const distance = touchStart - e.changedTouches[0].clientX;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    setTouchStart(null);
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
      {/* Grid Layout - Changes dynamically based on image count */}
      <div
        className={`md:grid-cols-4"} grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4`}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative cursor-pointer overflow-hidden rounded bg-gray-100 shadow-md transition-all hover:ring-2 hover:ring-black"
          >
            <Image
              width={800}
              height={800}
              src={urlFor(img).width(800).height(800).fit("crop").url()}
              alt={`${img?.alt} - image ${idx + 1}`}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="absolute top-6 right-6 z-60 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white hover:text-black"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 z-60 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white hover:text-black md:left-10"
                onClick={handlePrev}
              >
                <ChevronLeft size={48} />
              </button>
              <button
                className="absolute right-4 z-60 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white hover:text-black md:right-10"
                onClick={handleNext}
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}

          {/* Enlarge view Image Container */}
          <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
            <img
              src={urlFor(images[selectedIndex]).auto("format").url()}
              className="pointer-events-auto max-h-full max-w-full rounded shadow-2xl transition-all duration-300 select-none"
              alt="Enlarged view"
            />
            {/* Counter */}
            {images.length > 1 && (
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
