import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChapterType } from "@/zod-schema/schema";
import getSeasonFromTitle from "@/utils/getSeasonFromTitle";
import { renderHook } from "@testing-library/react";
import useGetCurrentChapterTitle from "@/hooks/chapter-images-hooks/useGetCurrentChapterTitle";

vi.mock("../../../utils/getSeasonFromTitle");

let mockParams = {
  mangaSlug: "",
  chapterSlug: "",
};

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useParams: () => mockParams,
  };
});

describe("useGetCurrentChapterTitle", () => {
  const TGEDChapters: ChapterType[] = [
    {
      chapterTitle: "Chapter 152",
      chapterReleaseDate: "10/09/2024",
    },
    {
      chapterTitle: "Chapter 151",
      chapterReleaseDate: "10/02/2024",
    },
    {
      chapterTitle: "Chapter 150",
      chapterReleaseDate: "09/25/2024",
    },
  ];

  const PMAAChapters: ChapterType[] = [
    {
      chapterReleaseDate: "10/08/2024",
      chapterTitle: "action. 23",
    },
    {
      chapterReleaseDate: "08/11/2024",
      chapterTitle: "action. 21",
    },
    {
      chapterReleaseDate: "07/10/2024",
      chapterTitle: "action. 20",
    },
  ];

  const HouseKeeperChapters: ChapterType[] = [
    {
      chapterTitle: "S2 - Episode 47",
      chapterReleaseDate: "09/17/2024",
    },
    {
      chapterTitle: "S2 - Episode 41",
      chapterReleaseDate: "07/16/2024",
    },
    {
      chapterTitle: "S2 - Episode 7",
      chapterReleaseDate: "11/28/2023",
    },
    {
      chapterTitle: "Episode 71.5",
      chapterReleaseDate: "09/12/2023",
    },
    {
      chapterTitle: "Episode 69",
      chapterReleaseDate: "08/22/2023",
    },
    {
      chapterTitle: "Episode 66",
      chapterReleaseDate: "08/01/2023",
    },
    {
      chapterTitle: "Episode 1",
      chapterReleaseDate: "03/08/2023",
    },
  ];

  const TOGChapters: ChapterType[] = [
    {
      chapterTitle: "S3 - Chapter 216",
      chapterReleaseDate: "10/13/2024",
    },
    {
      chapterTitle: "S3 - Chapter 216",
      chapterReleaseDate: "10/13/2024",
    },
    {
      chapterTitle: "S3 - Chapter 208",
      chapterReleaseDate: "08/18/2024",
    },
    {
      chapterTitle: "S3 - Chapter 162",
      chapterReleaseDate: "08/07/2022",
    },
    {
      chapterTitle: "S3 - Chapter 75",
      chapterReleaseDate: "07/11/2021",
    },
    {
      chapterTitle: "S2 - Chapter 313",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S2 - Chapter 225",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S2 - Chapter 104",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S2 - Chapter 41",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S2 - Chapter 23",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S2 - Chapter 2",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S1 - Chapter 62",
      chapterReleaseDate: "04/02/2019",
    },
    {
      chapterTitle: "S1 - Chapter 15",
      chapterReleaseDate: "04/02/2019",
    },

    {
      chapterTitle: "S1 - Chapter 1",
      chapterReleaseDate: "04/02/2019",
    },
  ];
  const OneHundredChapters: ChapterType[] = [
    { chapterTitle: "Chapter 29", chapterReleaseDate: "09/19/2022" },
    { chapterTitle: "Chapter 10", chapterReleaseDate: "08/12/2022" },
  ];

  const mockedGetSeasonFromTitle = vi.mocked(getSeasonFromTitle);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return Chapter 151", () => {
    mockParams = {
      mangaSlug: "The-Greatest-Estate-Developer",
      chapterSlug: "chapter-151",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "The-Greatest-Estate-Developer",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TGEDChapters),
    );
    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("Chapter 151");

    unmount();
  });

  it("should return an empty string", () => {
    mockParams = {
      mangaSlug: "The-Greatest-Estate-Developer",
      chapterSlug: "chapter-135",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "The-Greatest-Estate-Developer",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TGEDChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toStrictEqual("");

    unmount();
  });

  it("should return action. 21", () => {
    mockParams = {
      chapterSlug: "chapter-21",
      mangaSlug: "Policewoman-and-Assassin",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "Policewoman-and-Assassin",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(PMAAChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("action. 21");

    unmount();
  });

  it("should return Episode 1", () => {
    mockParams = {
      chapterSlug: "chapter-1",
      mangaSlug: "Housekeeper",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "Housekeeper",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(HouseKeeperChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("Episode 1");

    unmount();
  });

  it("should return Episode 69", () => {
    mockParams = {
      chapterSlug: "chapter-69",
      mangaSlug: "Housekeeper",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "Housekeeper",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(HouseKeeperChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("Episode 69");

    unmount();
  });

  it("should return S2 - Episode 7", () => {
    mockParams = {
      chapterSlug: "chapter-7",
      mangaSlug: "Housekeeper_2",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: 2,
      title: "Housekeeper",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(HouseKeeperChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("S2 - Episode 7");

    unmount();
  });

  it("should return S1 - Chapter 1", () => {
    mockParams = {
      chapterSlug: "chapter-1",
      mangaSlug: "Tower-Of-God",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "Tower-Of-God",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TOGChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("S1 - Chapter 1");

    unmount();
  });

  it("should return S1 - Chapter 15", () => {
    mockParams = {
      chapterSlug: "chapter-15",
      mangaSlug: "Tower-Of-God_1",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: 1,
      title: "Tower-Of-God",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TOGChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("S1 - Chapter 15");

    unmount();
  });

  it("should return S2 - Chapter 2", () => {
    mockParams = {
      chapterSlug: "chapter-2",
      mangaSlug: "Tower-Of-God_2",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: 2,
      title: "Tower-Of-God",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TOGChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("S2 - Chapter 2");

    unmount();
  });

  it("should return S3 - Chapter 162", () => {
    mockParams = {
      chapterSlug: "chapter-162",
      mangaSlug: "Tower-Of-God_3",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "Tower-Of-God",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(TOGChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("S3 - Chapter 162");

    unmount();
  });

  it("should return Chapter 10", () => {
    mockParams = {
      chapterSlug: "chapter-10",
      mangaSlug: "100",
    };

    mockedGetSeasonFromTitle.mockReturnValue({
      season: null,
      title: "100",
    });

    const { result, unmount } = renderHook(() =>
      useGetCurrentChapterTitle(OneHundredChapters),
    );

    expect(mockedGetSeasonFromTitle).toHaveBeenCalled();
    expect(result.current).toBe("Chapter 10");

    unmount();
  });
});
