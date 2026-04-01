import Image from "next/image";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { customBlock } from "@/lib/sanity.content";
import { urlFor } from "@/lib/sanity.image";

const OurStory = async () => {
  const data = await client.fetch(
    `*[_type == "about" && _id == "about"][0] {
        title,
        mainImage,
        content
      }`,
    {},
    { next: { tags: ["about"] } },
  );

  return (
    <section
      id="our-story"
      className="scroll-mt-16 px-6 py-20 font-sans md:scroll-mt-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Main Section Title */}
        <h2 className="mb-16 text-6xl font-black tracking-tight text-black dark:text-white">
          {data?.title || "Our Story"}
        </h2>

        {/* Story Image Container */}
        {data.mainImage && (
          <div className="relative mx-auto mb-12 aspect-4/3 overflow-hidden rounded-md shadow-sm">
            <Image
              src={urlFor(data.mainImage).width(1200).height(900).url()}
              alt={data.mainImage.alt || "IRFC Image"}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Sub-heading */}
        <div className="text-left text-black dark:text-white">
          <PortableText value={data.content} components={customBlock} />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
