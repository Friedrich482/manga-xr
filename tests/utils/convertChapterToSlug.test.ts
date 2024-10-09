import { describe, expect, it } from "vitest";
import convertChapterToSlug from "@/utils/convertChapterToSlug";

describe("convertChapterToSlug", () => {
  it("should return a slug", () => {
    expect(convertChapterToSlug("chapter 1")).toBe("chapter-1");
  });

  it("should handle decimal numbers correctly", () => {
    expect(convertChapterToSlug("chapter 45.2")).toBe("chapter-45.2");
  });
});
