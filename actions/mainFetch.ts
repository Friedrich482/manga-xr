import prisma from "@/lib/db";
import { fetchLatestUpdates } from "@/utils/mangaKakalot/fetchLatestUpdates";
import { fetchPopularManga } from "@/utils/mangaKakalot/fetchPopularManga";
const mainFetch = async () => {
  // wait 10 minutes

  // await new Promise<void>((resolve) => {
  //   setTimeout(resolve, 600000);
  // });
  // console.log("waited");

  const latestUpdates = await fetchLatestUpdates();

  const popularMangaS = await fetchPopularManga();

  if (latestUpdates && popularMangaS) {
    // insert data in the latestUpdates table
    for (const latestUpdate of latestUpdates) {
      await prisma.latestUpdates.create({
        data: {
          title: latestUpdate.title,
          image: latestUpdate.image,
          lastChapter: latestUpdate.lastChapter,
        },
      });
    }
    // insert data in the popularManga table
    for (const popularManga of popularMangaS) {
      await prisma.popularManga.create({
        data: {
          title: popularManga.title,
          image: popularManga.image,
          lastChapter: popularManga.lastChapter,
        },
      });
    }
  }
};
export default mainFetch;
