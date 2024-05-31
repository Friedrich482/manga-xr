import prisma from "@/lib/db";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import { Prisma } from "@prisma/client";
import { lastReleasedNumber } from "@/components/HomePage/LastReleasesList";
const lastReleasesFetch = async () => {
  const mangaDex = new MangaDex();
  const response = (await mangaDex.fetchLatestUpdates(1, lastReleasedNumber))
    .results;
  const lastReleasesPromises = response.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const lastReleasedMangaS = (await Promise.all(
    lastReleasesPromises,
  )) as Prisma.JsonArray;
  console.log(lastReleasedMangaS);
  await prisma.lastReleases.create({
    data: {
      id: "60d5ec49e7a8b0c5a50f4c48",
      data: lastReleasedMangaS,
    },
  });
};
export default lastReleasesFetch;
