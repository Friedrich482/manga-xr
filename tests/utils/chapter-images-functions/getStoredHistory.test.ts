import { HISTORY_LOCALSTORAGE_KEY, userHistoryTest } from "@/lib/constants";
import { describe, expect, it } from "vitest";
import getStoredHistory from "@/utils/chapter-images-functions/getStoredHistory";

describe("getStoredHistory", () => {
  it("should return an empty array", () => {
    expect(getStoredHistory()).toStrictEqual([]);
  });

  it("should return an empty array", () => {
    localStorage.setItem(HISTORY_LOCALSTORAGE_KEY, JSON.stringify([{}]));
    expect(getStoredHistory()).toStrictEqual([]);
  });

  it("should return an array of type UserHistory", () => {
    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(userHistoryTest),
    );
    expect(getStoredHistory()).toStrictEqual(userHistoryTest);
  });

  it("should throw an error an return an empty array", () => {
    localStorage.setItem(
      HISTORY_LOCALSTORAGE_KEY,
      JSON.stringify(userHistoryTest),
    );
  });
});
