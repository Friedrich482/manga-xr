import { describe, expect, it } from "vitest";
import capitalize from "@/utils/capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalize("Manga")).toBe("Manga");
    expect(capitalize("manga")).toBe("Manga");
    expect(capitalize("MANGA")).toBe("MANGA");
  });
});
