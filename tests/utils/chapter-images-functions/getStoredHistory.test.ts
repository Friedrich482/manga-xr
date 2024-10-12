import { describe, expect, it } from "vitest";
import { HISTORY_LOCALSTORAGE_KEY } from "@/lib/constants";
import { UserHistory } from "@/zod-schema/schema";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";

const userHistory: UserHistory = [
  {
    name: "Murim-RPG-Simulation",
    chapters: [
      {
        chapterSlug: "chapter-19",
        page: 16,
      },
      {
        chapterSlug: "chapter-47",
        page: 27,
      },
    ],
  },
  {
    name: "Under-Ninja",
    chapters: [
      {
        chapterSlug: "chapter-98",
        page: 18,
      },
      {
        chapterSlug: "chapter-101",
        page: 11,
      },
    ],
  },
];

describe("getStoredHistory", () => {
  it("should return an empty array", () => {
    expect(getStoredHistory()).toStrictEqual([]);
  });

  it("should return an empty array", () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify([{}]));
    expect(getStoredHistory()).toStrictEqual([]);
  });

  it("should return an array of type UserHistory", () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));
    expect(getStoredHistory()).toStrictEqual(userHistory);
  });

  it("should throw an error an return an empty array", () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify(userHistory));
  });
});
