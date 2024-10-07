import { describe, expect, it } from "vitest";
import getChapterNumber from "@/utils/getChapterNumber";

describe("getChapterNumber", () => {
  it("should return the number of the chapter as a string", () => {
    expect(getChapterNumber("chapter 6")).toBeTypeOf("string");
    expect(getChapterNumber("chapter 5")).toBe("5");
    expect(getChapterNumber("chapter 2.5")).toBe("2.5");
  });
});
