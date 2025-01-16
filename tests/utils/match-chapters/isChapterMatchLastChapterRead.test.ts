import { describe, expect, it } from "vitest";
import isChapterMatchLastChapterRead from "@/utils/match-chapters/isChapterMatchLastChapterRead";

describe("isChapterMatchLastChapterRead", () => {
  it("should return false", () => {
    expect(
      isChapterMatchLastChapterRead(
        "01JG2CE556907AAXNTK2SSF274",
        "01JG2CE556907AAXNTK2SSFU74",
      ),
    ).toBe(false);
  });

  it("should return true", () => {
    expect(
      isChapterMatchLastChapterRead(
        "01JDJYSMQ7YWZ7P3Q7PYHFCPQD",
        "01JDJYSMQ7YWZ7P3Q7PYHFCPQD",
      ),
    ).toBe(true);
  });

  it("should return false", () => {
    expect(
      isChapterMatchLastChapterRead(
        "01JHR53Y9PT04MTF9068SGR7PS",
        "01JHR53Y9PT04MTF9068SGR7PS1",
      ),
    ).toBe(false);
  });

  it("should return true", () => {
    expect(
      isChapterMatchLastChapterRead(
        "01JGH2J1NHGJNGYAB5CR02VG8D",
        "01JGH2J1NHGJNGYAB5CR02VG8D",
      ),
    ).toBe(true);
  });
});
