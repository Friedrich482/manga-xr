import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createManga,
  findMangaWithNameSlugAndHistoryId,
  updateMangaChaptersRead,
  updateMangaLastChapter,
} from "@/data-access/manga";
import { getHistory, updateHistory } from "@/data-access/history";
import addMangaToHistoryAction from "@/actions/history-actions/addMangaToHistoryAction";
import getUserId from "@/lib/getUserId";
import { revalidateTag } from "next/cache";

vi.mock("../../../data-access/manga");
vi.mock("../../../data-access/history");
vi.mock("../../../lib/getUserId");
vi.mock("next/cache");
vi.mock("server-only", () => ({}));
vi.mock("react", () => {
  const actual = vi.importActual("react");
  return {
    ...actual,
    cache: (fn: Function) => fn,
  };
});

describe("addMangaToHistory", () => {
  const mockedRevalidateTag = vi.mocked(revalidateTag);
  const mockedGetUserId = vi.mocked(getUserId);
  const mockedGetHistory = vi.mocked(getHistory);
  const mockedUpdateHistory = vi.mocked(updateHistory);
  const mockedCreateManga = vi.mocked(createManga);
  const mockedFindMangaWithSlugNameAndHistoryId = vi.mocked(
    findMangaWithNameSlugAndHistoryId,
  );
  const mockedUpdateMangaChaptersRead = vi.mocked(updateMangaChaptersRead);
  const mockedUpdateMangaLastChapter = vi.mocked(updateMangaLastChapter);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return an error as a string", async () => {
    expect(await addMangaToHistoryAction({})).toMatch(/required/i);
  });

  it("should return an error as a string (authentication failed)", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: null,
    });

    expect(
      await addMangaToHistoryAction({
        name: "Tower Of God",
        slug: "Tower-Of-God",
        lastChapter: "chapter-190",
        image: "image",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).not.toHaveBeenCalled();
  });

  it("should return nothing (no history, impossible case)", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue(null);

    expect(
      await addMangaToHistoryAction({
        name: "Tower Of God",
        slug: "Tower-Of-God",
        lastChapter: "chapter-190",
        image: "image",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlugNameAndHistoryId).not.toHaveBeenCalled();
  });

  it("should add the manga to the history by calling createManga and updateHistory", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue({
      id: "historyId",
      userId: "123",
    });
    mockedFindMangaWithSlugNameAndHistoryId.mockResolvedValue(null);
    mockedCreateManga.mockResolvedValue("mangaId");

    expect(
      await addMangaToHistoryAction({
        name: "Tower Of God",
        slug: "Tower-Of-God",
        lastChapter: "chapter-190",
        image: "image",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlugNameAndHistoryId).toHaveBeenCalled();
    expect(mockedCreateManga).toHaveBeenCalled();
    expect(mockedUpdateHistory).toHaveBeenCalled();
    expect(mockedUpdateMangaChaptersRead).not.toHaveBeenCalled();
  });

  it("should update the manga by calling updateMangaLastChapter and updateMangaChaptersRead", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue({
      id: "historyId",
      userId: "123",
    });
    mockedFindMangaWithSlugNameAndHistoryId.mockResolvedValue({
      id: "mangaId",
      chaptersRead: ["chapter-1", "chapter-15"],
      lastChapterRead: "chapter-15",
    });

    expect(
      await addMangaToHistoryAction({
        name: "Tower Of God",
        slug: "Tower-Of-God",
        lastChapter: "chapter-190",
        image: "image",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlugNameAndHistoryId).toHaveBeenCalled();
    expect(mockedUpdateMangaLastChapter).toHaveBeenCalled();
    expect(mockedUpdateMangaChaptersRead).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
    expect(mockedCreateManga).not.toHaveBeenCalled();
    expect(mockedUpdateHistory).not.toHaveBeenCalled();
  });

  it("should update the manga by calling updateMangaChaptersRead but not update the last chapter", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue({
      id: "historyId",
      userId: "123",
    });
    mockedFindMangaWithSlugNameAndHistoryId.mockResolvedValue({
      id: "mangaId",
      chaptersRead: ["chapter-1", "chapter-15"],
      lastChapterRead: "chapter-15",
    });

    expect(
      await addMangaToHistoryAction({
        name: "Tower Of God",
        slug: "Tower-Of-God",
        lastChapter: "chapter-15",
        image: "image",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlugNameAndHistoryId).toHaveBeenCalled();
    expect(mockedUpdateMangaLastChapter).not.toHaveBeenCalled();
    expect(mockedUpdateMangaChaptersRead).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
    expect(mockedCreateManga).not.toHaveBeenCalled();
    expect(mockedUpdateHistory).not.toHaveBeenCalled();
  });
});
