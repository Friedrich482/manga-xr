import { describe, expect, it } from "vitest";
import { ChapterType } from "@/zod-schema/schema";
import cleanUpChaptersArray from "@/utils/fetch/clean-up-functions/cleanUpChaptersArray";

describe("cleanUpChaptersArray", () => {
  const chapters: ChapterType[] = [
    {
      chapterReleaseDate: "\n\n\t\t\t\v2022-01-01",
      chapterTitle: "Chapter 1\n\n\t",
    },
    {
      chapterReleaseDate: "\n\n\t2022-01-10\n\n\t\t\t\t\n",
      chapterTitle: "\tChapter 2\n\n\n\t\t",
    },
    {
      chapterReleaseDate: "\n\n\t\n\n\n2022-01-20\n\n\t",
      chapterTitle: "\t\t\nChapter 3",
    },
  ];
  const expectedCleanUpChaptersArray: ChapterType[] = [
    {
      chapterReleaseDate: "2022-01-01",
      chapterTitle: "Chapter 1",
    },
    {
      chapterReleaseDate: "2022-01-10",
      chapterTitle: "Chapter 2",
    },
    {
      chapterReleaseDate: "2022-01-20",
      chapterTitle: "Chapter 3",
    },
  ];
  it("should return the cleanUpChaptersArray", () => {
    expect(cleanUpChaptersArray(chapters)).toStrictEqual(
      expectedCleanUpChaptersArray,
    );
  });
});
