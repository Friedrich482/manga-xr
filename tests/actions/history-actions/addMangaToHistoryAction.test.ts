import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createManga,
  findMangaWithSlug,
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
  const mockedFindMangaWithSlug = vi.mocked(findMangaWithSlug);
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
        name: "Kamudo",
        slug: "01JDCJ14CQXTN8NT70JV09S8JC",
        lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
        image: "image",
        lastChapterTitle: "Chapter 2.1",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).not.toHaveBeenCalled();
  });

  it("should return nothing (no history, IMPOSSIBLE case)", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue(null);

    expect(
      await addMangaToHistoryAction({
        name: "Kamudo",
        slug: "01JDCJ14CQXTN8NT70JV09S8JC",
        lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
        image: "image",
        lastChapterTitle: "Chapter 2.1",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).not.toHaveBeenCalled();
  });

  it("should add the manga to the history by calling createManga and updateHistory", async () => {
    mockedGetUserId.mockResolvedValue({
      userId: "123",
    });
    mockedGetHistory.mockResolvedValue({
      id: "historyId",
      userId: "123",
    });
    mockedFindMangaWithSlug.mockResolvedValue(null);
    mockedCreateManga.mockResolvedValue("mangaId");

    expect(
      await addMangaToHistoryAction({
        name: "Kamudo",
        slug: "01JDCJ14CQXTN8NT70JV09S8JC",
        lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
        image: "image",
        lastChapterTitle: "Chapter 2.1",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).toHaveBeenCalled();
    expect(mockedCreateManga).toHaveBeenCalled();
    expect(mockedUpdateHistory).toHaveBeenCalled();
    expect(mockedUpdateMangaLastChapter).not.toHaveBeenCalled();
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
    mockedFindMangaWithSlug.mockResolvedValue({
      id: "mangaId",
      chaptersRead: [
        "01JFJ8KVS0GYBRQC7GMS6SYVTK",
        "01JGM1DM8JF4PKM7XETJD0CQZF",
      ],
      lastChapterReadSlug: "01JGM1DM8JF4PKM7XETJD0CQZF",
      lastChapterTitle: "Chapter 4.1",
      slug: "01JDCJ14CQXTN8NT70JV09S8JC",
    });

    expect(
      await addMangaToHistoryAction({
        name: "Kamudo",
        slug: "01JDCJ14CQXTN8NT70JV09S8JC",
        lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
        image: "image",
        lastChapterTitle: "Chapter 2.1",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).toHaveBeenCalled();
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
    mockedFindMangaWithSlug.mockResolvedValue({
      id: "mangaId",
      chaptersRead: [
        "01JFJ8KVS0GYBRQC7GMS6SYVTK",
        "01JEE2DZD558AQMR5J5612X3ZW",
      ],
      lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
      lastChapterTitle: "Chapter 2.1",
      slug: "01JDCJ14CQXTN8NT70JV09S8JC",
    });

    expect(
      await addMangaToHistoryAction({
        name: "Kamudo",
        slug: "01JDCJ14CQXTN8NT70JV09S8JC",
        lastChapterReadSlug: "01JEE2DZD558AQMR5J5612X3ZW",
        image: "image",
        lastChapterTitle: "Chapter 2.1",
      }),
    ).toBe(undefined);
    expect(mockedGetUserId).toHaveBeenCalled();
    expect(mockedGetHistory).toHaveBeenCalled();
    expect(mockedFindMangaWithSlug).toHaveBeenCalled();
    expect(mockedUpdateMangaLastChapter).not.toHaveBeenCalled();
    expect(mockedUpdateMangaChaptersRead).toHaveBeenCalled();
    expect(mockedRevalidateTag).toHaveBeenCalled();
    expect(mockedCreateManga).not.toHaveBeenCalled();
    expect(mockedUpdateHistory).not.toHaveBeenCalled();
  });
});
