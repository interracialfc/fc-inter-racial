import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { siteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: `404 Out of bounds - ${siteTitle}`,
};

export default function notFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
      <Link href={"/"}>
        <Image
          src="/imgs/logo.jpg"
          alt="Out of bounds"
          width={120}
          height={120}
          unoptimized
        />
      </Link>
      <div className="relative mb-8 h-64 w-64 md:h-80 md:w-80">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-9xl font-black tracking-tighter text-black">
            404
          </h1>
        </div>
      </div>

      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
        Out of bounds!
      </h2>

      <p className="text-md mb-8 max-w-sm text-gray-500">
        It looks like you have wandered off the pitch. The page you are looking
        for does not exist or has been moved to a different league.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-md bg-black px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
        >
          Back to Home
        </Link>

        <Link
          href="/gallery"
          className="rounded-md border border-gray-300 px-8 py-3 font-semibold transition-colors hover:bg-gray-50"
        >
          View Gallery
        </Link>
      </div>
    </main>
  );
}
