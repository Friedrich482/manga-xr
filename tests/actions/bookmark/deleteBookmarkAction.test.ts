import { describe, expect, it, vi } from "vitest";
import { deleteBookmark } from "@/data-access/bookmarks";
import deleteBookmarkAction from "@/actions/bookmark/deleteBookmarkAction";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";

vi.mock("server-only", () => ({}));
vi.mock("../../../data-access/bookmarks");
vi.mock("../../../lib/getUserId.ts");
vi.mock("next/cache");

describe("deleteBookmarkAction", () => {
  const mockedRevalidateTag = vi.mocked(revalidateTag);
  const mockedDeleteBookmark = vi.mocked(deleteBookmark);
  const mockedGetUserId = vi.mocked(getUserId);

  it("should return an error as a a string", async () => {
    expect(await deleteBookmarkAction({})).toMatch(/required/i);
  });

  it("should return an error as a a string (authentication failed)", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(await deleteBookmarkAction({ id: "bl123" })).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
  });

  it("should call the deleteBookmark and revalidateTag functions", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });

    expect(await deleteBookmarkAction({ id: "bl123" })).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedDeleteBookmark).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });
});
