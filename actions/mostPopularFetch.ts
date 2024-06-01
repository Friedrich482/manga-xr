import prisma from "@/lib/db";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import { Prisma } from "@prisma/client";
import { popularMangaNumber } from "@/components/HomePage/PopularMangaList";
const popularMangaFetch = async () => {
  const mangaDex = new MangaDex();
  const res = (await mangaDex.fetchPopular(1, popularMangaNumber)).results;
  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = (await Promise.all(
    popularMangaPromises,
  )) as Prisma.JsonArray;

  await prisma.mostPopular.create({
    data: {
      id: "60d5ec49e7a8b0c5a50f4c48",
      data: popularMangaS,
    },
  });
};

export default popularMangaFetch;
