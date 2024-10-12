import { LatestUpdateType, PopularMangaType } from "@/zod-schema/schema";
import { describe, expect, it } from "vitest";
import cleanUpMangaArray from "@/utils/fetch/clean-up-functions/cleanUpMangaArray";

describe("cleanUpMangaArray", () => {
  it("should return cleanUpMangaArrayWithoutGenres ", () => {
    const mangaArrayWithoutGenres: LatestUpdateType[] = [
      {
        title: "Cooking With Wild Game",
        mangaSlug: "Isekai-Ryoridou",
        image: "image1",
        lastChapter: "\n\t\n\t\nChapter 54\n\n\n\n\t\n\n\t\n",
      },
      {
        title: "Hajimete no Gal",
        mangaSlug: "Hajimete-No-Gal",
        image: "image2",
        lastChapter: "\n\t\n\t\nChapter 189\n\n\n\n\t\n\n\t\n",
      },
      {
        title: "The Hero Returns",
        mangaSlug: "the-Hero-Returns",
        image: "image3",
        lastChapter: "\n\t\n\t\nChapter 95\n\n\n\n\t\n\n\t\n",
      },
    ];
    const cleanUpMangaArrayWithoutGenres: LatestUpdateType[] = [
      {
        title: "Cooking With Wild Game",
        mangaSlug: "Isekai-Ryoridou",
        image: "image1",
        lastChapter: "Chapter 54",
      },
      {
        title: "Hajimete no Gal",
        mangaSlug: "Hajimete-No-Gal",
        image: "image2",
        lastChapter: "Chapter 189",
      },
      {
        title: "The Hero Returns",
        mangaSlug: "the-Hero-Returns",
        image: "image3",
        lastChapter: "Chapter 95",
      },
    ];

    expect(cleanUpMangaArray(mangaArrayWithoutGenres)).toStrictEqual(
      cleanUpMangaArrayWithoutGenres,
    );
  });

  it("should return cleanUpMangaArrayWithGenres", () => {
    const mangaArrayWithGenres: PopularMangaType[] = [
      {
        title: "Teen Mercenary",
        mangaSlug: "Mercenary-Enrollment",
        image: "img1",
        genres: "\n\n\t\n\t\n\nGenre(s): Action, Drama, Romance\n\n\n\t\n",
        lastChapter: "\n\t\n\t\nChapter 209\n\t\n\t\n",
      },
      {
        title: "Hunter x Hunter",
        mangaSlug: "Hunter-X-Hunter",
        image: "img2",
        genres:
          "\n\n\t\n\t\n\n\n\t\nGenre(s): Action, Adventure, Comedy\t\n\n\t\t\t\n",
        lastChapter: "\t\n\t\nChapter 402\n\n\n\n\t\n\n\t\n",
      },
      {
        title: "Go! Go! Loser Ranger!",
        mangaSlug: "Reject-Ranger",
        image: "img3",
        genres: "\n\t\n\n\t\nGenre(s): Action, Comedy, Drama\n\n\n\n\t\n\n",
        lastChapter: "\t\t\t\n\n\nChapter 156\t\n\n\n\t\n",
      },
    ];
    const cleanUpMangaArrayWithGenres: PopularMangaType[] = [
      {
        title: "Teen Mercenary",
        mangaSlug: "Mercenary-Enrollment",
        image: "img1",
        genres: "Genre(s): Action, Drama, Romance",
        lastChapter: "Chapter 209",
      },
      {
        title: "Hunter x Hunter",
        mangaSlug: "Hunter-X-Hunter",
        image: "img2",
        genres: "Genre(s): Action, Adventure, Comedy",
        lastChapter: "Chapter 402",
      },
      {
        title: "Go! Go! Loser Ranger!",
        mangaSlug: "Reject-Ranger",
        image: "img3",
        genres: "Genre(s): Action, Comedy, Drama",
        lastChapter: "Chapter 156",
      },
    ];

    expect(cleanUpMangaArray(mangaArrayWithGenres, "popular")).toStrictEqual(
      cleanUpMangaArrayWithGenres,
    );
  });
});
