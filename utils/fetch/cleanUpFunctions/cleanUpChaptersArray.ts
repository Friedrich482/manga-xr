import { ChapterType } from "@/zod-schema/schema";

const cleanUpChaptersArray = (chapters: ChapterType[]) => {
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
export default cleanUpChaptersArray;
