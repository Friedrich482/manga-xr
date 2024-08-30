import { SearchResultMangaType } from "@/zod-schema/schema";

const cleanUpSearchResultsArray = (data: SearchResultMangaType[]) => {
  const cleanedUpSearchResultsArray = data.map((searchResult) => {
    return {
      title: searchResult.title,
      altTitle: searchResult.altTitle,
      image: searchResult.image,
      lastChapter: searchResult.lastChapter.replace(/\s+/g, " ").trim(),
    };
  });
  return cleanedUpSearchResultsArray;
};

export default cleanUpSearchResultsArray;
