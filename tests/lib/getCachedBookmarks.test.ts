import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllBookmarks } from "@/data-access/bookmarks";
import getCachedBookmarks from "@/lib/getCachedBookmarks";
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

describe("getCachedBookmarks", () => {
  const mockedGetUserId = vi.mocked(getUserId);
  const mockedGetAllBookmarks = vi.mocked(getAllBookmarks);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should nothing because there is no user", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(await getCachedBookmarks()).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetAllBookmarks).not.toHaveBeenCalled();
  });

  it("should call the getAllBookmarks function and return all the bookmarks", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });
    mockedGetAllBookmarks.mockResolvedValue([
      {
        id: "bookmarkId",
        chapterSlug: "chapter-22",
        image: "image",
        mangaName: "Tower Of God",
        mangaSlug: "Tower-Of-God",
      },
    ]);

    expect(await getCachedBookmarks()).toStrictEqual([
      {
        id: "bookmarkId",
        chapterSlug: "chapter-22",
        image: "image",
        mangaName: "Tower Of God",
        mangaSlug: "Tower-Of-God",
      },
    ]);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetAllBookmarks).toHaveBeenCalled();
  });
});
