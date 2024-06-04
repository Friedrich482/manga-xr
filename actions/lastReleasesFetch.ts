import prisma from "@/lib/db";
import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import { Prisma } from "@prisma/client";

const lastReleasesFetch = async () => {
  // wait 30 minutes

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10000);
  });
  console.log("waited");

  // do the fetch

  const mangaDex = new MangaDex();
  const response = (await mangaDex.fetchLatestUpdates(1, 21)).results;
  const lastReleasesPromises = response.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );

  const lastReleasedMangaS = (await Promise.all(
    lastReleasesPromises,
  )) as Prisma.JsonArray; // ! not type safe

  // get the first element in the db (and also the unique element)

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
  //  then add the actual data
  console.log("replaced !");

  await prisma.lastReleases.create({
    data: {
      data: lastReleasedMangaS,
    },
  });
};
export default lastReleasesFetch;
