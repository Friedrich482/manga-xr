import { describe, expect, it } from "vitest";
import convertSlugToChapter from "@/utils/convertSlugToChapter";

describe("convertSlugToChapter", () => {
  it("should render a chapter name from a slug", () => {
    expect(convertSlugToChapter("chapter-1")).toBe("chapter 1");
    expect(convertSlugToChapter("chapter-45.2")).toBe("chapter 45.2");
  });
});