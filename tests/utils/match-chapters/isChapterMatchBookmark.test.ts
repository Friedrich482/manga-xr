import { describe, expect, it } from "vitest";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import isChapterMatchBookmark from "@/utils/match-chapters/isChapterMatchBookmark";

const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> = [
  {
    mangaSlug: "01J76XY7KT7J224EBK6J816Y1Q",
    chapterSlug: "01JFE7ZQW8DNT8DVFC3RS7YE46",
  },
  {
    mangaSlug: "01J76XYDHB03Y6P5CB1A45QKG0",
    chapterSlug: "01JHR52XV7KSZ80Z5VHKADCWVF",
  },
];

describe("isChapterMatchBookmark", () => {
  it("should return true", () => {
    expect(
      isChapterMatchBookmark(bookmarkedChapters, "01JFE7ZQW8DNT8DVFC3RS7YE46"),
    ).toBe(true);
  });

  it("should return false", () => {
    expect(
      isChapterMatchBookmark(bookmarkedChapters, "01J76XZ7Z85326JMN7G18DTBWW"),
    ).toBe(false);
  });

  it("should return false", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [];
    expect(
      isChapterMatchBookmark(bookmarkedChapters, "01JHR522C9QHGNG6B8S4GHEQRT"),
    ).toBe(false);
  });
});
