import { describe, expect, it, vi } from "vitest";
import { getPreferences } from "@/data-access/preferences";
import getUserPreferences from "@/lib/getUserPreferences";

vi.mock("server-only", () => ({}));
vi.mock("../../data-access/preferences");
vi.mock("next/cache", () => {
  const actual = vi.importActual("next/cache");
  return {
    ...actual,
    unstable_cache: (fn: Function) => fn,
  };
});

describe("getUserPreferences", () => {
  const mockedGetPreferences = vi.mocked(getPreferences);

  it("should return undefined because there is no preferences", async () => {
    mockedGetPreferences.mockResolvedValue(null);

    expect(await getUserPreferences("123")).toBe(undefined);
    expect(mockedGetPreferences).toHaveBeenCalled();
  });

  it("should return the preferences", async () => {
    mockedGetPreferences.mockResolvedValue({
      chapterPagesDisposition: "Single Page",
      gapOptionName: "Medium",
      progressBarDirection: "Vertical",
      progressBarVisibility: false,
      readingDirection: "From left to right",
    });

    expect(await getUserPreferences("123")).toStrictEqual({
      chapterPagesDisposition: "Single Page",
      gapOptionName: "Medium",
      progressBarDirection: "Vertical",
      progressBarVisibility: false,
      readingDirection: "From left to right",
    });
    expect(mockedGetPreferences).toHaveBeenCalled();
  });
});
