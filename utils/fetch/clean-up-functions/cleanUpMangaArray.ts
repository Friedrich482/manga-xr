import { FetchMangaBasic } from "@/zod-schema/schema";

const clean = (text: string) => text.replace(/\s+/g, " ").trim();

type FetchMangaWithGenres = FetchMangaBasic & { genres: string };

type CleanedMangaType<T extends string | undefined> = FetchMangaBasic &
  (T extends string ? { genres: string } : {});

const cleanUpMangaArray = <T extends string | undefined>(
  data: T extends string ? FetchMangaWithGenres[] : FetchMangaBasic[],
  type?: T,
): CleanedMangaType<T>[] => {
  return data.map((latestUpdate) => {
    const partialCleanedUp = {
      title: latestUpdate.title,
      mangaSlug: latestUpdate.mangaSlug,
      image: latestUpdate.image,
      lastChapter: clean(latestUpdate.lastChapter),
    };

    if (type !== undefined && "genres" in latestUpdate) {
      return {
        ...partialCleanedUp,
        genres: clean(latestUpdate.genres),
      } as CleanedMangaType<T>;
    }

    return partialCleanedUp as CleanedMangaType<T>;
  });
};

export default cleanUpMangaArray;
