import { describe, expect, it } from "vitest";
import filterUniqueNames from "@/utils/filterUniqueNames";
import getMangaFromHistory from "@/lib/getMangasFromHistory";

describe("filterUniqueName", () => {
  const h: Awaited<ReturnType<typeof getMangaFromHistory>> = [
    {
      id: "1",
      image: "img1",
      lastChapterRead: "chapter 1",
      name: "Suuji de Sukuu! Jakushou Kokka",
      slug: "Suuji-de-Sukuu-Jyakushou-Kokka",
    },
    {
      id: "2",
      image: "img2",
      lastChapterRead: "chapter 33",
      name: "Dandadan",
      slug: "Dandadan",
    },
    {
      id: "3",
      image: "img3",
      lastChapterRead: "chapter 18",
      name: "Housekeeper",
      slug: "Housekeeper",
    },
    {
      id: "4",
      image: "img4",
      lastChapterRead: "chapter 2",
      name: "Housekeeper",
      slug: "Housekeeper_2",
    },
  ];
  it("should return array with unique names only", () => {
    expect(filterUniqueNames(h)).toContainEqual({
      id: "3",
      image: "img3",
      lastChapterRead: "chapter 18",
      name: "Housekeeper",
      slug: "Housekeeper",
    });
    expect(filterUniqueNames(h)).not.toContainEqual({
      id: "4",
      image: "img4",
      lastChapterRead: "chapter 2",
      name: "Housekeeper",
      slug: "Housekeeper_2",
    });
  });
});
