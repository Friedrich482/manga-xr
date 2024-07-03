import { chapterType } from "@/types/manga-types";

const cleanChaptersArray = (chapters: chapterType[]) => {
  const cleanedChapters = chapters.map((chapter) => {
    return {
      chapterTitle: chapter.chapterTitle.replace(/\s+/g, " ").trim(),
      chapterReleaseDate: chapter.chapterReleaseDate
        .replace(/\s+/g, " ")
        .trim(),
    };
  });
  return cleanedChapters;
};
export default cleanChaptersArray;
