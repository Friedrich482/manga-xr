import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";
import SmallPopularMangaElement from "./SmallPopularMangaElement";
import { MAIN_URL } from "@/lib/constants";

const SmallPopularMangaList = async () => {
  const popularMangaS = await fetchPopularManga(10, MAIN_URL);
  if (popularMangaS) {
    return (
      <div className="flex h-[27rem] items-center justify-start gap-6 overflow-x-scroll rounded-lg bg-neutral-100 px-4 dark:bg-neutral-900 large-nav:hidden">
        {popularMangaS.map((manga) => {
          return <SmallPopularMangaElement manga={manga} key={manga.title} />;
        })}
      </div>
    );
  }
};

export default SmallPopularMangaList;
