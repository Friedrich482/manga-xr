import { describe, expect, it } from "vitest";
import removeSeasonFromTitle from "@/utils/removeSeasonFromTitle";

describe("removeSeasonFromTitle", () => {
  it.each([
    "Housekeeper",
    "Boku-no-hero-academia",
    "Kakkou-no-Iinazuke",
    "Ryuu-to-Ayumu-Nariagari-Boukensha-dou",
  ])("should return the manga slug passed in parameter", (input) => {
    expect(removeSeasonFromTitle(input)).toBe(input);
  });

  it("should return the manga slug without sliced from the '_' character", () => {
    expect(removeSeasonFromTitle("Housekeeper_2")).toBe("Housekeeper");
    expect(removeSeasonFromTitle("Tower-Of-God_3")).toBe("Tower-Of-God");
  });
});
