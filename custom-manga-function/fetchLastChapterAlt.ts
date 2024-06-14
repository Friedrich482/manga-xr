import { IMangaInfo } from "@consumet/extensions";
export const fetchLastChapterAlt = async (manga: IMangaInfo) => {
  const mangaId = manga.id;
  if (manga.chapters?.length === 0) {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
    const data = await res.json();
    const lastChapterId = data.data?.attributes?.latestUploadedChapter;
    const newRes = await fetch(
      `https://api.mangadex.org/chapter/${lastChapterId}`,
    );
    const lastChapterData = await newRes.json();

    if (
      lastChapterData.data.attributes.volume === null ||
      lastChapterData.data.attributes.chapter
    ) {
      return "";
    }
    return (
      lastChapterData.data.attributes.volume *
      lastChapterData.data.attributes.chapter
    );
  } else if (!manga.chapters) {
    const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
    const data = await res.json();
    if (data.data.attributes?.lastChapter) {
      return data.data.attributes?.lastChapter;
    }
    const lastChapterId = data.data?.attributes?.latestUploadedChapter;
    if (lastChapterId) {
      const newRes = await fetch(
        `https://api.mangadex.org/chapter/${lastChapterId}`,
      );
      const lastChapterData = await newRes.json();
      return lastChapterData.data.attributes.chapter;
    }
    return null;
  }
  return null;
};
