import { describe, expect, it, vi } from "vitest";
import { findUserSManga } from "@/data-access/manga";
import getMangaFromHistory from "@/lib/getMangasFromHistory";

vi.mock("server-only", () => ({}));
vi.mock("../../data-access/manga");
vi.mock("next/cache", () => {
  const actual = vi.importActual("next/cache");
  return {
    ...actual,
    unstable_cache: (fn: Function) => fn,
  };
});

describe("getMangasFromHistory", () => {
  const mockedFindUserSManga = vi.mocked(findUserSManga);

  it("should call the findUserSManga function and return an array of mangas", async () => {
    mockedFindUserSManga.mockResolvedValue([
      {
        id: "mangaId",
        image: "image",
        name: "Tower Of God",
        lastChapterRead: "chapter-56",
        slug: "Tower-Of-God",
      },
    ]);
    expect(await getMangaFromHistory("historyId")).toStrictEqual([
      {
        id: "mangaId",
        image: "image",
        name: "Tower Of God",
        lastChapterRead: "chapter-56",
        slug: "Tower-Of-God",
      },
    ]);
  });
});
