import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Achievement } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import { formatDate } from "@/lib/utils";
import DynamicGallery from "../../components/dynamic-gallery";

export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

async function getAchievement(slug: string) {
  return await client.fetch<Achievement>(
    `*[_type == "achievement" && slug.current == $slug][0]`,
    { slug },
    { next: { tags: ["achievement"] } },
  );
}

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { slug } = await params;
  const achievement = await getAchievement(slug);

  return {
    title: `${achievement?.title ?? "Achievement Not Found"} - FC Inter Racial`,
  };
}

export default async function AchievementPage({ params }: ParamsType) {
  const { slug } = await params;
  const achievement = await getAchievement(slug);

  if (!achievement) return notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 pb-20 md:pt-36 dark:bg-transparent">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <Breadcrumbs
              parentPage="Achievements"
              parentPageLink="/achievements"
              currentPage={achievement.title}
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-black/50 dark:hover:shadow-lg">
            <div className="relative h-64 w-full bg-gray-100 md:h-96 dark:bg-black/20">
              {achievement.coverImage && (
                <Image
                  src={urlFor(achievement.coverImage).url()}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {achievement.rank && (
                <div className="text-irOrange absolute top-4 right-4 rounded-full border-2 bg-white/90 px-4 py-2 font-bold shadow-lg/20 dark:bg-black/90 dark:text-white">
                  {achievement.rank}
                </div>
              )}
            </div>
            <div className="p-8 md:p-12">
              <div className="text-irOrange mb-4 text-sm font-bold tracking-wide uppercase">
                {formatDate(achievement.date)}
              </div>
              <h1 className="mb-6 text-3xl font-black text-black md:text-5xl dark:text-white">
                {achievement.title}
              </h1>
              <div className="prose prose-lg dark:[&_a]:text-irOrange mb-8 max-w-none text-gray-600 dark:text-slate-300 dark:[&_li]:marker:text-[#e5b13d] dark:[&_strong]:text-white">
                {achievement.details ? (
                  <PortableText value={achievement.details} />
                ) : (
                  <p>{achievement.description}</p>
                )}
              </div>

              {achievement.images && achievement.images.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                    Gallery
                  </h3>
                  <DynamicGallery
                    images={achievement.images}
                    hasContainer
                    landscape
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
