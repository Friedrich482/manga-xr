import prisma from "@/lib/db";
import { fetchLatestUpdates } from "@/utils/fetch/fetchLatestUpdates";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";
const mainFetch = async () => {
  // wait 10 minutes

  // await new Promise<void>((resolve) => {
  //   setTimeout(resolve, 600000);
  // });
  // console.log("waited");

  const latestUpdates = await fetchLatestUpdates();

  if (latestUpdates) {
    // insert data in the latestUpdates table
    for (const latestUpdate of latestUpdates) {
      await prisma.latestUpdates.create({
        data: {
          title: latestUpdate.title,
          altTitle: latestUpdate.altTitle,
          image: latestUpdate.image,
          lastChapter: latestUpdate.lastChapter,
        },
      });
    }
  }

  // const popularMangaS = await fetchPopularManga();
  // if (popularMangaS) {
  //   // insert data in the popularManga table
  //   for (const popularManga of popularMangaS) {
  //     await prisma.popularManga.create({
  //       data: {
  //         title: popularManga.title,
  //         altTitle: popularManga.altTitle,
  //         image: popularManga.image,
  //         lastChapter: popularManga.lastChapter,
  //         genres: popularManga.genres,
  //       },
  //     });
  //   }
  // }
};
export default mainFetch;
