import { FetchMangaBasic } from "@/zod-schema/schema";

const clean = (text: string) => text.replace(/\s+/g, " ").trim();

type FetchMangaWithReleaseDate = FetchMangaBasic & { releaseDate: string };

type CleanedMangaType<T extends string | undefined> = FetchMangaBasic &
  (T extends string ? { releaseDate: string } : {});

const cleanUpMangaArray = <T extends string | undefined>(
  data: T extends string ? FetchMangaWithReleaseDate[] : FetchMangaBasic[],
  type?: T,
): CleanedMangaType<T>[] => {
  return data.map((latestUpdate) => {
    const partialCleanedUp = {
      title: latestUpdate.title,
      image: latestUpdate.image,
      lastChapter: clean(latestUpdate.lastChapter),
      chapterSlug: latestUpdate.chapterSlug,
    };

    if (type !== undefined && "releaseDate" in latestUpdate) {
      return {
        ...partialCleanedUp,
        releaseDate: latestUpdate.releaseDate,
      } as CleanedMangaType<T>;
    }

    return partialCleanedUp as CleanedMangaType<T>;
  });
};

export default cleanUpMangaArray;
