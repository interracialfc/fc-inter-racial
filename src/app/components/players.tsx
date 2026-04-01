import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Player } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";

// --- Types ---
type Position = "CH" | "FW" | "MF" | "DF" | "GK" | "OTH";

interface Category {
  label: string;
  id: string;
  filter: Position;
}

// --- Sub-Components ---
const PlayerCard = ({ player }: { player: Player }) => (
  <a
    href={`/players/${player.slug.current}`}
    className="group dark:ring-gray-black relative aspect-4/5 overflow-hidden rounded-md bg-gray-200 transition-all hover:ring-2 hover:ring-black dark:bg-black dark:hover:ring-white"
  >
    <div className="flex h-full w-full items-end bg-linear-to-br">
      <p className="absolute z-20 w-full bg-linear-to-t from-gray-500 to-transparent p-2 pt-5 font-bold tracking-tighter text-white uppercase dark:from-[#1c1c1d]/90">
        {player.name}
      </p>

      {player.profilePicture ? (
        <Image
          fill
          alt={player.name}
          src={urlFor(player.profilePicture).width(300).auto("format").url()}
          className="w-full object-cover opacity-100 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 md:opacity-90 dark:md:opacity-85"
          unoptimized
        />
      ) : (
        <Image
          width={896}
          height={1120}
          alt="Unknown player"
          src="/imgs/profile-placeholder.png"
          className="w-full object-cover opacity-100 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 md:opacity-90 dark:md:opacity-85"
          unoptimized
        />
      )}
    </div>
  </a>
);

const PlayerGroup = ({
  title,
  id,
  players,
}: {
  title: string;
  id: string;
  players: Player[];
}) => {
  if (players.length === 0) return null;
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h3
          id={id}
          className="text-xl font-bold tracking-widest text-gray-800 uppercase md:text-2xl dark:text-white/65"
        >
          {title}
        </h3>
        {id == "others" && (
          <p className="mx-auto mt-2 max-w-sm text-xs text-black/70 dark:text-white/40">
            Club legends and inactive players who continue to serve the
            organization as part of our support staff.
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 flex-wrap gap-4 md:grid-cols-4 lg:grid-cols-6">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

// --- Config ---
const categories: Category[] = [
  { label: "COACHING STAFF", id: "coaching", filter: "CH" },
  { label: "FORWARDS", id: "forwards", filter: "FW" },
  { label: "MIDFIELDERS", id: "midfielders", filter: "MF" },
  { label: "DEFENDERS", id: "defenders", filter: "DF" },
  { label: "GOALKEEPERS", id: "goalkeepers", filter: "GK" },
  { label: "OTHERS", id: "others", filter: "OTH" },
];

// --- Main Server Component ---
export default async function PlayersSection({
  showBreadcrumbs = false,
}: {
  showBreadcrumbs?: boolean;
}) {
  // Fetch data directly in the component
  const players = await client.fetch<Player[]>(
    `*[_type == "player"] | order(name asc)`,
    {},
    { next: { tags: ["player"] } },
  );

  return (
    <section
      className="scroll-mt-36 px-4 py-20 font-sans md:scroll-mt-20 md:py-36"
      id="players"
    >
      <div className="mx-auto max-w-6xl text-center">
        {showBreadcrumbs && (
          <div className="text-left">
            <Breadcrumbs currentPage="Players" />
          </div>
        )}
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl dark:text-white">
          Players
        </h2>

        {/* Navigation Links */}
        <div className="flex-md mb-16 hidden flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              href={`#${cat.id}`}
              key={cat.id}
              className="rounded-md border border-gray-300 px-6 py-2 text-sm font-bold tracking-widest text-black transition-all hover:bg-gray-100"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Render Groups */}
        {categories.map((cat) => {
          // Filter players by position (case-insensitive for safety)
          const filteredPlayers = players.filter(
            (p) => p.position === cat.filter,
          );

          return (
            <PlayerGroup
              key={cat.id}
              id={cat.id}
              title={cat.label}
              players={filteredPlayers}
            />
          );
        })}
      </div>
    </section>
  );
}
