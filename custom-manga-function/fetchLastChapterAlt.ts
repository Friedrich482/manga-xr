import { IMangaInfo } from "@consumet/extensions";
import { revalidate } from "@/app/layout";
import { z } from "zod";
export const fetchLastChapterAlt = async (manga: IMangaInfo) => {
  if (manga.chapters?.length === 0) {
    const res = await fetch(`https://api.mangadex.org/manga/${manga.id}`, {
      next: { revalidate: revalidate },
    });
    const data = await res.json();
    const lastChapterId = data.data?.attributes?.latestUploadedChapter;
    const newRes = await fetch(
      `https://api.mangadex.org/chapter/${lastChapterId}`,
      { next: { revalidate: revalidate } },
    );
    const lastChapterData = await newRes.json();
    if (
      lastChapterData.data.attributes.volume === null ||
      lastChapterData.data.attributes.chapter
    ) {
      return "unknown";
    }
    return (
      lastChapterData.data.attributes.volume *
      lastChapterData.data.attributes.chapter
    );
  } else if (manga.lastChapter) {
    return z.string().parse(manga.lastChapter);
  }
  return null;
};
