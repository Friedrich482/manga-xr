import PopularMangaElement from "./popularMangaElement";
import newMangaDex from "@/fetch-functions/fetchPopular";
import { IMangaInfo } from "@consumet/extensions";
const PopularMangaList = async () => {
  // data fetching: popularMangaS

  const mangaDex = new newMangaDex();
  const res = (await mangaDex.fetchPopular(1, 10)).results;
  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = await Promise.all(popularMangaPromises);

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
            englishTitle = mangaTitle["en"];
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
  return (
    <>
      {/* large screens (more than 860px)*/}
      <div className="hidden flex-col items-center justify-center gap-8 large-nav:flex">
        {popularMangaS.map((popularManga) => {
          const { englishTitle, lastCharacter, lastChapter, genres } =
            getMangaInfo(popularManga);
          return (
            <PopularMangaElement
              englishTitle={englishTitle}
              lastCharacter={lastCharacter}
              lastChapter={lastChapter}
              popularManga={popularManga}
              key={popularManga.id}
              genres={genres}
            />
          );
        })}
      </div>

      {/*   smaller screens (less than 860px)*/}

      <div className="popular flex h-[25rem] items-center justify-center gap-6 overflow-hidden overflow-x-scroll bg-white dark:bg-neutral-900 large-nav:hidden">
        {popularMangaS.map((popularManga) => {
          const { englishTitle, lastCharacter, lastChapter, genres } =
            getMangaInfo(popularManga);
          return (
            <PopularMangaElement
              englishTitle={englishTitle}
              lastCharacter={lastCharacter}
              lastChapter={lastChapter}
              popularManga={popularManga}
              key={popularManga.id}
              genres={genres}
            />
          );
        })}
      </div>
    </>
  );
};
export default PopularMangaList;
