import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Achievement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

async function getAchievements() {
  return await client.fetch<Achievement[]>(
    `*[_type == "achievement"] | order(date desc)`,
  );
}

const AchievementsSection = async () => {
  const achievements = await getAchievements();

  return (
    <section className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <div className="text-left">
          <Breadcrumbs currentPage="Achievements" />
        </div>
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl dark:text-white">
          Achievements
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Link
              key={achievement._id}
              href={`/achievements/${achievement.slug.current}`}
              className="group block"
            >
              <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-black/50 dark:hover:shadow-lg dark:hover:shadow-black/20">
                <div className="relative h-48 w-full bg-gray-100 dark:bg-slate-900/80">
                  {achievement.coverImage && (
                    <Image
                      src={urlFor(achievement.coverImage)
                        .width(500)
                        .height(300)
                        .url()}
                      alt={achievement.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      // This tells Next.js to use Sanity's optimized URL directly
                      unoptimized
                    />
                  )}
                  {achievement.rank && (
                    <div className="text-irOrange dark:bg-irOrange absolute top-2 right-2 rounded-full border bg-white/90 px-3 py-1 text-sm font-bold shadow-sm dark:text-white">
                      {achievement.rank}
                    </div>
                  )}
                </div>
                <div className="p-6 text-left">
                  <div className="text-irOrange mb-2 text-sm font-bold">
                    {formatDate(achievement.date)}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-black transition-colors dark:text-white">
                    {achievement.title}
                  </h3>
                  <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-500">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
