import { describe, expect, it } from "vitest";
import isChapterMatchLastChapterRead from "@/utils/match-chapters/isChapterMatchLastChapterRead";

describe("isChapterMatchLastChapterRead", () => {
  it("should return false", () => {
    expect(
      isChapterMatchLastChapterRead("chapter 13", {
        mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
        lastChapterRead: "",
      }),
    ).toBe(false);
  });

  it("should return true", () => {
    const lastChapterObject = {
      mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
      lastChapterRead: "chapter-6",
    };

    expect(isChapterMatchLastChapterRead("Chapter 6", lastChapterObject)).toBe(
      true,
    );
  });

  it("should return false", () => {
    const lastChapterObject = {
      mangaSlug: "Kaiko-sareta-Ankoku-Heishi-30-dai-no-Slow-na-Second-Life",
      lastChapterRead: "chapter-6",
    };
    expect(isChapterMatchLastChapterRead("Chapter 8", lastChapterObject)).toBe(
      false,
    );
  });

  it("should return true", () => {
    const lastChapterObject = {
      mangaSlug: "Housekeeper",
      lastChapterRead: "chapter-32",
    };
    expect(isChapterMatchLastChapterRead("Episode 32", lastChapterObject)).toBe(
      true,
    );
  });

  it("should return false", () => {
    const lastChapterObject = {
      mangaSlug: "Housekeeper_2",
      lastChapterRead: "chapter-32",
    };
    expect(isChapterMatchLastChapterRead("Episode 32", lastChapterObject)).toBe(
      false,
    );
  });

  it("should return true", () => {
    const lastChapterObject = {
      mangaSlug: "Housekeeper_2",
      lastChapterRead: "chapter-44",
    };
    expect(
      isChapterMatchLastChapterRead("S2 - Episode 44", lastChapterObject),
    ).toBe(true);
  });

  it("should return false", () => {
    const lastChapterObject = {
      mangaSlug: "Housekeeper_2",
      lastChapterRead: "chapter-44",
    };
    expect(isChapterMatchLastChapterRead("Episode 44", lastChapterObject)).toBe(
      false,
    );
  });

  it("should return true", () => {
    const lastChapterObject = {
      mangaSlug: "Tower-Of-God_1",
      lastChapterRead: "chapter-2",
    };
    expect(
      isChapterMatchLastChapterRead("S1 - Chapter 2", lastChapterObject),
    ).toBe(true);
  });

  it("should return false", () => {
    const lastChapterObject = {
      mangaSlug: "Tower-Of-God_2",
      lastChapterRead: "chapter-2",
    };
    expect(
      isChapterMatchLastChapterRead("S1 - Chapter 2", lastChapterObject),
    ).toBe(false);
  });
});
