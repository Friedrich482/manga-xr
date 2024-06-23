import SmallPopularMangaElement from "./SmallPopularMangaElement";
import { fetchPopularManga } from "@/utils/manga/fetchPopularManga";

const SmallPopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga();
  if (popularMangaS) {
    return (
      <div className="mx-2 flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg rounded-bl-lg bg-neutral-100 px-4 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-600 dark:bg-neutral-900 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-200 large-nav:hidden">
        {popularMangaS.map((manga) => {
          return <SmallPopularMangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};

export default SmallPopularMangaList;
