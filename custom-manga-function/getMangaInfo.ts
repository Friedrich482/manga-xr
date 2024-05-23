import { IMangaInfo } from "@consumet/extensions";

const getMangaInfo = (popularManga: IMangaInfo) => {
  let englishTitle: string | null = null;
  if (popularManga.altTitles) {
    if (typeof popularManga.altTitles === "string") {
      englishTitle = popularManga.altTitles;
    } else {
      for (const mangaTitle of popularManga.altTitles) {
        if (typeof mangaTitle === "string") {
          englishTitle = mangaTitle;
          break;
        }
        if (mangaTitle.hasOwnProperty("en")) {
          englishTitle = mangaTitle["en" as unknown as number];
          break;
        }
      }
    }
  }

  // This variable allows slice when the title (or englishTitle) is too long
  const lastCharacter = popularManga.title
    ? (popularManga.title as string).indexOf(" - ") !== -1
      ? (popularManga.title as string).indexOf(" - ")
      : (popularManga.title as string).length - 1
    : (englishTitle as string).indexOf(" - ") !== -1
      ? (englishTitle as string).indexOf(" - ")
      : (englishTitle as string).length - 1;

  //  get the last chapter
  const lastChapter = popularManga.chapters
    ? popularManga.chapters?.length >= 1
      ? popularManga.chapters[0].chapterNumber
      : ""
    : "";

  // get the genres
  const genres = popularManga.genres?.slice(0, 3);
  return { englishTitle, lastCharacter, lastChapter, genres };
};

export default getMangaInfo;
