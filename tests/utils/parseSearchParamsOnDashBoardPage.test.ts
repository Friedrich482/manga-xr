import { beforeEach, describe, expect, it, vi } from "vitest";
import { notFound } from "next/navigation";
import parseSearchparamsOnDashBoardPage from "@/utils/parseSearchParamsOnDashBoardPage";

// mock the nextJS notFound function
vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    notFound: vi.fn(),
  };
});

describe("parseSearchParamsOnDashBoard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null", () => {
    expect(parseSearchparamsOnDashBoardPage({})).toBe(null);
  });

  it("should return the string 'history'", () => {
    expect(parseSearchparamsOnDashBoardPage({ tab: "history" })).toBe(
      "history",
    );
  });

  it("should return the string 'bookmarks'", () => {
    expect(parseSearchparamsOnDashBoardPage({ tab: "bookmarks" })).toBe(
      "bookmarks",
    );
  });

  it.each([
    { tab: "gibberish" },
    { tab: "user" },
    { tab: "data" },
    { tab: "root" },
  ])("should call the notFound next/navigation function", (input) => {
    parseSearchparamsOnDashBoardPage(input);
    expect(notFound).toHaveBeenCalled();
  });
});
