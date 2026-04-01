"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { Player, SanityImage } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import Breadcrumbs from "./breadcrumbs";
import { formatDate } from "@/lib/utils";
import DynamicGallery from "./dynamic-gallery";

interface PlayerDetailsProps {
  player: Player;
}

const getPositionLabel = (filter: string | undefined): string => {
  if (!filter) return "N/A";

  const positionMap: Record<string, string> = {
    CH: "COACHING STAFF",
    FW: "FORWARD",
    MF: "MIDFIELDER",
    DF: "DEFENDER",
    GK: "GOALKEEPER",
  };

  return positionMap[filter] || "N/A";
};

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="relative min-h-[60vh] bg-[#dde1e4] p-4 py-24 font-sans text-black md:pt-30 dark:bg-[#1c1c1d] dark:text-white">
      <div className="mx-auto w-full max-w-6xl">
        <Breadcrumbs
          currentPage={player.name}
          parentPage="Players"
          parentPageLink="/players"
        />
      </div>

      <div className="mx-auto mb-2 grid w-full max-w-6xl grid-cols-1 items-start gap-8 md:mb-12 md:grid-cols-2">
        {/* Left Side: Player Image */}
        <div className="relative flex aspect-4/5 justify-center overflow-hidden rounded-2xl bg-[#dbdadf]">
          {player.profilePicture ? (
            <Image
              width={896}
              height={1120}
              src={urlFor(player.profilePicture)
                .width(896)
                .height(1120)
                .auto("format")
                .url()}
              alt={player.profilePicture.alt || player.name}
              loading="lazy"
              className="object-cover"
              unoptimized
            />
          ) : (
            <Image
              width={896}
              height={1120}
              alt="Unknown player"
              src="/imgs/profile-placeholder.png"
              className="object-cover"
              unoptimized
            />
          )}
        </div>

        {/* Right Side: Player Info */}
        <div className="space-y-6">
          <header>
            <h2 className="font-narrow text-irOrange mb-2 text-8xl leading-none font-black">
              {player.squadNumber !== undefined &&
                player.squadNumber !== null &&
                `#${player.squadNumber}`}
            </h2>
            <h1 className="text-6xl leading-tight font-bold tracking-tight">
              {player.name}
            </h1>
            <p className="mt-3 text-xl font-bold tracking-widest text-gray-500 uppercase dark:text-gray-400">
              {getPositionLabel(player.position)}
            </p>
          </header>

          {/* Social Links */}
          {(player.facebook || player.instagram) && (
            <div className="flex gap-3">
              {player.facebook && (
                <a
                  href={player.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  <Image
                    alt="Facebook"
                    src="/imgs/facebook.svg"
                    width={40}
                    height={40}
                    unoptimized
                    className="white-to-black"
                  />
                </a>
              )}

              {player.instagram && (
                <a
                  href={player.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  <Image
                    alt="Instagram"
                    src="/imgs/instagram.svg"
                    width={40}
                    height={40}
                    className="white-to-black"
                  />
                </a>
              )}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer rounded-lg border-2 px-8 py-2 font-bold shadow-sm transition-all ${
                activeTab === "profile"
                  ? "border-white bg-white text-black"
                  : "border-black bg-transparent text-black hover:bg-black hover:text-white dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("bio")}
              className={`cursor-pointer rounded-lg border-2 px-8 py-2 font-bold shadow-sm transition-all ${
                activeTab === "bio"
                  ? "border-white bg-white text-black"
                  : "border-black bg-transparent text-black hover:bg-black hover:text-white dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              Bio
            </button>
          </div>

          {/* Conditional Rendering Logic */}
          <div className="min-h-75 w-full lg:max-w-md">
            {activeTab === "profile" ? (
              /* Stats Table */
              <div className="">
                {[
                  {
                    label: "Date of birth",
                    value: formatDate(player.dob) || "N/A",
                  },
                  { label: "Nationality", value: player.nationality || "N/A" },
                  {
                    label: "Date signed",
                    value: formatDate(player.dateSigned) || "N/A",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-gray-400 py-2 text-sm"
                  >
                    <span className="font-medium">{stat.label}</span>
                    <span className="text-right font-semibold">
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-b border-gray-400 py-2 text-sm">
                  <span className="font-medium">Former clubs</span>
                  <div className="text-right font-semibold">
                    {player.formerClubs && player.formerClubs.length > 0
                      ? player.formerClubs.map((club, i) => (
                          <p key={i}>{club}</p>
                        ))
                      : "N/A"}
                  </div>
                </div>
              </div>
            ) : (
              /* Bio Content */
              <div className="">
                <h3 className="mb-2 font-bold tracking-widest uppercase">
                  Biography
                </h3>
                <div className="prose prose-sm">
                  <div>
                    {player.bio ? (
                      <PortableText value={player.bio} />
                    ) : (
                      `No biography available for this player.`
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {player.gallery && (
        <div className="mx-auto mt-10 max-w-6xl md:mt-20">
          <h1 className="my-3 mb-10 text-center text-2xl font-bold">
            {`${player.name} Photos`}
          </h1>
          <DynamicGallery images={player.gallery} />
        </div>
      )}
    </div>
  );
}
