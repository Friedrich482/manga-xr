import { PopularMangaType } from "@/zod-schema/schema";

const cleanUpPopularMangaArray = (data: PopularMangaType[]) => {
  const cleanedPopularMangaArray = data.map((popularManga) => {
    return {
      title: popularManga.title.replace(/\s+/g, " ").trim(),
      altTitle: popularManga.altTitle,
      image: popularManga.image,
      lastChapter: popularManga.lastChapter.replace(/\s+/g, " ").trim(),
      genres: popularManga.genres.replace(/\s+/g, " ").trim(),
    };
  });
  return cleanedPopularMangaArray;
};

export default cleanUpPopularMangaArray;
