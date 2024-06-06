import prisma from "@/lib/db";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import { Prisma } from "@prisma/client";
import { typeOfFetch } from "@/types/actions-types";
import { IMangaResult } from "@consumet/extensions";
const mainFetch = async (numberToFetch: number, typeOfFetch: typeOfFetch) => {
  // wait 10 minutes

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 600000);
  });
  console.log("waited");

  // do the fetch

  const mangaDex = new MangaDex();
  let response: IMangaResult[];

  if (typeOfFetch === "lastReleases") {
    response = (await mangaDex.fetchLatestUpdates(1, numberToFetch)).results;
  } else {
    response = (await mangaDex.fetchPopular(1, numberToFetch)).results;
  }
  const promises = response.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );

  const mangaS = (await Promise.all(promises)) as Prisma.JsonArray; // ! not type safe

  // get the first element in the db (and also the unique element)
  if (typeOfFetch === "lastReleases") {
    const firstData = await prisma.lastReleases.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    // and delete it

    if (firstData) {
      await prisma.lastReleases.delete({
        where: {
          id: firstData.id,
        },
      });
    }
    await prisma.lastReleases.create({
      data: {
        data: mangaS,
      },
    });
  } else {
    const firstData = await prisma.mostPopular.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (firstData) {
      await prisma.mostPopular.delete({
        where: {
          id: firstData.id,
        },
      });
    }

    await prisma.mostPopular.create({
      data: {
        data: mangaS,
      },
    });
  }
};
export default mainFetch;
