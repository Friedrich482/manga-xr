import { beforeEach, describe, expect, it, vi } from "vitest";
import { findMangaWithSlug } from "@/data-access/manga";
import { getHistory } from "@/data-access/history";
import getMangaChaptersFromHistory from "@/lib/getMangaChaptersFromHistory";
import getUserId from "@/lib/getUserId";

vi.mock("next/cache", () => {
  const actual = vi.importActual("next/cache");
  return {
    ...actual,
    unstable_cache: (fn: Function) => fn,
  };
});
vi.mock("../../data-access/manga");
vi.mock("../../lib/getUserId");
vi.mock("../../data-access/history");
vi.mock("server-only", () => ({}));

describe("getMangaChaptersFromHistory", () => {
  const mockedGetUserId = vi.mocked(getUserId);
  const mockedFindMangaWithSlug = vi.mocked(findMangaWithSlug);
  const mockedGetHistory = vi.mocked(getHistory);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return nothing because there is no user", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(await getMangaChaptersFromHistory("Tower-Of-God")).toBe(null);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).not.toHaveBeenCalled();
  });

  it("should call findMangaWithSlug and return the chapters", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });
    mockedGetHistory.mockResolvedValue({ id: "historyId", userId: "123" });
    mockedFindMangaWithSlug.mockResolvedValue([
      {
        slug: "Tower-Of-God",
        chaptersRead: ["chapter-1", "chapter-11", "chapter-45"],
        lastChapterRead: "chapter-45",
      },
      {
        slug: "Tower-Of-God_2",
        chaptersRead: ["chapter-1", "chapter-87", "chapter-123", "chapter-196"],
        lastChapterRead: "chapter-196",
      },
    ]);

    expect(await getMangaChaptersFromHistory("Tower-Of-God")).toStrictEqual([
      {
        slug: "Tower-Of-God",
        chaptersRead: ["chapter-1", "chapter-11", "chapter-45"],
        lastChapterRead: "chapter-45",
      },
      {
        slug: "Tower-Of-God_2",
        chaptersRead: ["chapter-1", "chapter-87", "chapter-123", "chapter-196"],
        lastChapterRead: "chapter-196",
      },
    ]);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).toHaveBeenCalled();
  });

  it("should return null because there is no history (impossible case)", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });
    mockedGetHistory.mockResolvedValue(null);

    expect(await getMangaChaptersFromHistory("Tower-Of-God")).toBe(null);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).not.toHaveBeenCalled();
  });
});
