import { describe, expect, it } from "vitest";
import isChapterMatchChapterFromHistory from "@/utils/match-chapters/isChapterMatchChapterFromHistory";
const historyChapters = [
  "01JGH2J1NHGJNGYAB5CR02VG8D",
  "01J76XZ8WW916J8V7JJE07WRXZ",
  "01J76XZ96459CV5CJZNAVS4WRB",
];

describe("isChapterMatchChapterFromHistory", () => {
  it("should return false", () => {
    expect(
      isChapterMatchChapterFromHistory(undefined, "01JGH2J1NHGJNGYAB5CR02VG8D"),
    ).toBe(false);
  });

  it("should return true", () => {
    expect(
      isChapterMatchChapterFromHistory(
        historyChapters,
        "01J76XZ8WW916J8V7JJE07WRXZ",
      ),
    ).toBe(true);
  });

  it("should return false", () => {
    expect(
      isChapterMatchChapterFromHistory(
        historyChapters,
        "01J76XZ971DFX54N4Q4BFZRKEC",
      ),
    ).toBe(false);
  });
});
