import { describe, expect, it } from "vitest";
import isChapterMatchChapterFromHistory from "@/utils/match-chapters/isChapterMatchChapterFromHistory";

describe("isChapterMatchChapterFromHistory", () => {
  it("should return false", () => {
    expect(isChapterMatchChapterFromHistory(undefined, "chapter-16")).toBe(
      false,
    );
  });

  it("should return true", () => {
    const historyChapters = [
      {
        mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
        chapter: "chapter-6",
      },
    ];
    expect(isChapterMatchChapterFromHistory(historyChapters, "Chapter 6")).toBe(
      true,
    );
  });

  it("should return false", () => {
    const historyChapters = [
      {
        mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
        chapter: "chapter-6",
      },
    ];
    expect(isChapterMatchChapterFromHistory(historyChapters, "Chapter 8")).toBe(
      false,
    );
  });

  it("should return true", () => {
    const historyChapters = [
      {
        mangaSlug: "Housekeeper",
        chapter: "chapter-32",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "Episode 32"),
    ).toBe(true);
  });

  it("should return false", () => {
    const historyChapters = [
      {
        mangaSlug: "Housekeeper_2",
        chapter: "chapter-32",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "Episode 32"),
    ).toBe(false);
  });

  it("should return true", () => {
    const historyChapters = [
      {
        mangaSlug: "Housekeeper_2",
        chapter: "chapter-44",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "S2 - Episode 44"),
    ).toBe(true);
  });

  it("should return false", () => {
    const historyChapters = [
      {
        mangaSlug: "Housekeeper_2",
        chapter: "chapter-44",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "Episode 44"),
    ).toBe(false);
  });

  it("should return true", () => {
    const historyChapters = [
      {
        mangaSlug: "Tower-Of-God_1",
        chapter: "chapter-2",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "S1 - Chapter 2"),
    ).toBe(true);
  });

  it("should return false", () => {
    const historyChapters = [
      {
        mangaSlug: "Tower-Of-God_2",
        chapter: "chapter-2",
      },
    ];
    expect(
      isChapterMatchChapterFromHistory(historyChapters, "S1 - Chapter 2"),
    ).toBe(false);
  });
});
