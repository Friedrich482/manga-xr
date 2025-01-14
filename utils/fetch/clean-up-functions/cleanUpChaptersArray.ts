import { ChapterType } from "@/zod-schema/schema";
import clean from "@/utils/clean";

const cleanUpChaptersArray = (chapters: ChapterType[]) => {
  chapters.forEach((chapter) => ({
    chapterTitle: clean(chapter.chapterTitle),
    chapterReleaseDate: clean(chapter.chapterReleaseDate),
    chapterSlug: clean(chapter.chapterSlug),
  }));
};
export default cleanUpChaptersArray;
