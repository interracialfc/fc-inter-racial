import { Album } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";
import DynamicGallery from "./dynamic-gallery";

export default function AlbumPictures({ album }: { album: Album }) {
  return (
    <section className="scroll-mt-36 bg-gray-50 px-4 py-20 font-sans md:scroll-mt-20 md:py-36 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <Breadcrumbs
          currentPage={album.title}
          parentPage="Gallery"
          parentPageLink="/gallery"
        />
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm/10 md:p-12 dark:border-white/10 dark:bg-black/50">
          <h2 className="mb-4 text-4xl font-black tracking-tight text-black md:text-6xl dark:text-white">
            {album.title}
          </h2>
          <p className="mb-16 text-gray-600 dark:text-slate-300">
            {album.description}
          </p>

          <DynamicGallery images={album.images} />
        </div>
      </div>
    </section>
  );
}
