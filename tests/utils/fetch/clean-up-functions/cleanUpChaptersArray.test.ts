import { describe, expect, it } from "vitest";
import { ChapterType } from "@/zod-schema/schema";
import cleanUpChaptersArray from "@/utils/fetch/clean-up-functions/cleanUpChaptersArray";

describe("cleanUpChaptersArray", () => {
  const chapters: ChapterType[] = [
    {
      chapterReleaseDate: "\n\n\t\t\t\n2022-01-01",
      chapterTitle: "Chapter 1\n\n\t",
      chapterSlug: "01J8Y1JVP045T5FNFW0PJGAEEE",
    },
    {
      chapterReleaseDate: "\n\n\t2022-01-10\n\n\t\t\t\t\n",
      chapterTitle: "\tChapter 2\n\n\n\t\t",
      chapterSlug: "01J8Y1JVP0TYXYYCNJ35FTPAGA",
    },
    {
      chapterReleaseDate: "\n\n\t\n\n\n2022-01-20\n\n\t",
      chapterTitle: "\t\t\nChapter 3",
      chapterSlug: "01JHBRFR394F43CAXZ4AS12PZ4",
    },
  ];
  const expectedCleanUpChaptersArray: ChapterType[] = [
    {
      chapterReleaseDate: "2022-01-01",
      chapterTitle: "Chapter 1",
      chapterSlug: "01J8Y1JVP045T5FNFW0PJGAEEE",
    },
    {
      chapterReleaseDate: "2022-01-10",
      chapterTitle: "Chapter 2",
      chapterSlug: "01J8Y1JVP0TYXYYCNJ35FTPAGA",
    },
    {
      chapterReleaseDate: "2022-01-20",
      chapterTitle: "Chapter 3",
      chapterSlug: "01JHBRFR394F43CAXZ4AS12PZ4",
    },
  ];

  it("should return the cleanUpChaptersArray", () => {
    cleanUpChaptersArray(chapters);
    expect(chapters).toStrictEqual(expectedCleanUpChaptersArray);
  });
});
