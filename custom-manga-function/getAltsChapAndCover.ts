import type { IMangaResult } from "@consumet/extensions";
import fetchLastChapterAltAndCover from "./fetchLastChapterAltAndCover";
const getAltsChapAndCover = async (mangaResult: IMangaResult) => {
  const lastChapterAlt2AndCover =
    await fetchLastChapterAltAndCover(mangaResult);

  const { lastChapterAlt2, cover } = lastChapterAlt2AndCover;
  return { lastChapterAlt2, cover };
};

export default getAltsChapAndCover;
