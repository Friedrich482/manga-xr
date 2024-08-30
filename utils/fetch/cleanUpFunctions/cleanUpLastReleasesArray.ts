import { LatestUpdateType } from "@/zod-schema/schema";

const cleanUpLastReleasesArray = (data: LatestUpdateType[]) => {
  const cleanedUpLastReleasesArray = data.map((latestUpdate) => {
    return {
      title: latestUpdate.title,
      altTitle: latestUpdate.altTitle,
      image: latestUpdate.image,
      lastChapter: latestUpdate.lastChapter.replace(/\s+/g, " ").trim(),
    };
  });
  return cleanedUpLastReleasesArray;
};

export default cleanUpLastReleasesArray;
