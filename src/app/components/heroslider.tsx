"use client"; // This allows hooks

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import { HeroSlide } from "@/lib/types";
import Link from "next/link";

export default function HeroSliderClient({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides?.length) return null;

  return (
    <section className="relative mt-16 h-150 w-full scroll-mt-16 overflow-hidden bg-black md:mt-20 md:scroll-mt-20">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image ? urlFor(slide.image).width(1920).url() : ""})`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-red-900/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-8">
            <h2 className="text-5xl leading-none font-black tracking-tighter text-white uppercase md:text-8xl">
              {slide.title?.split(" ")[0]} <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                {slide.title?.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="mt-5 ml-2 text-white">{slide.description}</p>

            {slide.buttonLink && (
              <div className="mt-6">
                <Link
                  href={slide.buttonLink}
                  className="inline-block cursor-pointer rounded-md border-2 border-white bg-white px-8 py-3 font-semibold transition-all hover:bg-transparent hover:text-white dark:text-black"
                >
                  {slide.button}
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Controls - Added z-index to stay on top */}
      <div className="absolute right-10 bottom-10 z-30 flex gap-4">
        <button
          onClick={prevSlide}
          className="cursor-pointer rounded-full border border-white/30 p-3 text-white transition-colors hover:bg-white hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="hover:bg-irOrange cursor-pointer rounded-full bg-white p-3 text-black transition-colors hover:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
