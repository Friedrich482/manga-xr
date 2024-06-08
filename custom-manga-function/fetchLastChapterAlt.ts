import { IMangaInfo } from "@consumet/extensions";
import { revalidate } from "@/app/layout";
export const fetchLastChapterAlt = async (manga: IMangaInfo) => {
  const mangaId = manga.id;
  if (manga.chapters?.length === 0) {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`, {
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
  }
  return null;
};
