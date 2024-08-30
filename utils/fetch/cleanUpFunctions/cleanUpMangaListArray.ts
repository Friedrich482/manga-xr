import { MangaListType } from "@/zod-schema/schema";

const cleanUpMangaListArray = (data: MangaListType[]) => {
  const cleanedUpMangaListArray = data.map((element) => {
    return {
      title: element.title,
      altTitle: element.altTitle,
      image: element.image,
      lastChapter: element.lastChapter.replace(/\s+/g, " ").trim(),
    };
  });
  return cleanedUpMangaListArray;
};

export default cleanUpMangaListArray;
