import { describe, expect, it } from "vitest";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import isChapterMatchBookmark from "@/utils/match-chapters/isChapterMatchBookmark";

describe("isChapterMatchBookmark", () => {
  it("should return true", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
          chapterSlug: "chapter-6",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "Chapter 6")).toBe(true);
  });

  it("should return false", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
          chapterSlug: "chapter-6",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "Chapter 8")).toBe(false);
  });

  it("should return true", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Housekeeper",
          chapterSlug: "chapter-32",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "Episode 32")).toBe(true);
  });

  it("should return false", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Housekeeper_2",
          chapterSlug: "chapter-32",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "Episode 32")).toBe(
      false,
    );
  });

  it("should return true", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Housekeeper_2",
          chapterSlug: "chapter-44",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "S2 - Episode 44")).toBe(
      true,
    );
  });

  it("should return false", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Housekeeper_2",
          chapterSlug: "chapter-44",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "Episode 44")).toBe(
      false,
    );
  });

  it("should return true", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Tower-Of-God_1",
          chapterSlug: "chapter-2",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "S1 - Chapter 2")).toBe(
      true,
    );
  });

  it("should return false", () => {
    const bookmarkedChapters: Awaited<ReturnType<typeof getAllMangaBookmarks>> =
      [
        {
          mangaSlug: "Tower-Of-God_2",
          chapterSlug: "chapter-2",
        },
      ];
    expect(isChapterMatchBookmark(bookmarkedChapters, "S1 - Chapter 2")).toBe(
      false,
    );
  });
});
