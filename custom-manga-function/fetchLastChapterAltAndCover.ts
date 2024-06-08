import { IMangaInfo } from "@consumet/extensions";

const fetchLastChapterAltAndCover = async (manga: IMangaInfo) => {
  const mangaId = manga.id;
  let cover: string | null = null;
  const res = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
  const data = await res.json();
  for (const element of data.data.relationships) {
    if (element.type === "cover_art") {
      cover = element.id;
      break;
    }
  }
  const newRes = await fetch(`https://api.mangadex.org/cover/${cover}`);
  const newData = await newRes.json();

  const lastChapterAlt2 = manga.lastChapter;
  cover = newData.data.attributes.fileName;
  return { lastChapterAlt2, cover };
};

export default fetchLastChapterAltAndCover;
