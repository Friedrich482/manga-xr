import { describe, expect, it } from "vitest";
import getSeasonFromTitle from "@/utils/getSeasonFromTitle";

describe("getSeasonFromTitle", () => {
  it("should return the slug unchanged and no season", () => {
    expect(getSeasonFromTitle("Boku-No-Hero-Academia")).toStrictEqual({
      title: "Boku-No-Hero-Academia",
      season: null,
    });
    expect(getSeasonFromTitle("Housekeeper")).toStrictEqual({
      title: "Housekeeper",
      season: null,
    });
    expect(getSeasonFromTitle("100")).toStrictEqual({
      title: "100",
      season: null,
    });
    expect(getSeasonFromTitle("100-Days-in-Europe")).toStrictEqual({
      title: "100-Days-in-Europe",
      season: null,
    });
  });
  it("should extract the season number when present after an underscore", () => {
    expect(getSeasonFromTitle("Housekeeper_2")).toStrictEqual({
      title: "Housekeeper",
      season: 2,
    });
  });
});
