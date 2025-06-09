import {
  ELEMENT_TITLE_MAX_LENGTH,
  MAIN_MANGA_ELEMENT_TITLE_LENGTH,
} from "@/lib/constants";
import { describe, expect, it } from "vitest";
import truncateTitle from "@/utils/truncateTitle";

describe("truncateTitle", () => {
  it("should return Revenge of the Baskerville Blo...", () => {
    expect(
      truncateTitle(
        "Revenge of the Baskerville Bloodhound",
        ELEMENT_TITLE_MAX_LENGTH,
      ),
    ).toBe("Revenge of the Baskerville Blo...");
  });

  it("should return Tonari no Seki no Yatsu ga Souiu Me de Miteku...", () => {
    expect(
      truncateTitle(
        "Tonari no Seki no Yatsu ga Souiu Me de Mitekuru",
        MAIN_MANGA_ELEMENT_TITLE_LENGTH,
      ),
    ).toBe("Tonari no Seki no Yatsu ga Souiu Me de Miteku...");
  });

  it("should return Revenge of the Revenge of...", () => {
    expect(truncateTitle("Revenge of the Baskerville Bloodhound", 10)).toBe(
      "Revenge of...",
    );
  });

  it("should return empty string when input is empty", () => {
    expect(truncateTitle("", 10)).toStrictEqual("");
  });

  it("should return original string when shorter than maxLength", () => {
    expect(truncateTitle("Short", 10)).toBe("Short");
  });
});
