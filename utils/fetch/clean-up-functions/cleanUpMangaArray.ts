import { FetchMangaBasic } from "@/zod-schema/schema";

const clean = (text: string) => text.replace(/\s+/g, " ").trim();

type CleanedMangaType = FetchMangaBasic;

const cleanUpMangaArray = <T extends string | undefined>(
  data: FetchMangaBasic[],
  type?: T,
): CleanedMangaType[] => {
  return data.map((latestUpdate) => {
    const partialCleanedUp = {
      title: latestUpdate.title,
      chapterSlug: latestUpdate.chapterSlug,
      image: latestUpdate.image,
      lastChapter: clean(latestUpdate.lastChapter),
    };

    return partialCleanedUp;
  });
};

export default cleanUpMangaArray;
