import { describe, expect, it } from "vitest";
import isValidChapterFormat from "@/utils/isValidChapterSlug";

describe("isValidChapterSlug", () => {
  it("should return true", () => {
    expect(isValidChapterFormat("chapter-12")).toBe(true);
    expect(isValidChapterFormat("chapter-29.5")).toBe(true);
  });
  it("should return false", () => {
    expect(isValidChapterFormat("chapter-12y")).toBe(false);
    expect(isValidChapterFormat("chapter12")).toBe(false);
    expect(isValidChapterFormat("chapter-1.2.3")).toBe(false);
    expect(isValidChapterFormat("episode-91")).toBe(false);
    expect(isValidChapterFormat("no.189")).toBe(false);
  });
});
