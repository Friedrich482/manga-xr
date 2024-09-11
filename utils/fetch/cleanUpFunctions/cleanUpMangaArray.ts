import { fetchMangaBasicType } from "@/zod-schema/schema";

const cleanUpMangaArray = (
  data: (fetchMangaBasicType & { genres: string | undefined })[],
) => {
  const cleanedUpArray = data.map((latestUpdate) => {
    const partialCleanedUp = {
      title: latestUpdate.title,
      altTitle: latestUpdate.altTitle,
      image: latestUpdate.image,
      lastChapter: latestUpdate.lastChapter.replace(/\s+/g, " ").trim(),
    };
    return latestUpdate.genres
      ? {
          ...partialCleanedUp,
          genres: latestUpdate.genres.replace(/\s+/g, " ").trim(),
        }
      : partialCleanedUp;
  });
  return cleanedUpArray;
};

export default cleanUpMangaArray;
