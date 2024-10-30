import { describe, expect, it, vi } from "vitest";
import { deleteManga } from "@/data-access/manga";
import deleteMangaFromHistoryAction from "@/actions/history-actions/deleteMangaFromHistoryAction";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";

vi.mock("../../../data-access/manga");
vi.mock("../../../lib/getUserId");
vi.mock("next/cache");
vi.mock("server-only", () => ({}));

describe("deleteMangaFromHistoryAction", () => {
  const mockedGetUserId = vi.mocked(getUserId);
  const mockedDeleteManga = vi.mocked(deleteManga);
  const mockedRevalidateTag = vi.mocked(revalidateTag);

  it("should return an error as a string", async () => {
    expect(await deleteMangaFromHistoryAction({})).toMatch(/required/i);
  });

  it("should return nothing (authentication failed)", async () => {
    mockedGetUserId.mockResolvedValue({ userId: null });

    expect(await deleteMangaFromHistoryAction({ id: "mangaId" })).toBe(
      undefined,
    );
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedDeleteManga).not.toHaveBeenCalled();
  });

  it("should call deleteManga and revalidateTag", async () => {
    mockedGetUserId.mockResolvedValue({ userId: "123" });

    expect(await deleteMangaFromHistoryAction({ id: "mangaId" })).toBe(
      undefined,
    );
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedDeleteManga).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
  });
});
