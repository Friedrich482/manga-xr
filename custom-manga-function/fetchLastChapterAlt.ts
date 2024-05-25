import { IMangaInfo } from "@consumet/extensions";
import { revalidate } from "@/app/layout";
export const fetchLastChapterAlt = async (popularManga: IMangaInfo) => {
  if (popularManga.chapters?.length === 0) {
    const res = await fetch(
      `https://api.mangadex.org/manga/${popularManga.id}`,
      { next: { revalidate: revalidate } },
    );
    const data = await res.json();

    const lastChapterId = data.data?.attributes?.latestUploadedChapter;
    const newRes = await fetch(
      `https://api.mangadex.org/chapter/${lastChapterId}`,
      { next: { revalidate: revalidate } },
    );
    // console.log(newRes);
    const lastChapterData = await newRes.json();
    return (
      lastChapterData.data.attributes.volume *
      lastChapterData.data.attributes.chapter
    );
  }
  return null;
};
