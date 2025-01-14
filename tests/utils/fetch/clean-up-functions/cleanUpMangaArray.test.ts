import { LatestUpdateType, PopularMangaType } from "@/zod-schema/schema";
import { describe, expect, it } from "vitest";
import cleanUpMangaArray from "@/utils/fetch/clean-up-functions/cleanUpMangaArray";

describe("cleanUpMangaArray", () => {
  it("should return cleanedLatestMangas ", () => {
    const latestMangas: LatestUpdateType[] = [
      {
        title: "Cooking With Wild Game",
        image: "image1",
        lastChapter: "\n\t\n\t\nChapter 56\n\n\n\n\t\n\n\t\n",
        chapterSlug: "01JC1P51W5JW1FQE2YPTGQZR1A",
      },
      {
        title: "Hajimete no Gal",
        image: "image2",
        lastChapter: "\n\t\n\t\nChapter 191\n\n\n\n\t\n\n\t\n",
        chapterSlug: "01JFSVNHCH1RRMA7H21Y38NSEC",
      },
      {
        title: "The Hero Returns",
        image: "image3",
        lastChapter: "\n\t\n\t\nChapter 108\n\n\n\n\t\n\n\t\n",
        chapterSlug: "01JHAXAJYCNJW57XVDGFD1ANQ6",
      },
    ];
    const cleanedLatestMangas: LatestUpdateType[] = [
      {
        title: "Cooking With Wild Game",
        image: "image1",
        lastChapter: "Chapter 56",
        chapterSlug: "01JC1P51W5JW1FQE2YPTGQZR1A",
      },
      {
        title: "Hajimete no Gal",
        image: "image2",
        lastChapter: "Chapter 191",
        chapterSlug: "01JFSVNHCH1RRMA7H21Y38NSEC",
      },
      {
        title: "The Hero Returns",
        image: "image3",
        lastChapter: "Chapter 108",
        chapterSlug: "01JHAXAJYCNJW57XVDGFD1ANQ6",
      },
    ];
    cleanUpMangaArray(latestMangas);
    expect(latestMangas).toStrictEqual(cleanedLatestMangas);
  });

  it("should return cleanUpMangaArrayWithGenres", () => {
    const popularMangas: PopularMangaType[] = [
      {
        title: "Teenage Mercenary",
        image: "img1",
        releaseDate: "2020",
        chapterSlug: "01JHBRR8S0HQJESPTVWDEAQ2XQ",
        lastChapter: "\n\t\n\t\nChapter 221\n\t\n\t\n",
      },
      {
        title: "Hunter x Hunter",
        image: "img2",
        releaseDate: "1998",
        chapterSlug: "01JEGSZ9PXVYHCSFVRDYSA8TW5",
        lastChapter: "\t\n\t\nChapter 410\n\n\n\n\t\n\n\t\n",
      },
      {
        title: "Go! Go! Loser Ranger!",
        image: "img3",
        lastChapter: "\t\t\t\n\n\nChapter 165\t\n\n\n\t\n",
        chapterSlug: "01JH49V6S6ZSWNJS3EYCWDWDKD",
        releaseDate: "2021",
      },
    ];
    const cleanUpPopularMangas: PopularMangaType[] = [
      {
        title: "Teenage Mercenary",
        image: "img1",
        releaseDate: "2020",
        chapterSlug: "01JHBRR8S0HQJESPTVWDEAQ2XQ",
        lastChapter: "Chapter 221",
      },
      {
        title: "Hunter x Hunter",
        image: "img2",
        releaseDate: "1998",
        chapterSlug: "01JEGSZ9PXVYHCSFVRDYSA8TW5",
        lastChapter: "Chapter 410",
      },
      {
        title: "Go! Go! Loser Ranger!",
        image: "img3",
        lastChapter: "Chapter 165",
        chapterSlug: "01JH49V6S6ZSWNJS3EYCWDWDKD",
        releaseDate: "2021",
      },
    ];
    cleanUpMangaArray(popularMangas);
    expect(popularMangas).toStrictEqual(cleanUpPopularMangas);
  });
});
