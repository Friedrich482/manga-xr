import { describe, expect, it } from "vitest";
import convertChapterToSlug from "@/utils/convertChapterToSlug";

describe("convertChapterToSlug", () => {
  it("should render a slug from a chapter name", () => {
    expect(convertChapterToSlug("chapter 1")).toBe("chapter-1");
    expect(convertChapterToSlug("chapter 45.2")).toBe("chapter-45.2");
  });
});
