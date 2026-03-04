import { Album } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";
import DynamicGallery from "./dynamic-gallery";

export default function AlbumPictures({ album }: { album: Album }) {
  return (
    <section className="scroll-mt-36 bg-white px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <Breadcrumbs
          currentPage={album.title}
          parentPage="Gallery"
          parentPageLink="/gallery"
        />
        <h2 className="mb-4 text-4xl font-black tracking-tight text-black md:text-6xl">
          {album.title}
        </h2>
        <p className="mb-16">{album.description}</p>

        <DynamicGallery images={album.images} />
      </div>
    </section>
  );
}
