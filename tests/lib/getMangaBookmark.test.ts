import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllMangaBookmarks } from "@/data-access/bookmarks";
import getMangaBookmarks from "@/lib/getMangaBookmarks";
import getUserId from "@/lib/getUserId";

vi.mock("next/cache", () => {
  const actual = vi.importActual("next/cache");
  return {
    ...actual,
    unstable_cache: (fn: Function) => fn,
  };
});
vi.mock("../../data-access/bookmarks");
vi.mock("../../lib/getUserId");
vi.mock("server-only", () => ({}));

describe("getMangaBookmark", () => {
  const mockedGetUserId = vi.mocked(getUserId);
  const mockedGetAllMangaBookmarks = vi.mocked(getAllMangaBookmarks);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return nothing because there is no user", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(await getMangaBookmarks("Tower-Of-God")).toBe(undefined);

    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetAllMangaBookmarks).not.toHaveBeenCalled();
  });

  it("should call getAllMangaBookmarks and return the manga's bookmarks", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });
    mockedGetAllMangaBookmarks.mockResolvedValue([
      {
        mangaSlug: "Tower-Of-God",
        chapterSlug: "chapter-33",
      },
      {
        mangaSlug: "Tower-Of-God",
        chapterSlug: "chapter-98",
      },
    ]);

    expect(await getMangaBookmarks("Tower-Of-God")).toStrictEqual([
      {
        mangaSlug: "Tower-Of-God",
        chapterSlug: "chapter-33",
      },
      {
        mangaSlug: "Tower-Of-God",
        chapterSlug: "chapter-98",
      },
    ]);

    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetAllMangaBookmarks).toHaveBeenCalled();
  });
});
