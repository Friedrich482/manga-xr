import { describe, expect, it } from "vitest";
import clean from "@/utils/clean";

describe("clean", () => {
  it("should return Chapter 221", () => {
    expect(clean("\n\t\n\t\nChapter 221\n\t\n\t\n")).toBe("Chapter 221");
  });
  it("should return Chapter 165", () => {
    expect(clean("\t\t\t\n\n\nChapter 165\t\n\n\n\t\n")).toBe("Chapter 165");
  });

  it("should return 2022-01-01", () => {
    expect(clean("\n\n\t\t\t\n2022-01-01")).toBe("2022-01-01");
  });

  it("should return Chapter 2", () => {
    expect(clean("\tChapter 2\n\n\n\t\t")).toBe("Chapter 2");
  });
});
