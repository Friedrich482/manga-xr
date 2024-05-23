import PopularMangaElement from "./popularMangaElement";
import newMangaDex from "@/custom-manga-function/fetchPopular";
import getMangaInfo from "@/custom-manga-function/getMangaInfo";

const PopularMangaList = async () => {
  // data fetching: popularMangaS

  const mangaDex = new newMangaDex();
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

      <div className="popular-inner-section scrollbar-thin scrollbar-thumb-neutral-600 dark:scrollbar-thumb-neutral-200 scrollbar-track-neutral-300 dark:scrollbar-track-neutral-800 mx-2 flex h-[25rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 dark:bg-neutral-900 large-nav:hidden">
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
