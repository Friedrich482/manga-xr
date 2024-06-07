import { IMangaInfo } from "@consumet/extensions";

export const maxTitleLength = 50;

const getMangaInfo = (manga: IMangaInfo) => {
  let englishTitle: string | null = null;
  if (manga.altTitles) {
    if (typeof manga.altTitles === "string") {
      englishTitle = manga.altTitles;
    } else {
      for (const mangaTitle of manga.altTitles) {
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

  //  if english title is too long (more than `maxTitleLength` character), slice it
  if (englishTitle) {
    englishTitle.length >= maxTitleLength
      ? (englishTitle = englishTitle.slice(0, maxTitleLength))
      : null;
  }

  // This variable allows slice when the title (or englishTitle) is too long(here if we have a dash, slice it)
  const lastCharacter = manga.title
    ? (manga.title as string).indexOf(" - ") !== -1
      ? (manga.title as string).indexOf(" - ")
      : (manga.title as string).length - 1
    : englishTitle
      ? (englishTitle as string).indexOf(" - ") !== -1
        ? (englishTitle as string).indexOf(" - ")
        : (englishTitle as string).length - 1
      : maxTitleLength;

  //  get the last chapter
  const lastChapter = manga.chapters
    ? manga.chapters?.length >= 1
      ? manga.chapters[0].chapterNumber
      : ""
    : "";

  // get the genres
  const genres = manga.genres?.slice(0, 3);
  return { englishTitle, lastCharacter, lastChapter, genres };
};

export default getMangaInfo;
