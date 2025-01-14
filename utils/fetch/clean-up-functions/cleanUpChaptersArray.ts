import { ChapterType } from "@/zod-schema/schema";
import clean from "@/utils/clean";

const cleanUpChaptersArray = (chapters: ChapterType[]) => {
  chapters.forEach((chapter) => {
    chapter.chapterTitle = clean(chapter.chapterTitle);
    chapter.chapterReleaseDate = clean(chapter.chapterReleaseDate);
    chapter.chapterSlug = chapter.chapterSlug;
  });
};
export default cleanUpChaptersArray;
