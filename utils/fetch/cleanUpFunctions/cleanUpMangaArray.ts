import { LatestUpdateType } from "@/zod-schema/schema";

const cleanUpMangaArray = (
  data: (LatestUpdateType | (LatestUpdateType & { genres: string }))[],
) => {
  const cleanedUpArray = data.map((latestUpdate) => {
    return {
      title: latestUpdate.title,
      altTitle: latestUpdate.altTitle,
      image: latestUpdate.image,
      lastChapter: latestUpdate.lastChapter.replace(/\s+/g, " ").trim(),
    };
  });
  return cleanedUpArray;
};

export default cleanUpMangaArray;
