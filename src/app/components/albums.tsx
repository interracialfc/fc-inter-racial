import { Album } from "@/lib/types";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import Image from "next/image";

export default async function Albums({ albums }: { albums: Album[] }) {
  return (
    <section className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <div className="text-left">
          <Breadcrumbs currentPage="Gallery" />
        </div>
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl dark:text-white">
          Gallery
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album._id}
              href={`/gallery/${album.slug.current}`}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all hover:ring-2 hover:ring-black dark:bg-slate-900/80 dark:hover:ring-white"
            >
              <Image
                fill
                src={urlFor(album.coverImage).width(500).height(500).url()}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={album.title}
                unoptimized
              />
              <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-[40%] text-2xl font-bold text-white uppercase">
                <h2 className="">{album.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
