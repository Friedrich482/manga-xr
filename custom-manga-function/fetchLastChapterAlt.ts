import { IMangaInfo } from "@consumet/extensions";
import { revalidate } from "@/app/layout";
export const fetchLastChapterAlt = async (popularManga: IMangaInfo) => {
  if (popularManga.chapters?.length === 0) {
    const res = await fetch(
      `https://api.mangadex.org/manga/${popularManga.id}`,
      { next: { revalidate: revalidate } },
    );
    const data = await res.json();
    console.log(data);
    const lastChapterId = data.data?.attributes?.latestUploadedChapter;
    const newRes = await fetch(
      `https://api.mangadex.org/chapter/${lastChapterId}`,
      { next: { revalidate: revalidate } },
    );
    const lastChapterData = await newRes.json();

    console.log(lastChapterData);
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
