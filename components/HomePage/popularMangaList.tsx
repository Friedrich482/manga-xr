import MangaDex from "@consumet/extensions/dist/providers/manga/mangadex";
import PopularMangaElement from "./popularMangaElement";
import getMangaInfo from "@/custom-manga-function/getMangaInfo";
const PopularMangaList = async () => {
  // data fetching: popularMangaS

  const mangaDex = new MangaDex();
  const res = (await mangaDex.fetchPopular(1, 10)).results;
  const popularMangaPromises = res.map(
    async (result) => await mangaDex.fetchMangaInfo(result.id),
  );
  const popularMangaS = await Promise.all(popularMangaPromises);

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

      <div className="mx-2 flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-600 dark:bg-neutral-900 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-200 large-nav:hidden">
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