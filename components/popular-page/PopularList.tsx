import { MAIN_URL, NUMBER_TO_FETCH_ON_POPULAR_PAGE } from "@/lib/constants";
import { FETCH_POPULAR_MANGA_TAG } from "@/lib/cache-keys/unstable_cache";
import MangaElement from "../MainMangaElement";
import ReloadDataButton from "../lib/ReloadDataButton";
import { fetchPopularManga } from "@/utils/fetch/fetchPopularManga";

const PopularList = async () => {
  const popularMangaS = await fetchPopularManga(
    NUMBER_TO_FETCH_ON_POPULAR_PAGE,
  );
  if (!popularMangaS || popularMangaS.length === 0) {
    return <ReloadDataButton tag={`${FETCH_POPULAR_MANGA_TAG}`} />;
  } else {
    return (
      <section className="flex w-full flex-wrap items-center justify-start gap-12">
        {popularMangaS.map((manga) => {
          return <MangaElement manga={manga} key={manga.title} />;
        })}
      </section>
    );
  }
};
export default PopularList;
