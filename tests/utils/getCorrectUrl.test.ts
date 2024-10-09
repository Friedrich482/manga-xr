import { describe, expect, it } from "vitest";
import getCorrectUrl from "@/utils/getCorrectUrl";

describe("getCorrectUrl", () => {
  it("it should give url with the manga slug and chapter number interpolated in", () => {
    expect(getCorrectUrl("Tune-In-to-the-Midnight-Heart", "Chapter 5")).toBe(
      "/manga/Tune-In-to-the-Midnight-Heart/chapter-5",
    );
    expect(getCorrectUrl("Boku-No-Hero-Academia", "No. 60")).toBe(
      "/manga/Boku-No-Hero-Academia/chapter-60",
    );
    expect(getCorrectUrl("Housekeeper", "Episode 32")).toBe(
      "/manga/Housekeeper/chapter-32",
    );
  });

  it("should handle decimal chapter numbers correctly", () => {
    expect(getCorrectUrl("Tune-In-to-the-Midnight-Heart", "Chapter 14.5")).toBe(
      "/manga/Tune-In-to-the-Midnight-Heart/chapter-14.5",
    );
    expect(getCorrectUrl("Boku-No-Hero-Academia", "No. 430.5")).toBe(
      "/manga/Boku-No-Hero-Academia/chapter-430.5",
    );
  });

  it("should return the url using the season number from the chapterTitle", () => {
    expect(getCorrectUrl("Housekeeper", "S2 - Episode 50")).toBe(
      "/manga/Housekeeper_2/chapter-50",
    );
    expect(getCorrectUrl("Tower-Of-God", "S3 - Chapter 215")).toBe(
      "/manga/Tower-Of-God_3/chapter-215",
    );
    expect(getCorrectUrl("Tower-Of-God", "S1 - Chapter 76")).toBe(
      "/manga/Tower-Of-God/chapter-76",
    );
  });

  it("should return an empty string for invalid chapters", () => {
    expect(getCorrectUrl("Wind-Breaker-NII-Satoru", "gibberish")).toBe("");
  });
});
