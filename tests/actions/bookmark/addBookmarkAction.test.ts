import { beforeEach, describe, expect, it, vi } from "vitest";
import addBookmarkAction from "@/actions/bookmark/addBookmarkAction";
import { addChapterToBookmarks } from "@/data-access/bookmarks";
import getUserId from "@/lib/getUserId";

vi.mock("../../../data-access/bookmarks");
vi.mock("../../../lib/getUserId");
vi.mock("server-only", () => ({}));
describe("addBookmark", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockedAddChapterToBookmarks = vi.mocked(addChapterToBookmarks);
  const mockedGetUserId = vi.mocked(getUserId);

  it("should return an error as a string", async () => {
    expect(await addBookmarkAction({})).toMatch(/required/i);
  });

  it("should return nothing (authentication failed !)", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(
      await addBookmarkAction({
        chapterSlug: "01JGM1DM8JF4PKM7XETJD0CQZF",
        mangaName: "Kamudo",
        mangaSlug: "01JDCJ14CQXTN8NT70JV09S8JC",
        image: "image",
        chapterTitle: "Chapter 4.1",
      }),
    ).toBe(undefined);

    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedAddChapterToBookmarks).not.toHaveBeenCalled();
  });

  it("should call the addChapterToBookmark function", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });

    expect(
      await addBookmarkAction({
        chapterSlug: "01JGM1DM8JF4PKM7XETJD0CQZF",
        mangaName: "Kamudo",
        mangaSlug: "01JDCJ14CQXTN8NT70JV09S8JC",
        image: "image",
        chapterTitle: "Chapter 4.1",
      }),
    ).toBe(undefined);

    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedAddChapterToBookmarks).toHaveBeenCalled();
  });
});
